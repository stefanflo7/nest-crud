import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Observation } from '../../observation.entity';
import { ObservationsService } from '../../services/observations/observations.service';
import { CreateObservationDto } from './createObservation.dto';
import { CreateObservationImageDto } from './createObservationImage.dto';
import { UpdateObservationDto } from './updateObservation.dto';

@ApiTags('observations')
@Controller('observations')
export class ObservationsController {
  constructor(private readonly observationsService: ObservationsService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all observations' })
  getObservations(@Query('userId') userId?: string): Promise<Observation[]> {
    return this.observationsService.findObservations(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an observation' })
  getObservationById(@Param('id') id: string): Promise<Observation> {
    return this.observationsService.findObservationById(id);
  }

  @Post('')
  @ApiOperation({ summary: 'Create an observation' })
  @UsePipes(ValidationPipe)
  createObservation(
    @Body() createObservationDto: CreateObservationDto,
  ): Promise<Observation> {
    return this.observationsService.createObservation(createObservationDto);
  }

  @Post(':id/image')
  @ApiOperation({ summary: 'Create an image for the observation' })
  @UsePipes(ValidationPipe)
  createObservationImage(
    @Param('id') id: string,
    @Body() createObservationImageDto: CreateObservationImageDto,
  ): Promise<Observation> {
    return this.observationsService.createObservationImage(
      id,
      createObservationImageDto,
    );
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Update an observation' })
  updateObservationById(
    @Param('id') id: string,
    @Body() updateObservationDto: UpdateObservationDto,
  ): Promise<Observation> {
    return this.observationsService.updateObservation(id, updateObservationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Retrieve an observation' })
  deleteObservationById(@Param('id') id: string): Promise<void> {
    return this.observationsService.deleteObservationById(id);
  }
}
