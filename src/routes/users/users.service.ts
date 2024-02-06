import {
  ConflictException,
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
      .select('email name password');
  }

  async getCurrentUser() {
    return 'This action return current user';
  }

  async update(updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates current user`;
  }

  async remove() {
    return `This action removes  user account from DB`;
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

    if (!user) {
      throw new NotFoundException(`User with ${id} not found`);
    }

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

    if (!user) {
      throw new NotFoundException(`User with ${id} not found`);
    }
    return user.favoriteNotices;
  }

  async addToFavorites(userId: string, noticeId: string) {
    const noticeObjectId = new Types.ObjectId(noticeId);

    const user = await this.userModel.findById(userId);
    const isInFavorites = user.favoriteNotices.includes(noticeId);

    if (!user) {
      throw new NotFoundException(`User with ${userId} not found`);
    }

    if (isInFavorites) {
      throw new ConflictException(
        `Notice with id: ${noticeId} has been already added`,
      );
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        { _id: userId },
        { $push: { favoriteNotices: noticeObjectId } },
        { new: true },
      )
      .populate({
        path: 'favoriteNotices',
        select: 'title photoURL name breed',
      });

    return updatedUser.favoriteNotices;
  }

  async removeFromFavorites(userId: string, noticeId: string) {
    const noticeObjectId = new Types.ObjectId(noticeId);

    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException(`User with ${userId} not found`);
    }

    if (!user.favoriteNotices.includes(noticeId)) {
      throw new NotFoundException(`Notice with ${noticeId} has not been found`);
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        { _id: userId },
        { $pull: { favoriteNotices: noticeObjectId } },
        { new: true },
      )
      .populate({
        path: 'favoriteNotices',
        select: 'title photoURL name breed',
      });

    return updatedUser.favoriteNotices;
  }
}
