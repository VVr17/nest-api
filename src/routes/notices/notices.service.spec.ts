import { Test, TestingModule } from '@nestjs/testing';
import { NoticesService } from './notices.service';
import { getModelToken } from '@nestjs/mongoose';
import { Notice } from './schemas/notice.schema';
import { Category } from '../categories/schemas/category.schema';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';

describe('NoticesService', () => {
  let service: NoticesService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        NoticesService,
        {
          provide: getModelToken(Notice.name),
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
        {
          provide: getModelToken(Category.name),
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

    service = module.get<NoticesService>(NoticesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
