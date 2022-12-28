import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument,Types } from 'mongoose';

export type TokenDocument = HydratedDocument<Token>;

@Schema()
export class Token {
    
  @Prop({ required: true })
  token: string;
  
  @Prop({ required: true })
  userEmail: string;

  @Prop({required: true,     type: mongoose.Schema.Types.Date})
  createdAt: {
    expires: 3600
  }
}

export const TokenSchema = SchemaFactory.createForClass(Token);
