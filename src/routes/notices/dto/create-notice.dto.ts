import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: 'My Notice Title' }) // Defines properties for CreateUserDto schema in Swagger
  @IsString()
  @MinLength(2)
  @MaxLength(48)
  title: string;

  @ApiProperty({ example: 'Sunny' })
  @IsString()
  @MinLength(2)
  @MaxLength(16)
  @Matches(/^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/)
  name: string;

  @ApiProperty({
    example:
      'https://cdn.pixabay.com/photo/2019/11/09/20/57/german-shepherd-4614451_1280.jpg',
  })
  @IsString()
  @IsNotEmpty()
  photoURL: string;

  @ApiProperty({ example: 'Shepherd' })
  @IsString()
  @MinLength(2)
  @MaxLength(24)
  @Matches(/^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/)
  breed: string;

  @ApiProperty({ enum: ['male', 'female'], example: 'female' })
  @IsEnum(['male', 'female'])
  sex: 'male' | 'female';

  @ApiProperty({ example: '20.10.2020' })
  @IsString()
  @IsNotEmpty()
  birthDate: string;

  @ApiProperty({ example: 'Kyiv, Ukraine' })
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?:[-\s]?[a-zA-Zа-яА-ЯіІїЇґҐ]+),\s[a-zA-Zа-яА-ЯіІїЇ'’\s-]+$/,
  )
  location: string;

  @ApiProperty({ example: 'This is my comments' })
  @IsString()
  @MinLength(8)
  @MaxLength(200)
  @IsNotEmpty()
  comments: string;

  @ApiProperty({ required: false, example: 100 })
  @IsOptional()
  @IsNumber()
  price: number;

  @ApiProperty({ example: '65c09f85e5500442ec32c622' })
  @IsString()
  @IsNotEmpty()
  category: string;
}
