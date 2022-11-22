import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Group, GroupDocument } from './group.schema';
import { Model } from 'mongoose';
import { GroupDto } from './group.dto';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';



@Injectable()
export class GroupService {

    constructor(@InjectModel(Group.name) private groupModel: Model<GroupDocument>,
    private userService: UserService,
    ) {}

  
    
    async createGroup(createGroupDto: GroupDto ): Promise<Group> {
        //maybe check if group title already exists ?
        if(!(createGroupDto.createdBy)){
            throw new Error("You have to be logged in to assing the group");
        }
            // console.log(JSON.stringify(createGroupDto))
            //    const test  = await this.userService.findOne())

            // set group creation date
            createGroupDto.createdAt = new Date();

            const createdGroup =  new this.groupModel(createGroupDto)
            return createdGroup.save();
     
    }

    
    // Find all groups;
    async findAll(): Promise<Group[]> {
        return this.groupModel.find().exec();
    }

    //find by group id
    async finbyGroupId(groupId:any): Promise<Group> {
        const group =  await this.groupModel.findById(groupId);
       

        if(!group){
            console.log("errro in group service ");
            throw new Error("Group doesn't exist");
        }

        return group;
    }

    //Find all groups by usedId stored in cookies
    async findAllByUserId(userId:any): Promise<Group[]> {

        //check if have some groups 
        // console.log("Group service")
        // console.log(userId);
        const haveGroups = await this.groupModel.find({createdBy : userId});
        console.log(haveGroups);
        if( haveGroups.length < 1){
            throw new Error("You dont have any groups ! ");
        }

        // if(userId == null || userId == undefined || userId == "" || 2>1){
        //     // console.log("this is finbyuserid group service "+userId);
        //     throw new Error("You dont have any groups ! ");
        // }
        
        return await this.groupModel.find({createdBy : userId});
    }


    async assignUserToGroup(loggedUser:User , groupId:any , ): Promise<any> {

        // find group by id 
        const group =  await this.groupModel.findById(groupId)
        
        console.log("loggeduersssssssss")

        console.log(group.assignedUsers)

        let allUsers  = group.assignedUsers;

        // for (let index = 0; index < allUsers.length; index++) {

        //     const element = allUsers[index];
        //     console.log(element.id);
        //     if(this.groupModel.find({assignedUsers: {$elemMatch: {element.id}}})){
        //         throw new Error("User is already in the group!");
        //     }
            
            
        // }
    
        // if(this.groupModel.find({assignedUsers: {$elemMatch: {id:loggedUser.id}}})){
        //     throw new Error("User is already in the group!");
        // }
        
        
        //check if id already exist in  nested array [assignedUsers ]
        // group.assignedUsers.find

    

        //adding user to assignedUsers 
        return  await  group.updateOne( { $addToSet: { assignedUsers: loggedUser} })
   
  }



}