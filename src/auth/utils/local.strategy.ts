import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { response } from 'express';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    // console.log("inside localstrategy")
    // console.log(email, password)
    const user = await this.authService.validateUser(email, password);
    if (!user) {

      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Email or password is not valid !',
      }, HttpStatus.FORBIDDEN);
    }
   
      return user;
 
    
  }
  
}

