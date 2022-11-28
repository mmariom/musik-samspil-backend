import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { GroupDto } from "src/group/group.dto";
import { GroupService } from "src/group/group.service";
export declare class AuthController {
    private readonly authService;
    private userService;
    private jwtService;
    private groupService;
    constructor(authService: AuthService, userService: UserService, jwtService: JwtService, groupService: GroupService);
    login(req: any, response: Response): Promise<{
        statusCode: number;
        message: string;
        token: string;
    }>;
    getProfile(req: any): Promise<import("../user/user.schema").User>;
    createGroup(req: any, groupDto: GroupDto): Promise<import("../group/group.schema").Group>;
    findUserById(req: any): Promise<import("../group/group.schema").Group[] | "resopnse picee">;
    assignUserToGroup(req: any, groupId: string): Promise<any>;
}
