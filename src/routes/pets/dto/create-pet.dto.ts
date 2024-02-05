import {
  IsString,
  IsNotEmpty,
  IsOptional,
  Matches,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreatePetDto {
  @IsString()
  @MinLength(2)
  @MaxLength(16)
  @Matches(/^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/, {
    message: 'Only letters can be accepted',
  })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsOptional()
  @IsString()
  birthDate?: string;

  @IsString()
  @MinLength(2)
  @MaxLength(24)
  @IsNotEmpty({ message: 'Breed is required' })
  breed: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(200)
  comments?: string;

  @IsOptional()
  @IsString()
  photoURL?: string;
}
