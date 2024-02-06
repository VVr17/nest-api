import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

import { NoticesModule } from './routes/notices/notices.module';
import { PetsModule } from './routes/pets/pets.module';
import { UsersModule } from './routes/users/users.module';
import { CategoriesModule } from './routes/categories/categories.module';
import { AuthModule } from './routes/auth/auth.module';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    UsersModule,
    NoticesModule,
    PetsModule,
    CategoriesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
