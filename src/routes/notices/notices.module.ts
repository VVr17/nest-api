import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NoticesController } from './notices.controller';
import { NoticesService } from './notices.service';
import { Notice, NoticeSchema } from './schemas/notice.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notice.name, schema: NoticeSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [NoticesController],
  providers: [NoticesService, UsersService],
  exports: [NoticesService],
})
export class NoticesModule {}
