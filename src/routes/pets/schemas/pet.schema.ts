import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PetDocument = HydratedDocument<Pet>;

@Schema({ timestamps: true, versionKey: false })
export class Pet {
  @Prop({
    required: true,
    minLength: 2,
    maxLength: 16,
    match: /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/,
  })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: string;

  @Prop({ required: true })
  birthDate: string;

  @Prop({ required: true, minLength: 2, maxLength: 24 })
  breed: string;

  @Prop({ minLength: 8, maxLength: 200, default: null })
  comments?: string;

  @Prop({ default: null })
  photoURL?: string;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
