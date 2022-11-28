import { User } from "src/user/user.schema";
export declare class GroupDto {
    title: string;
    instrument: string;
    description: string;
    location: string;
    contact: string;
    createdAt: Date;
    createdBy: User;
    userName: String;
    constructor(title: string, instrument: string, description: string, contact: string, createdAt: Date, createdBy: User, userName: String);
}
