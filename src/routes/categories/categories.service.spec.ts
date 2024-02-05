import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { getModelToken } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
import { Category } from './schemas/category.schema';

describe('CategoriesService', () => {
  let service: CategoriesService;
  // let categoryModel: Model<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
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

    service = module.get<CategoriesService>(CategoriesService);
    // categoryModel = module.get<Model<Category>>(getModelToken(Category.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('findAll', () => {
  //   it('should return an array of categories', async () => {
  //     const result = [
  //       {
  //         /* mock category data */
  //       },
  //     ];
  //     jest.spyOn(categoryModel, 'find').mockReturnValueOnce({
  //       exec: jest.fn().mockResolvedValueOnce(result),
  //     } as any);

  //     expect(await service.findAll()).toBe(result);
  //   });
  // });

  // describe('findOne', () => {
  //   it('should return a category by ID', async () => {
  //     const result = {
  //       /* mock category data */
  //     };
  //     jest.spyOn(categoryModel, 'findOne').mockReturnValueOnce({
  //       exec: jest.fn().mockResolvedValueOnce(result),
  //     } as any);

  //     expect(await service.findOne(1)).toBe(result);
  //   });
  // });

  // describe('create', () => {
  //   it('should create a new category', async () => {
  //     const createCategoryDto = {
  //       /* mock createCategoryDto data */
  //     };
  //     const result = {
  //       /* mock created category data */
  //     };
  //     jest.spyOn(categoryModel, 'create').mockResolvedValueOnce(result as any);

  //     expect(await service.create(CreateCategoryDto)).toBe(result);
  //   });
  // });

  // describe('update', () => {
  //   it('should update a category by ID', async () => {
  //     const updateCategoryDto = {
  //       /* mock updateCategoryDto data */
  //     };
  //     const result = {
  //       /* mock updated category data */
  //     };
  //     jest
  //       .spyOn(categoryModel, 'updateOne')
  //       .mockResolvedValueOnce({ nModified: 1 } as any);
  //     jest.spyOn(categoryModel, 'findOne').mockReturnValueOnce({
  //       exec: jest.fn().mockResolvedValueOnce(result),
  //     } as any);

  //     expect(await service.update(1, updateCategoryDto)).toBe(result);
  //   });
  // });

  // describe('remove', () => {
  //   it('should remove a category by ID', async () => {
  //     jest
  //       .spyOn(categoryModel, 'deleteOne')
  //       .mockResolvedValueOnce({ deletedCount: 1 } as any);

  //     expect(await service.remove(1)).toBe(
  //       `This action removes a #${1} category`,
  //     );
  //   });
  // });
});
