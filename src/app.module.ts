import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './routes/users/users.module';
import { NoticesModule } from './routes/notices/notices.module';
import { PetsModule } from './routes/pets/pets.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    UsersModule,
    NoticesModule,
    PetsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
