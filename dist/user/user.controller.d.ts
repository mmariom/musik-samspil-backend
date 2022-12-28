import { UserDto } from './user.dto';
import { UserService } from './user.service';
import { TokenService } from './token.service';
export declare class UserController {
    private readonly userService;
    private readonly tokenService;
    constructor(userService: UserService, tokenService: TokenService);
    findAll(): string;
    registerNewUser(userDto: UserDto): Promise<import("./user.schema").User>;
    findUserById(id: any): Promise<import("./user.schema").User>;
    generateResetEmail(email: any): Promise<void>;
    resetPassword(email: string, tokenString: string, userPassword: any): Promise<void>;
}
