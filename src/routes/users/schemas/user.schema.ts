import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @ApiProperty({ example: 'email@gmail.com' })
  @Prop({
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match:
      /^(?=.{1,63}$)(?=.{2,}@)[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  })
  email: string;

  @ApiProperty({ example: 'Password1' })
  @Prop({ match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{7,}$/ })
  password?: string;

  @ApiProperty({ example: true })
  @Prop({ default: false })
  isAdmin: boolean;

  @ApiProperty({ example: 'John Smith' })
  @Prop({
    minLength: 3,
    maxLength: 32,
    match: /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/,
    default: null,
  })
  name: string;

  @ApiProperty({ example: '20.11.1990' })
  @Prop({ default: null })
  birthday: string;

  @ApiProperty({ example: 'Kyiv, Ukraine' })
  @Prop({
    match:
      /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?:[-\s]?[a-zA-Zа-яА-ЯіІїЇґҐ]+),\s[a-zA-Zа-яА-ЯіІїЇ'’\s-]+$/,
    default: null,
  })
  city: string;

  @ApiProperty({ example: '+380991234567' })
  @Prop({ match: /^\+380\d{9}$/, default: null })
  phone?: string;

  @ApiProperty({
    example:
      'https://cdn.pixabay.com/photo/2019/11/09/20/57/german-shepherd-4614451_1280.jpg',
  })
  @Prop({ default: null })
  photoURL: string;

  @ApiProperty()
  @Prop([{ type: SchemaTypes.ObjectId, ref: 'Pet', default: [] }])
  pets: string[];

  @ApiProperty()
  @Prop([
    {
      type: SchemaTypes.ObjectId,
      ref: 'Notice',
      default: [],
    },
  ])
  notices: string[];

  @ApiProperty()
  @Prop([
    {
      type: SchemaTypes.ObjectId,
      ref: 'Notice',
      default: [],
    },
  ])
  favoriteNotices: string[];

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop({ default: null })
  resetPasswordToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Password hashing before store new user to DB
UserSchema.pre('save', async function preSave(next) {
  // Only hash the password if it has been modified or is new
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(); // Generate a salt
    const hash = await bcrypt.hash(this.password, salt); // Hash the password with the salt
    this.password = hash; // Set the hashed password back in the document
    return next();
  } catch (err) {
    return next(err);
  }
});
