import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Users') // Swagger tag for API
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/current')
  async getUser(@Request() req) {
    return await this.usersService.findById(req.user._id);
  }

  @Put('/current')
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
