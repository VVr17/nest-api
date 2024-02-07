import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NoticesController } from './notices.controller';
import { NoticesService } from './notices.service';
import { Notice, NoticeSchema } from './schemas/notice.schema';
import {
  Category,
  CategorySchema,
} from '../categories/schemas/category.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notice.name, schema: NoticeSchema },
      { name: Category.name, schema: CategorySchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [NoticesController],
  providers: [NoticesService, UsersService],
})
export class NoticesModule {}
