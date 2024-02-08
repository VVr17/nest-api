import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '../users/schemas/user.schema';

@ApiTags('Auth') // Swagger tag for API
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    description: 'User has been successfully signed up',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.authService.signup(createUserDto);

    return {
      message: 'User has been successfully signed up',
      data: newUser,
    };
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'user@example.com',
        },
        password: {
          type: 'string',
          example: 'Password123',
        },
      },
      required: ['email', 'password'],
    },
  })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async logIn(@Request() req: AuthenticatedRequest) {
    return {
      access_token: this.authService.login(req.user),
      data: req.user,
    };
  }
}
