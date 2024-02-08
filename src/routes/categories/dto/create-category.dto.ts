import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  ValidateNested,
} from 'class-validator';

class TitleDto {
  @ApiProperty({ example: 'Загублені/Знайдені' })
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  @IsNotEmpty()
  uk: string;

  @ApiProperty({ example: 'Lost/Found' })
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  @IsNotEmpty()
  en: string;
}

export class CreateCategoryDto {
  @ApiProperty() // Defines properties for CreateUserDto schema in Swagger
  @ValidateNested()
  @Type(() => TitleDto)
  title: TitleDto;

  @ApiProperty({ example: 'lost-found' })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  @Matches(/^[a-z0-9-]+$/, {
    message:
      'Invalid slug format. Use only lowercase letters, numbers, and hyphens.',
  })
  slug: string;
}
