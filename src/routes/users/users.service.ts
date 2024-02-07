import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Notice } from '../notices/schemas/notice.schema';
import { User } from './schemas/user.schema';
import { Category } from '../categories/schemas/category.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Notice.name) private noticeModel: Model<Notice>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findOne(email: string): Promise<User> {
    return await this.userModel
      .findOne({ email })
      .select('email name password')
      .lean();
  }

  async findById(id: string) {
    return await this.userModel
      .findById(id)
      .select('email name birthday city phone photoURL isAdmin');
  }

  async update(updateUserDto: UpdateUserDto, id: string) {
    return await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .select('email name birthday city phone photoURL');
  }

  async remove(id: string) {
    //TODO: remove user data from notices and pets
    return await this.userModel.findByIdAndDelete(id);
  }

  async getUserNotices(id: string) {
    const user = await this.userModel
      .findById(id)
      .select('notices')
      .populate({
        path: 'notices',
        select: 'title photoURL name breed',
      })
      .exec();

    return user.notices;
  }

  async getUserFavoriteNotices(id: string) {
    const user = await this.userModel
      .findById(id)
      .select('favoriteNotices')
      .populate({
        path: 'favoriteNotices',
        select: 'title photoURL name breed',
      })
      .exec();

    return user.favoriteNotices;
  }

  async addToFavorites(userId: string, noticeId: string) {
    const noticeObjectId = new Types.ObjectId(noticeId);

    const user = await this.userModel
      .findById(userId)
      .select('favoriteNotices');
    const isInFavorites = user.favoriteNotices.includes(noticeId);

    if (isInFavorites) {
      throw new BadRequestException(
        `Notice with id: ${noticeId} has been already added`,
      );
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        { _id: userId },
        { $push: { favoriteNotices: noticeObjectId } },
        { new: true },
      )
      .select('favoriteNotices')
      .populate({
        path: 'favoriteNotices',
        select: 'title photoURL name breed',
      });

    return updatedUser.favoriteNotices;
  }

  async removeFromFavorites(userId: string, noticeId: string) {
    const noticeObjectId = new Types.ObjectId(noticeId);

    const user = await this.userModel
      .findById(userId)
      .select('favoriteNotices');

    if (!user.favoriteNotices.includes(noticeId)) {
      throw new NotFoundException(`Notice with ${noticeId} has not been found`);
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        { _id: userId },
        { $pull: { favoriteNotices: noticeObjectId } },
        { new: true },
      )
      .select('favoriteNotices')
      .populate({
        path: 'favoriteNotices',
        select: 'title photoURL name breed',
      });

    return updatedUser.favoriteNotices;
  }
}
