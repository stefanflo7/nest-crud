import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesController } from './controllers/images/images.controller';
import { Image } from './image.entity';
import { CloudinaryService } from './services/cloudinary/cloudinary.service';
import { ImagesService } from './services/images/images.service';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [CloudinaryService, ImagesService],
  controllers: [ImagesController],
  exports: [CloudinaryService, ImagesService],
})
export class ImagesModule {}
