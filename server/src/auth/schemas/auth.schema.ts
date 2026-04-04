import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  paraphrase?: string;

  @Prop()
  username!: string;
 
  @Prop()
  password!: string;
}

export const userSchema = SchemaFactory.createForClass(User);