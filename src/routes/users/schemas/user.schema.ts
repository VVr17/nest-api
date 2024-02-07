import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';

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
    minLength: 3,
    maxLength: 32,
    match: /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/,
    default: null,
  })
  name?: string;

  @Prop({ default: null })
  birthday?: string;

  @Prop({
    match:
      /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?:[-\s]?[a-zA-Zа-яА-ЯіІїЇґҐ]+),\s[a-zA-Zа-яА-ЯіІїЇ'’\s-]+$/,
    default: null,
  })
  city?: string;

  @Prop({ match: /^\+380\d{9}$/, default: null })
  phone?: string;

  @Prop({ default: null })
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

  @Prop({ default: false })
  emailVerified?: boolean;

  @Prop({ default: null })
  resetPasswordToken?: string;
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
