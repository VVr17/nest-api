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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from './schemas/user.schema';
import { Notice } from '../notices/schemas/notice.schema';

@ApiTags('Users') // Swagger tag for API
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Get current user data
  @ApiOkResponse({ type: User })
  @Get('/current')
  async getUser(@Request() req: AuthenticatedRequest) {
    return await this.usersService.findById(req.user._id);
  }

  // update user data
  @ApiOkResponse({
    type: User,
    description: 'User profile has been successfully updated',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Put('/current')
  async updateUser(
    @Request() req: AuthenticatedRequest,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.update(updateUserDto, req.user._id);

    return {
      message: 'User profile has been successfully updated',
      data: user,
    };
  }

  // Delete user account
  @ApiOkResponse({ description: 'User profile has been successfully deleted' })
  @Delete('/current')
  async removeUserAccount(@Request() req: AuthenticatedRequest) {
    await this.usersService.remove(req.user._id);

    return {
      message: 'User profile has been successfully deleted',
    };
  }

  // Get user's own notices
  @ApiOkResponse({ type: [Notice] })
  @Get('/notices')
  async getUserNotices(@Request() req: AuthenticatedRequest) {
    const notices = await this.usersService.getUserNotices(req.user._id);

    return {
      message: 'Success',
      data: notices,
    };
  }

  // Get user's favorite notices
  @ApiOkResponse({ type: [Notice] })
  @Get('/favorites')
  async getUserFavorites(@Request() req: AuthenticatedRequest) {
    const favoriteNotices = await this.usersService.getUserFavoriteNotices(
      req.user._id,
    );

    return {
      message: 'Success',
      data: favoriteNotices,
    };
  }

  // Add notices to favorites
  @ApiOkResponse({ type: [Notice] })
  @Post('/favorites/:id')
  async addToFavorites(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
  ) {
    const updatedNotices = await this.usersService.addToFavorites(
      req.user._id,
      id,
    );

    return {
      message: `Notice ${id} added to favorites for user ${req.user._id}`,
      data: updatedNotices,
    };
  }

  // Remove notices from favorites
  @ApiOkResponse({ type: [Notice] })
  @Delete('/favorites/:id')
  async removeFromFavorites(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
  ) {
    const updatedNotices = await this.usersService.removeFromFavorites(
      req.user._id,
      id,
    );

    return {
      message: `Notice ${id} removed from favorites for user ${req.user._id}`,
      data: updatedNotices,
    };
  }
}
