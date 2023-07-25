import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Roles } from 'src/core/types';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ nullable: true })
  avatar_url: string;

  @Prop({
    enum: Roles,
    default: Roles.USER,
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
