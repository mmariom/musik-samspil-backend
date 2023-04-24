import { Controller, Get, Post, UseGuards,Request,HttpException, HttpStatus, Res , Req, Session, Body, Param} from "@nestjs/common";
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
      // console.log("toto je user id " + {user})
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

      
      groupDto.createdBy = req.user.id
      groupDto.userName = req.user.name
      // console.log(req.user.id + "TOTO JE AUTH CONTROLLER !!!!!")
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
  @Get('user/groups')
  async findUserById(@Request() req) {
      try{
      // const userId= req.cookies['USERID']
      // console.log("volam findAllByUserId metodu v group controlery / userid =  " + userId)
      console.log(req.user.id)
      return await this.groupService.findAllByUserId(req.user.id);
      // return await this.groupService.findAllByUserId(req.user.name);

    
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
  @Get('assignUserToGroup/:groupid')
  async assignUserToGroup(@Request() req,@Param('groupid') groupId: string) {
    
      // Get current user id 
      const loggedUser = req.user;
      return await this.groupService.assignUserToGroup(loggedUser,groupId)
      // return await this.groupService.findAllByUserId(req.user.id);


  }


  // @UseGuards(JwtAuthGuard)
  // @Get('/findUsersJoinedGroups')
  // async findUsersJoinedGroups(@Request() req,@Param('groupid') groupId: string) {
    
  //     // Get current user id 
  //     const loggedUser = req.user;
  //     return await this.groupService.findUsersJoinedGroups(loggedUser.id)
   


  // }

    @UseGuards(JwtAuthGuard)
  @Get('user/userJoinedGroups')
  async findUsersJoinedGroups(@Request() req) {
      try{
   
     
      return await this.groupService.findUsersJoinedGroups(req.user.id);
    
      }

      catch (error) { 
     
          throw new HttpException({
          status: HttpStatus.FORBIDDEN,
          message: [error.message],
        }, HttpStatus.FORBIDDEN, {
          cause: error
        });
        
        }

  }

  
  

  


  

}
