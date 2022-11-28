import { Group, GroupDocument } from './group.schema';
import { Model } from 'mongoose';
import { GroupDto } from './group.dto';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
export declare class GroupService {
    private groupModel;
    private userService;
    constructor(groupModel: Model<GroupDocument>, userService: UserService);
    createGroup(createGroupDto: GroupDto): Promise<Group>;
    findAll(): Promise<Group[]>;
    finbyGroupId(groupId: any): Promise<Group>;
    findAllByUserId(userId: any): Promise<Group[]>;
    assignUserToGroup(loggedUser: User, groupId: any): Promise<any>;
}
