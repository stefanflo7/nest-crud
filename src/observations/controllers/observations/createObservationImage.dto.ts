import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateObservationImageDto {
  @ApiProperty({ description: 'The image url of the observation' })
  @IsString()
  imageUrl: string;
}
