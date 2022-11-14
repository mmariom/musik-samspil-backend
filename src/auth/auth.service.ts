import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/utils/bcrypt';
import { JwtStrategy } from './utils/jwt.strategy';
import { jwtConstants } from './utils/constants';
import { User } from 'src/user/user.schema';
import { Group } from 'src/group/group.schema';


@Injectable()
export class AuthService {
  constructor(private usersService: UserService,
    private jwtService: JwtService,
    private jwtStrategy : JwtStrategy) {}

  async validateUser(email: string, pass: string): Promise<any> {

    const user = await this.usersService.findOne(email);
    const matched =   comparePassword(pass, user.password);

    if (user && matched ) {
      
      const { password, ...result } = user;
      // console.log(user._id + "valudateuser auth/service")
      //  this.jwtService.signAsync(user);

      return result;
    }

    return null;
      
  }


  async login(user: any):Promise<any> {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }




}