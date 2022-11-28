import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './utils/jwt.strategy';
export declare class AuthService {
    private usersService;
    private jwtService;
    private jwtStrategy;
    constructor(usersService: UserService, jwtService: JwtService, jwtStrategy: JwtStrategy);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<any>;
}
