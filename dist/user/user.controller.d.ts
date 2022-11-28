import { UserDto } from './user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): string;
    registerNewUser(userDto: UserDto): Promise<import("./user.schema").User>;
    findUserById(id: any): Promise<import("./user.schema").User>;
}
