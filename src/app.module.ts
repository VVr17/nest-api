import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

import { NoticesModule } from './routes/notices/notices.module';
import { PetsModule } from './routes/pets/pets.module';
import { UsersModule } from './routes/users/users.module';
import { CategoriesModule } from './routes/categories/categories.module';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    UsersModule,
    NoticesModule,
    PetsModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
