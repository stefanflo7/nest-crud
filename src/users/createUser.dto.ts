import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'The user name' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The user password' })
  @IsNotEmpty()
  password: string;
}
