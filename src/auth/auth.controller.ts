import { Controller, Get, Post, UseGuards,Request,HttpException, HttpStatus, Res , Req, Session, Body} from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./utils/jwt-auth.guard";
import { LocalAuthGuard } from "./utils/local-auth.guard";
import { JwtService } from '@nestjs/jwt';
import {Response} from 'express'
import { GroupDto } from "src/group/group.dto";
import { GroupService } from "src/group/group.service";



@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
    private jwtService: JwtService,
    private groupService: GroupService
  ) {}


  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({passthrough:true}) response:Response,) {

      const user = await this.userService.findOne(req.user._doc.email)
      // console.log("this is user id" + {user})
      const jwt =   this.jwtService.sign({user : user})
      // response.cookie('USERID', user._id)
      // req.cookies['cookieKey']
      return {
        
       statusCode:201,
       message:"Logged in successfully!",
        token:  jwt
      };


  }


  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {

   return this.userService.findOne(req.user.email)
  }


  @UseGuards(JwtAuthGuard)
  @Post('group/create')
  async createGroup(@Request() req, @Body() groupDto : GroupDto ) {

    try{

      
      groupDto.user = req.user.id
      groupDto.userName = req.user.name
      // console.log(req.user.name + "THIS IS AUTH CONTROLLER !!!!!")
      return await this.groupService.createGroup(groupDto);
  }
  catch (error) { 
      console.log("controller catch block ")
      throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      message: [error.message],
      
    }, HttpStatus.FORBIDDEN, {
      cause: error
    });
    
    }


  }

  @UseGuards(JwtAuthGuard)
  @Get('group/findusergroups')
  async findUserById(@Request() req) {
      try{
      // const userId= req.cookies['USERID']
      // console.log("volam findAllByUserId metodu v group controlery / userid =  " + userId)
      return await this.groupService.findAllByUserId(req.user.id);
      }

      catch (error) { 
          console.log("controller catch block ")
          throw new HttpException({
          status: HttpStatus.FORBIDDEN,
          message: [error.message],
          
        }, HttpStatus.FORBIDDEN, {
          cause: error
        });
        
        }

  }
  


  

}
