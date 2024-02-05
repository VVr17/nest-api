import { Test, TestingModule } from '@nestjs/testing';
import { NoticesService } from './notices.service';
import { getModelToken } from '@nestjs/mongoose';
import { Notice } from './schemas/notice.schema';
import { Category } from '../categories/schemas/category.schema';
import { User } from '../users/schemas/user.schema';

describe('NoticesService', () => {
  let service: NoticesService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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
    // noticeModel = module.get<Model<Notice>>(getModelToken(Notice.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('findAll', () => {
  //   it('should return an array of notices', async () => {
  //     const result = [
  //       {
  //         /* mock notice data */
  //       },
  //     ];
  //     jest.spyOn(noticeModel, 'find').mockReturnValueOnce({
  //       populate: jest.fn().mockReturnThis(),
  //       exec: jest.fn().mockResolvedValueOnce(result),
  //     } as any);

  //     expect(await service.findAll()).toBe(result);
  //   });
  // });

  // describe('findOne', () => {
  //   it('should return a notice by ID', async () => {
  //     const result = {
  //       /* mock notice data */
  //     };
  //     jest.spyOn(noticeModel, 'findOne').mockReturnValueOnce({
  //       exec: jest.fn().mockResolvedValueOnce(result),
  //     } as any);

  //     expect(await service.findOne(1)).toBe(result);
  //   });
  // });

  // describe('create', () => {
  //   it('should create a new notice', async () => {
  //     const createNoticeDto: CreateNoticeDto = {
  //       /* mock createNoticeDto data */
  //     };
  //     const result = {
  //       /* mock created notice data */
  //     };
  //     jest.spyOn(noticeModel, 'create').mockResolvedValueOnce(result as any);

  //     expect(await service.create(createNoticeDto)).toBe(result);
  //   });
  // });

  // describe('update', () => {
  //   it('should update a notice by ID', async () => {
  //     const updateNoticeDto = {
  //       /* mock updateNoticeDto data */
  //     };
  //     const result = {
  //       /* mock updated notice data */
  //     };
  //     jest
  //       .spyOn(noticeModel, 'updateOne')
  //       .mockResolvedValueOnce({ nModified: 1 } as any);
  //     jest.spyOn(noticeModel, 'findOne').mockReturnValueOnce({
  //       exec: jest.fn().mockResolvedValueOnce(result),
  //     } as any);

  //     expect(await service.update(1, updateNoticeDto)).toBe(result);
  //   });
  // });

  // describe('remove', () => {
  //   it('should remove a notice by ID', async () => {
  //     jest
  //       .spyOn(noticeModel, 'deleteOne')
  //       .mockResolvedValueOnce({ deletedCount: 1 } as any);

  //     expect(await service.remove(1)).toBe(
  //       `This action removes a #${1} notice`,
  //     );
  //   });
  // });
});
