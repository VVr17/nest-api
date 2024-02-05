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
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  @IsNotEmpty()
  uk: string;

  @IsString()
  @MinLength(4)
  @MaxLength(30)
  @IsNotEmpty()
  en: string;
}

export class CreateCategoryDto {
  @ValidateNested()
  @Type(() => TitleDto)
  title: TitleDto;

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
