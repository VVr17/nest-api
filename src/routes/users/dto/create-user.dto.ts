import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'email@gmail.com' }) // Defines properties for CreateUserDto schema in Swagger
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password1' })
  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty({ example: true })
  isAdmin?: boolean;

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
