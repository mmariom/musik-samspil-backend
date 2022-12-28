import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UserDto } from './user.dto';
import { Group } from 'src/group/group.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    createUser(createUserDto: UserDto): Promise<User>;
    updatePassword({ email, password }: {
        email: any;
        password: any;
    }): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(email: any): Promise<User | undefined>;
    assignToNewGroup(group: Group[]): Promise<void>;
}
