import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserSchema } from './user.schema';
import { UserDto } from './user.dto';
import { encodePassword } from 'src/utils/bcrypt';
import { Group } from 'src/group/group.schema';


  //delete this
// export type User2 = any;

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: UserDto ): Promise<User> {
    //check if email already exists in db 
    const user = await this.userModel.findOne({ email: createUserDto.email });
    // exist
    if (user) {
      console.log("error v userservice if(user)")
      throw new Error('Email already existst');
    }
    //does not exist
    const encryptedPassword = encodePassword(createUserDto.password);
    // console.log(encryptedPassword);
    createUserDto.password = encryptedPassword;
    const createdUser = new this.userModel(createUserDto);
    console.log("this is  created user from userservuice "+ JSON.stringify(createdUser));
    return createdUser.save();
  }

  async updatePassword({email, password}): Promise<User> {
    const user = await this.userModel.findOne({email: email});
    const encryptedPassword = encodePassword(password)
    user.password = encryptedPassword
    return user.save()
  }



  //delete this
  // async findOne(email: string): Promise<User2 | undefined> {
  //   return this.users.find(user => user.email === email);
  // }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }


  async findOne(email: any): Promise<User | undefined> {

    //find by id 
    // return this.userModel.findById(id);
    //find by email 
    return this.userModel.findOne({email : email});


  }


//   createUser(user: UserDto) {
//     const saveUser = new this.userModel(user);
//     return saveUser.save();
// }


  async assignToNewGroup(group: Group[]) {
  }
  

}