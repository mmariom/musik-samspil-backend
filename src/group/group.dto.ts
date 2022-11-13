import { IsDate, IsEmail, IsNotEmpty, Length, Min } from "class-validator";
import { User } from "src/user/user.schema";


// const currentDate = new Date()

export class GroupDto {
  
    @IsNotEmpty()
    title: string;
    
    @IsNotEmpty()
    instrument: string;

    @IsNotEmpty()
    description: string;
  
    @IsNotEmpty()
    location: string;
  
    @IsNotEmpty()
    @Length(9, 15)
    contact: string;
    
    createdAt: Date ;

    user: User;

    userName: String;


  



    constructor(title: string, instrument: string, description: string, contact: string,
        createdAt: Date,
        user: User,
        userName: String

        ) {
        this.title = title;
        this.instrument = instrument;
        this.description = description;
        this.contact = contact;
        this.createdAt = createdAt;
        this.user = user;
        this.userName = userName;

    }
}