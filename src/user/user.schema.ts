import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail,IsNotEmpty,IsNumberString } from 'class-validator';
import { HydratedDocument,SchemaTypes,Types } from 'mongoose';
import { Group } from 'src/group/group.schema';
import * as mongoose from 'mongoose';


export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {


  id: Types.ObjectId;
    
  @Prop({ required: true })
  name: string;
  
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phone: number;

  @Prop({ required: false })
  xxy: number = 0;

  // @Prop({ type: SchemaTypes.ObjectId, ref: 'Group'})
  // group!: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Group' })
  groups: Group[];
}

export const UserSchema = SchemaFactory.createForClass(User);
