import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type CategoryDocument = HydratedDocument<Category>;

class Title {
  @ApiProperty({ example: 'Загублені/Знайдені' })
  @Prop({ required: true, minLength: 4, maxLength: 30 })
  uk: string;

  @ApiProperty({ example: 'Lost/Found' })
  @Prop({ required: true, minLength: 4, maxLength: 30 })
  en: string;
}

@Schema({ timestamps: true, versionKey: false })
export class Category {
  @ApiProperty({ example: { uk: 'Загублені/Знайдені', en: 'Lost/Found' } })
  @Prop({ required: true, type: Title })
  title: Title;

  @ApiProperty({ example: 'lost-found' })
  @Prop({ required: true, type: String })
  slug: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
