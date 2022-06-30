import {
  Injectable,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CloudinaryService } from '../../../images/services/cloudinary/cloudinary.service';
import { ImagesService } from '../../../images/services/images/images.service';
import { UsersService } from '../../../users/services/users/users.service';
import { CreateObservationDto } from '../../controllers/observations/createObservation.dto';
import { CreateObservationImageDto } from '../../controllers/observations/createObservationImage.dto';
import { UpdateObservationDto } from '../../controllers/observations/updateObservation.dto';
import { Observation } from '../../observation.entity';

const MAX_IMAGES_PER_OBSERVATION = 10;

@Injectable()
export class ObservationsService {
  constructor(
    @InjectRepository(Observation)
    private readonly observationRepository: Repository<Observation>,
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly imagesService: ImagesService,
  ) {}

  async findObservations(userId?: string): Promise<Observation[]> {
    const options = userId ? { where: { userId } } : {};

    return this.observationRepository.find(options);
  }

  findObservationById(
    id: string,
    options: FindOneOptions<Observation> = {},
  ): Promise<Observation> {
    options.where = { id };
    return this.observationRepository.findOne(options);
  }

  async createObservation(
    createObservationDto: CreateObservationDto,
  ): Promise<Observation> {
    const user = await this.usersService.findUserById(
      createObservationDto.userId,
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.observationRepository.save(createObservationDto);
  }

  async createObservationImage(
    observationId: string,
    createObservationImageDto: CreateObservationImageDto,
  ): Promise<Observation> {
    const observation = await this.findObservationById(observationId, {
      relations: ['images'],
    });
    if (!observation) {
      throw new NotFoundException('Observation not found');
    }

    if (observation.images.length >= MAX_IMAGES_PER_OBSERVATION) {
      throw new PreconditionFailedException(
        'Observation reached max number of images',
      );
    }

    const cloudImageUrl = await this.cloudinaryService.uploadFile(
      createObservationImageDto.imageUrl,
    );

    const image = await this.imagesService.createImage(
      cloudImageUrl,
      observationId,
    );

    const updatedObservation = {
      ...observation,
      images: [...observation.images, image],
    } as Partial<Observation>;

    return this.observationRepository.save(updatedObservation);
  }

  async updateObservation(
    id: string,
    updateObservationDto: UpdateObservationDto,
  ): Promise<Observation> {
    const observation = await this.findObservationById(id);
    if (!observation) {
      throw new NotFoundException('Observation not found');
    }

    await this.observationRepository.update(id, {
      ...observation,
      ...updateObservationDto,
    });

    return this.observationRepository.findOneOrFail({ where: { id } });
  }

  async deleteObservationById(id: string): Promise<void> {
    await this.observationRepository.delete(id);
  }
}
