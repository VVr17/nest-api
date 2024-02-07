import { Test, TestingModule } from '@nestjs/testing';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { UsersService } from '../users/users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Pet } from './schemas/pet.schema';
import { User } from '../users/schemas/user.schema';

describe('PetsController', () => {
  let controller: PetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetsController],
      providers: [
        PetsService,
        UsersService,
        {
          provide: getModelToken(Pet.name),
          useValue: {
            new: jest.fn(),
            constructor: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            updateOne: jest.fn(),
            deleteOne: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
        {
          provide: getModelToken(User.name),
          useValue: {
            new: jest.fn(),
            constructor: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            updateOne: jest.fn(),
            deleteOne: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PetsController>(PetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
