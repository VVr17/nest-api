import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Notice } from 'src/routes/notices/schemas/notice.schema';

@Injectable()
export class NoticesService {
  constructor(@InjectModel(Notice.name) private noticeModel: Model<Notice>) {}

  create(createNoticeDto: CreateNoticeDto) {
    console.log(createNoticeDto);
    return 'This action adds a new notice';
  }

  findAll() {
    return this.noticeModel.find().exec();
    // return `This action returns all notices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notice`;
  }

  update(id: number, updateNoticeDto: UpdateNoticeDto) {
    console.log(updateNoticeDto);
    return `This action updates a #${id} notice`;
  }

  remove(id: number) {
    return `This action removes a #${id} notice`;
  }
}
