import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { User, UserSchema } from 'src/user/user.schema';


export type GroupDocument = HydratedDocument<Group>;

@Schema()
export class Group {

  @Prop({ required: true })
  title: string;
  
  @Prop({ required: true })
  instrument: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  contact: string;

  @Prop({ required: true })
  createdAt: Date; 

  @Prop({ required: true })
  userName: String; 

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true })
  createdBy: User;



  @Prop({ type: mongoose.Schema.Types.Array, ref: 'User'})
  assignedUsers: User[] ;




  

//   @Prop({type: mongoose.Schema.Types.ObjectId, ref: User.name})
// //   @Type(() => User)
//   user: User;
//     static title: string;



}

export const GroupSchema = SchemaFactory.createForClass(Group);
