import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type PetDocument = HydratedDocument<Pet>;

@Schema({ timestamps: true, versionKey: false })
export class Pet {
  @ApiProperty({ example: 'Bunny' })
  @Prop({
    required: true,
    minLength: 2,
    maxLength: 16,
    match: /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/,
  })
  name: string;

  @ApiProperty({ example: { name: 'John Smith', email: 'email@gmail.com' } })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: string;

  @ApiProperty({ example: '20.10.2020' })
  @Prop({ required: false, default: null })
  birthDate?: string;

  @ApiProperty({ example: 'Shepherd' })
  @Prop({ required: false, default: 'Unknown', minLength: 2, maxLength: 24 })
  breed?: string;

  @ApiProperty({ example: 'Good friend' })
  @Prop({ minLength: 8, maxLength: 200, default: null })
  comments?: string;

  @ApiProperty({
    example:
      'https://cdn.pixabay.com/photo/2019/11/09/20/57/german-shepherd-4614451_1280.jpg',
  })
  @Prop({ default: null })
  photoURL?: string;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
