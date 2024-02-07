import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category } from '../categories/schemas/category.schema';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { Notice } from './schemas/notice.schema';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class NoticesService {
  constructor(
    @InjectModel(Notice.name) private noticeModel: Model<Notice>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(
    createNoticeDto: CreateNoticeDto,
    owner: string,
  ): Promise<Notice> {
    console.log('owner', owner);
    const createdNotice = new this.noticeModel(createNoticeDto);
    return createdNotice.save();
  }

  async findAll(
    category: string | null,
    page: number,
    limit: number,
  ): Promise<{ notices: Notice[]; total: number }> {
    const params: any = {};

    if (category) {
      params.category = category;
    }

    const total = await this.noticeModel.countDocuments(params);

    const notices = await this.noticeModel
      .find(params)
      .populate('owner', 'email name')
      .populate('category', 'title')
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return { notices, total };
  }

  async findOne(id: string): Promise<Notice> {
    const notice = await this.noticeModel
      .findById(id)
      .populate('owner', 'email name')
      .populate('category', 'title')
      .exec();

    if (!notice) {
      throw new NotFoundException(`Notice with ID ${id} not found`);
    }

    return notice;
  }

  async update(id: string, updateNoticeDto: UpdateNoticeDto): Promise<Notice> {
    const updatedNotice = await this.noticeModel.findOneAndUpdate(
      { _id: id },
      updateNoticeDto,
      { new: true },
    );

    if (!updatedNotice) {
      throw new NotFoundException(`Notice with ID ${id} not found`);
    }

    return updatedNotice;
  }

  async remove(id: string): Promise<void> {
    const deletedNotice = await this.noticeModel.findByIdAndDelete(id);

    if (!deletedNotice) {
      throw new NotFoundException(`Notice with ID ${id} not found`);
    }
  }
}
