import { Module } from '@nestjs/common';
import { NoticesService } from './notices.service';
import { NoticesController } from './notices.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notice, NoticeSchema } from 'src/routes/notices/schemas/notice.schema';
// import { Notice } from './entities/notice.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notice.name, schema: NoticeSchema }]),
  ],
  controllers: [NoticesController],
  providers: [NoticesService],
})
export class NoticesModule {}
