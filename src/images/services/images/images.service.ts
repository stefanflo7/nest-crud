import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '../../image.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async findImages(): Promise<Image[]> {
    return this.imageRepository.find();
  }

  findImageById(id: string): Promise<Image> {
    return this.imageRepository.findOne({ where: { id } });
  }

  async createImage(imageUrl: string, observationId: string): Promise<Image> {
    return this.imageRepository.save({ imageUrl, observationId });
  }
}
