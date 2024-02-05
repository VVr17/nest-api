import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Get('/current')
  async getCurrentUser() {
    return this.usersService.getCurrentUser();
  }

  @Get('/logout')
  async logout() {
    return this.usersService.logout();
  }

  @Patch('/current')
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete('/current')
  async removeUserAccount() {
    return this.usersService.remove();
  }

  @Get(':id/notices')
  async getUserNotices(@Param('id') userId: string) {
    const notices = await this.usersService.getUserNotices(userId);

    return {
      message: 'Success',
      data: notices,
    };
  }

  @Get(':id/favorites')
  async getUserFavorites(@Param('id') userId: string) {
    const favoriteNotices =
      await this.usersService.getUserFavoriteNotices(userId);
    return {
      message: 'Success',
      data: favoriteNotices,
    };
  }

  @Post(':id/favorites/:noticeId')
  async addToFavorites(
    @Param('id') userId: string,
    @Param('noticeId') noticeId: string,
  ) {
    const updatedNotices = await this.usersService.addToFavorites(
      userId,
      noticeId,
    );
    return {
      message: `Notice ${noticeId} added to favorites for user ${userId}`,
      data: updatedNotices,
    };
  }

  @Delete(':id/favorites/:noticeId')
  async removeFromFavorites(
    @Param('id') userId: string,
    @Param('noticeId') noticeId: string,
  ) {
    const updatedNotices = await this.usersService.removeFromFavorites(
      userId,
      noticeId,
    );
    return {
      message: `Notice ${noticeId} removed from favorites for user ${userId}`,
      data: updatedNotices,
    };
  }
}
