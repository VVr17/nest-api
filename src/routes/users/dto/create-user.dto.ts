import {
  IsString,
  IsEmail,
  IsOptional,
  IsDate,
  IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  birthday?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  photoURL?: string;

  @IsOptional()
  pets?: string[];

  @IsOptional()
  notices?: string[];

  @IsOptional()
  favoriteNotices?: string[];

  @IsOptional()
  @IsString()
  authToken?: string;

  @IsBoolean()
  emailVerified?: boolean;

  @IsOptional()
  @IsString()
  resetToken?: string;

  @IsOptional()
  @IsDate()
  resetTokenExpiration?: Date;
}
