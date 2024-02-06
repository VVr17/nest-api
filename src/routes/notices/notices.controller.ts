import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { NoticesService } from './notices.service';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Notice } from './schemas/notice.schema';

@ApiTags('Notices') // Swagger tags for API
@Controller('notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @ApiCreatedResponse({
    description: 'The notice has been successfully created.',
    type: [Notice],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Post()
  async addNotice(@Body() createNoticeDto: CreateNoticeDto) {
    const notice = await this.noticesService.create(createNoticeDto);
    return { message: 'New notice successfully created', data: notice };
  }

  @ApiOkResponse({ type: [Notice] })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Get()
  async getNotices(
    @Query('category') category: string = null,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const response = await this.noticesService.findAll(category, +page, +limit);

    return {
      message: 'Success',
      total: response.total,
      data: response.notices,
    };
  }

  @ApiOkResponse({
    description: 'The notice has been successfully found.',
    type: Notice,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @Get(':id')
  async getNoticeById(@Param('id') id: string) {
    const notice = await this.noticesService.findOne(id);
    return { message: 'Success', data: notice };
  }

  @ApiOkResponse({
    description: 'The notice has been successfully updated.',
    type: Notice,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @Put(':id')
  async updateNotice(
    @Param('id') id: string,
    @Body() updateNoticeDto: UpdateNoticeDto,
  ) {
    const updatedNotice = await this.noticesService.update(id, updateNoticeDto);
    return { message: 'Notice successfully updated', data: updatedNotice };
  }

  @ApiOkResponse({
    description: 'The notice has been successfully deleted.',
    type: Notice,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @Delete(':id')
  async removeNotice(@Param('id') id: string) {
    await this.noticesService.remove(id);
    return { message: `Notice ${id} has been deleted successfully` };
  }
}
