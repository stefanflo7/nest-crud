import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateObservationDto {
  @ApiProperty({ description: 'The observation date' })
  @IsOptional()
  @IsDateString()
  date?: Date;

  @ApiProperty({ description: 'The observation name' })
  @IsOptional()
  @IsNotEmpty()
  name?: string;
}
