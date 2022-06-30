import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from 'src/images/images.module';
import { UsersModule } from 'src/users/users.module';
import { ObservationsController } from './controllers/observations/observations.controller';
import { Observation } from './observation.entity';
import { ObservationsService } from './services/observations/observations.service';

@Module({
  imports: [UsersModule, ImagesModule, TypeOrmModule.forFeature([Observation])],
  controllers: [ObservationsController],
  providers: [ObservationsService],
})
export class ObservationsModule {}
