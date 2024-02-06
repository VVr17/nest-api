import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

// Strategy Provider
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      usernameField: 'email', // Config: Specify email as the field for authentication
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!user || !isPasswordValid) {
      throw new UnauthorizedException('Email or password is not valid');
    }

    return { email: user.email, name: user.name };
  }
}
