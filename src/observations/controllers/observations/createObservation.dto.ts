import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateObservationDto {
  @ApiProperty({ description: 'The observation date' })
  @IsDateString()
  date: Date;

  @ApiProperty({ description: 'The observation name' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The observation description' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'The userId of the observation' })
  @IsString()
  userId: string;
}
