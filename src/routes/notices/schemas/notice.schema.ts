import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type NoticeDocument = HydratedDocument<Notice>;

@Schema({ timestamps: true, versionKey: false })
export class Notice {
  @ApiProperty({ example: 'My Notice Title' })
  @Prop({ required: true, minLength: 2, maxLength: 48, trim: true })
  title: string;

  @ApiProperty({ example: "Owner's object data" })
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  owner: string;

  @ApiProperty({
    example:
      'https://cdn.pixabay.com/photo/2019/11/09/20/57/german-shepherd-4614451_1280.jpg',
  })
  @Prop({ required: true })
  photoURL: string;

  @ApiProperty({ example: 'Sunny' })
  @Prop({
    required: true,
    minLength: 2,
    maxLength: 16,
    trim: true,
    match: /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/,
  })
  name: string;

  @ApiProperty({ example: 'Shepherd' })
  @Prop({
    required: true,
    minLength: 2,
    maxLength: 24,
    trim: true,
    match: /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/,
  })
  breed: string;

  @ApiProperty({ enum: ['male', 'female'], example: 'female' })
  @Prop({ required: true, enum: ['male', 'female'] })
  sex: 'male' | 'female';

  @ApiProperty({ example: '20.10.2020' })
  @Prop({ required: true })
  birthDate: string;

  @ApiProperty({ example: 'Kyiv, Ukraine' })
  @Prop({
    required: true,
    match:
      /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?:[-\s]?[a-zA-Zа-яА-ЯіІїЇґҐ]+),\s[a-zA-Zа-яА-ЯіІїЇ'’\s-]+$/,
  })
  location: string;

  @ApiProperty({ example: 'This is my comments' })
  @Prop({ required: true, minLength: 8, maxLength: 200 })
  comments: string;

  @ApiProperty({ example: 100 })
  @Prop({ default: null })
  price?: number;

  @ApiProperty({ example: 'Category object data' })
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Category', required: true })
  category: string;
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
