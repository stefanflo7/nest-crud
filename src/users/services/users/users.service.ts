import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../createUser.dto';
import { User } from '../../user.entity';

dotenv.config();

const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findUsers(): Promise<User[]> {
    return this.userRepository.find({ select: ['id', 'name'] });
  }

  findUserById(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      select: ['id', 'name'],
    });
  }

  findUserByName(name: string): Promise<User> {
    return this.userRepository.findOne({
      where: { name },
      select: ['id', 'name'],
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      SALT_ROUNDS,
    );

    await this.userRepository.save({
      name: createUserDto.name,
      hashedPassword,
    });
  }
}
