import {
  IsString,
  IsEnum,
  IsNotEmpty,
  Matches,
  MinLength,
  IsOptional,
  MaxLength,
  IsNumber,
} from 'class-validator';

export class CreateNoticeDto {
  @IsString()
  @MinLength(2)
  @MaxLength(48)
  title: string;

  @IsString()
  @MinLength(2)
  @MaxLength(16)
  @Matches(/^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/)
  name: string;

  @IsString()
  @IsNotEmpty()
  photoURL: string;

  @IsString()
  @MinLength(2)
  @MaxLength(24)
  @Matches(/^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/)
  breed: string;

  @IsEnum(['male', 'female'])
  sex: 'male' | 'female';

  @IsString()
  @IsNotEmpty()
  birthDate: string;

  @IsString()
  @IsNotEmpty()
  @Matches(
    /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?:[-\s]?[a-zA-Zа-яА-ЯіІїЇґҐ]+),\s[a-zA-Zа-яА-ЯіІїЇ'’\s-]+$/,
  )
  location: string;

  @IsString()
  @MinLength(8)
  @MaxLength(200)
  @IsNotEmpty()
  comments: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  owner: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}
