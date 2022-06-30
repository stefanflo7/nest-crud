import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/services/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUserCredentials(
    username: string,
    password: string,
  ): Promise<any> {
    const user = await this.usersService.findUserByName(username);

    const passwordsMatch = await bcrypt.compare(password, user.hashedPassword);

    if (user && passwordsMatch) {
      const { hashedPassword, ...result } = user;
      return result;
    }
    return null;
  }

  async loginWithCredentials(user: { username: string; userId: string }) {
    const payload = { username: user.username, sub: user.userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
