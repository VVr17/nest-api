import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Notice, NoticeSchema } from '../notices/schemas/notice.schema';
import { NoticesService } from '../notices/notices.service';
import { Pet, PetSchema } from '../pets/schemas/pet.schema';
import { PetsService } from '../pets/pets.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notice.name, schema: NoticeSchema },
      { name: User.name, schema: UserSchema },
      { name: Pet.name, schema: PetSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, PetsService, NoticesService],
  exports: [UsersService],
})
export class UsersModule {}
