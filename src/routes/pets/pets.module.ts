import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { UsersService } from '../users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pet, PetSchema } from './schemas/pet.schema';
import { User, UserSchema } from '../users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pet.name, schema: PetSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [PetsController],
  providers: [PetsService, UsersService],
})
export class PetsModule {}
