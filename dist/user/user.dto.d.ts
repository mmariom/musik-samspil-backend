import { Group } from "src/group/group.schema";
export declare class UserDto {
    name: string;
    email: string;
    password: string;
    phone: number;
    groups: Group[];
    constructor(name: string, password: string, email: string, phone: number, groups: Group[]);
}
