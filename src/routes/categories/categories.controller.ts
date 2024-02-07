import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@ApiTags('Categories') // Swagger tags for API
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async addCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const createdCategory =
      await this.categoriesService.create(createCategoryDto);
    return { message: 'Category successfully created', data: createdCategory };
  }

  @Get()
  async getAllCategories() {
    const categories = await this.categoriesService.findAll();
    return { message: 'Success', data: categories };
  }

  @Get(':id')
  async GetCategoryById(@Param('id') id: string) {
    const category = await this.categoriesService.findOne(id);
    return { message: 'Success', data: category };
  }
}
