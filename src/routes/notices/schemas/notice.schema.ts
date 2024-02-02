import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NoticeDocument = HydratedDocument<Notice>;

@Schema()
export class Notice {
  @Prop()
  name: string;

  @Prop()
  age: number;
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
