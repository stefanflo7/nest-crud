import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Image } from '../../image.entity';
import { ImagesService } from '../../services/images/images.service';

@ApiTags('images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all images' })
  getImages(): Promise<Image[]> {
    return this.imagesService.findImages();
  }
}
