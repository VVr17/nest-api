import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';

import { AdminGuard } from '../auth/guards/admin.guard';
import { Category } from './schemas/category.schema';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Categories') // Swagger tags for API
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiCreatedResponse({
    description: 'Category has been successfully created',
    type: Category,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Post()
  async addCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const createdCategory =
      await this.categoriesService.create(createCategoryDto);
    return {
      message: 'Category has been successfully created',
      data: createdCategory,
    };
  }

  @ApiOkResponse({ type: [Category] })
  @Get()
  async getAllCategories() {
    const categories = await this.categoriesService.findAll();
    return { message: 'Success', data: categories };
  }

  @ApiOkResponse({
    description: 'The category has been successfully found.',
    type: Category,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @Get(':id')
  async GetCategoryById(@Param('id') id: string) {
    const category = await this.categoriesService.findOne(id);
    return {
      message: 'The category has been successfully found.',
      data: category,
    };
  }
}
