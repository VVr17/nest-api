import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { NoticesService } from './notices.service';
import { UpdateNoticeDto } from './dto/update-notice.dto';

@Controller('notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @Post()
  async addNotice(
    @Body(new ValidationPipe()) createNoticeDto: CreateNoticeDto,
  ) {
    const notice = await this.noticesService.create(createNoticeDto);
    return { message: 'New notice successfully created', data: notice };
  }

  @Get()
  async getNotices(
    @Query('category') category: string,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    const response = await this.noticesService.findAll(category, page, limit);

    return {
      message: 'Success',
      total: response.total,
      data: response.notices,
    };
  }

  @Get(':id')
  async getNoticeById(@Param('id') id: string) {
    const notice = await this.noticesService.findOne(id);
    return { message: 'Success', data: notice };
  }

  @Patch(':id')
  async updateNotice(
    @Param('id') id: string,
    @Body() updateNoticeDto: UpdateNoticeDto,
  ) {
    const updatedNotice = await this.noticesService.update(id, updateNoticeDto);
    return { message: 'Notice successfully updated', data: updatedNotice };
  }

  @Delete(':id')
  async removeNotice(@Param('id') id: string) {
    await this.noticesService.remove(id);
    return { message: `Notice ${id} has been deleted successfully` };
  }
}
