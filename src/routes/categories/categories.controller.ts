import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';

import { AdminGuard } from '../auth/guards/admin.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Categories') // Swagger tags for API
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AdminGuard)
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
