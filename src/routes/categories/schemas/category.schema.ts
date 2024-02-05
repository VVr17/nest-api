import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CategoryDocument = HydratedDocument<Category>;

class Title {
  @Prop({ required: true, minLength: 4, maxLength: 30 })
  uk: string;

  @Prop({ required: true, minLength: 4, maxLength: 30 })
  en: string;
}

@Schema({ timestamps: true, versionKey: false })
export class Category {
  @Prop({ required: true, type: Title })
  title: Title;

  @Prop({ required: true, type: String })
  slug: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
