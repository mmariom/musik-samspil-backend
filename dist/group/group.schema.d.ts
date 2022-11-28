import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/user.schema';
export declare type GroupDocument = HydratedDocument<Group>;
export declare class Group {
    title: string;
    instrument: string;
    description: string;
    location: string;
    contact: string;
    createdAt: Date;
    userName: String;
    createdBy: User;
    assignedUsers: User[];
}
export declare const GroupSchema: mongoose.Schema<Group, mongoose.Model<Group, any, any, any, any>, {}, {}, {}, {}, "type", Group>;
