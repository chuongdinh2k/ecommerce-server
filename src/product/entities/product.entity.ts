import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ColorEnum, SizeEnum } from '../interfaces';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  slug: string;

  @Prop()
  price: number;

  @Prop()
  number_available: number;

  @Prop()
  thumbnail_url: string;

  @Prop()
  main_url: string;

  @Prop({ type: Array, enum: ColorEnum })
  color: string[];

  @Prop({ type: Array, enum: SizeEnum })
  size: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
