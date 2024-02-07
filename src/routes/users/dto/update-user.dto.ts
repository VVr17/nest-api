import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'email@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ required: false, example: 'John Smith' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false, example: '20.11.1990' })
  @IsOptional()
  @IsString()
  birthday?: string;

  @ApiProperty({ required: false, example: 'Kyiv, Ukraine' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ required: false, example: '+380991234567' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    required: false,
    example:
      'https://cdn.pixabay.com/photo/2019/11/09/20/57/german-shepherd-4614451_1280.jpg',
  })
  @IsOptional()
  @IsString()
  photoURL?: string;
}
