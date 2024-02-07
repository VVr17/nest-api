import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './schemas/pet.schema';
import { UsersService } from '../users/users.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

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

    // Update user's notices
    await this.usersService.updateField(
      { $push: { pets: createdPet._id } },
      userId,
    );

    return createdPet;
  }

  findOne(id: number) {
    return `This action returns a #${id} pet`;
  }

  update(id: string, updatePetDto: UpdatePetDto) {
    console.log(updatePetDto);
    return `This action updates a #${id} pet`;
  }

  remove(id: string) {
    return `This action removes a #${id} pet`;
  }
}
