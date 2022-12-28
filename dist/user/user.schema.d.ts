import { HydratedDocument, Types } from 'mongoose';
import { Group } from 'src/group/group.schema';
import * as mongoose from 'mongoose';
export declare type UserDocument = HydratedDocument<User>;
export declare class User {
    id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    phone: number;
    xxy: number;
    groups: Group[];
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, "type", User>;
