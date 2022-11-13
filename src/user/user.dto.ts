import { IsEmail, IsNotEmpty, Length, Min } from "class-validator";
import { Group } from "src/group/group.schema";

export class UserDto {
  
    @IsNotEmpty()
    name: string;
    
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @Length(5)
    password: string;
  
    @IsNotEmpty()
    @Length(9, 15)
    phone: number;

    groups: Group[];

    constructor(name: string, password: string, email: string, phone: number,groups: Group[]) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.groups = groups;
    }
}