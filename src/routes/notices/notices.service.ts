import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CreateNoticeDto } from './dto/create-notice.dto';
import { Notice } from './schemas/notice.schema';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class NoticesService {
  constructor(
    @InjectModel(Notice.name) private noticeModel: Model<Notice>,
    private readonly usersService: UsersService,
  ) {}

  async create(
    createNoticeDto: CreateNoticeDto,
    userId: string,
  ): Promise<Notice> {
    // Create notice
    const noticeData = new this.noticeModel({
      ...createNoticeDto,
      owner: userId,
    });

    const createdNotice = await noticeData.save();

    // Update user's notices
    await this.usersService.updateField(
      { $push: { notices: createdNotice._id } },
      userId,
    );

    return createdNotice;
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

  async removeOne(noticeId: string, userId: string): Promise<void> {
    const noticeObjectId = new Types.ObjectId(noticeId);

    const deletedNotice = await this.noticeModel.findByIdAndDelete(noticeId);

    if (!deletedNotice) {
      throw new NotFoundException(`Notice with ID ${noticeId} not found`);
    }

    // Update user's pets
    await this.usersService.updateField(
      { $pull: { notices: noticeObjectId } },
      userId,
    );

    return;
  }

  async removeMany(noticeIds: string[]): Promise<void> {
    await this.noticeModel.deleteMany({ _id: { $in: noticeIds } });
  }
}
