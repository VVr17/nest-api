import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CreatePetDto } from './dto/create-pet.dto';
import { Pet } from './schemas/pet.schema';
import { UsersService } from '../users/users.service';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetsService {
  constructor(
    @InjectModel(Pet.name) private petModel: Model<Pet>,
    private readonly usersService: UsersService,
  ) {}

  async create(createPetDto: CreatePetDto, userId: string): Promise<Pet> {
    // Create pet
    const petData = new this.petModel({
      ...createPetDto,
      owner: userId,
    });

    const createdPet = await petData.save();

    // Update user's pets
    await this.usersService.updateField(
      { $push: { pets: createdPet._id } },
      userId,
    );

    return createdPet;
  }

  async update(id: string, updatePetDto: UpdatePetDto): Promise<Pet> {
    return await this.petModel
      .findByIdAndUpdate(id, updatePetDto, { new: true })
      .select('name birthDate breed comments photoURL');
  }

  async removeOne(petId: string, userId: string): Promise<void> {
    const petObjectId = new Types.ObjectId(petId);

    // Delete pet
    const deletedPet = await this.petModel.findByIdAndDelete(petId);

    if (!deletedPet) {
      throw new NotFoundException(`Pet with id: ${petId} has not been found`);
    }

    // Update user's pets
    await this.usersService.updateField(
      { $pull: { pets: petObjectId } },
      userId,
    );

    return;
  }

  async removeMany(petIds: string[]): Promise<void> {
    await this.petModel.deleteMany({ _id: { $in: petIds } });
  }
}
