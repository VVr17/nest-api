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
  @ApiProperty() // Defines properties for CreateUserDto schema in Swagger
  @IsString()
  @MinLength(2)
  @MaxLength(16)
  @Matches(/^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/, {
    message: 'Only letters can be accepted',
  })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  birthDate: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(24)
  @IsNotEmpty({ message: 'Breed is required' })
  breed: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(200)
  comments?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  photoURL?: string;
}
