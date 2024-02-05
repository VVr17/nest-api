import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match:
      /^(?=.{1,63}$)(?=.{2,}@)[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  })
  email: string;

  @Prop({ match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{7,}$/ })
  password?: string;

  @Prop({
    required: true,
    minLength: 3,
    maxLength: 32,
    match: /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/,
  })
  name: string;

  @Prop()
  birthday?: string;

  @Prop({
    match:
      /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?:[-\s]?[a-zA-Zа-яА-ЯіІїЇґҐ]+),\s[a-zA-Zа-яА-ЯіІїЇ'’\s-]+$/,
  })
  city?: string;

  @Prop({ match: /^\+380\d{9}$/ })
  phone?: string;

  @Prop()
  photoURL?: string;

  @Prop([{ type: Types.ObjectId, ref: 'Pet', default: [] }])
  pets?: string[];

  @Prop([
    {
      type: SchemaTypes.ObjectId,
      ref: 'Notice',
      default: [],
    },
  ])
  notices?: string[];

  @Prop([
    {
      type: SchemaTypes.ObjectId,
      ref: 'Notice',
      default: [],
    },
  ])
  favoriteNotices?: string[];

  @Prop({ default: null })
  authToken?: string;

  @Prop({ default: false })
  emailVerified?: boolean;

  @Prop({ default: null })
  resetToken?: string;

  @Prop({ default: null })
  resetTokenExpiration?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
