import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  Matches,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreatePetDto {
  @ApiProperty({ example: 'Bunny' }) // Defines properties for CreateUserDto schema in Swagger
  @IsString()
  @MinLength(2)
  @MaxLength(16)
  @Matches(/^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/, {
    message: 'Only letters can be accepted',
  })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({ required: false, example: '20.10.2020' })
  @IsOptional()
  @IsString()
  birthDate: string;

  @ApiProperty({ required: false, example: 'Shepherd' })
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(24)
  breed?: string;

  @ApiProperty({ required: false, example: 'Good friend' })
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(200)
  comments?: string;

  @ApiProperty({
    required: false,
    example:
      'https://cdn.pixabay.com/photo/2019/11/09/20/57/german-shepherd-4614451_1280.jpg',
  })
  @IsOptional()
  @IsString()
  photoURL?: string;
}
