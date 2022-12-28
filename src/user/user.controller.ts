import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards,Request } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';
import { TokenService } from './token.service';
import {randomBytes} from 'crypto'
import { sendResetEmail } from '../utils/sendEmail'


@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService, private readonly tokenService: TokenService
            
      ) {}


  @Get("testuser")
  findAll(): string {
    return 'This action returns all cats';
  }

  @Post('register')
  async registerNewUser(@Body() userDto : UserDto) {
    try{
 
      return await this.userService.createUser(userDto);
    }
    catch (error) { 
      console.log("controller catch block ")
      throw new HttpException({
      status: HttpStatus.CONFLICT,
      message: [error.message],
      
    }, HttpStatus.FORBIDDEN, {
      cause: error
    });
    
    }}


    @Get('/find/:id')
    findUserById(@Param('id') id: any) {
      // console.log(id)
      return this.userService.findOne(id)
    }

    @Post('/generateResetEmail/:email')
    async generateResetEmail(@Param('email') email: any) {

          const user = await this.userService.findOne(email);
          if (!user)
              throw new HttpException('No user with this email', HttpStatus.BAD_REQUEST)
          let token = await this.tokenService.findOne({ email: email });
          if (!token) {
              token = await this.tokenService.createToken({
                  userEmail: email,
                  tokenString: randomBytes(32).toString("hex"),
              })
          }
          await sendResetEmail({email, token});
    }

    @Post('reset/:email/:token')
    async resetPassword(@Param('email') email: string, @Param('token') tokenString: string, @Body() userPassword : any) {
      try { 
        console.log(email, tokenString)
        const token = await this.tokenService.findOne({
          email: email,
          token: tokenString,
      });
        if (!token) throw new HttpException("Invalid link or expired", HttpStatus.BAD_REQUEST);
        await this.userService.updatePassword({email: email, password: userPassword.password})
        await this.tokenService.deleteToken(tokenString)
      }
      catch (e) {
        console.log(e)
        throw e;
      }
    }
    


}
  