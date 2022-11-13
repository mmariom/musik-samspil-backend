import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards,Request } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';


@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService,
            
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
    


}
  