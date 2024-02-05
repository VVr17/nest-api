import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type NoticeDocument = HydratedDocument<Notice>;

@Schema({ timestamps: true, versionKey: false })
export class Notice {
  @Prop({ required: true, minLength: 2, maxLength: 48, trim: true })
  title: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  owner: string;

  @Prop({ required: true })
  photoURL: string;

  @Prop({
    required: true,
    minLength: 2,
    maxLength: 16,
    trim: true,
    match: /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/,
  })
  name: string;

  @Prop({
    required: true,
    minLength: 2,
    maxLength: 24,
    trim: true,
    match: /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/,
  })
  breed: string;

  @Prop({ required: true, enum: ['male', 'female'] })
  sex: 'male' | 'female';

  @Prop({ required: true })
  birthDate: string;

  @Prop({
    required: true,
    match:
      /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?:[-\s]?[a-zA-Zа-яА-ЯіІїЇґҐ]+),\s[a-zA-Zа-яА-ЯіІїЇ'’\s-]+$/,
  })
  location: string;

  @Prop({ required: true, minLength: 8, maxLength: 200 })
  comments: string;

  @Prop({ default: null })
  price?: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Category', required: true })
  category: string;
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
