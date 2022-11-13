import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards,Request } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { GroupDto } from './group.dto';
import { GroupService } from './group.service';



@Controller('group')
export class GroupController {

    constructor(private readonly groupService: GroupService,
        ) {}


        @Get("/all")
        async getAllGroups(@Request() req) {
            return await this.groupService.findAll();
        }


    @Get(':id')
    async findGroupById(@Param('id') id: string) {
        try{
        return await this.groupService.finbyGroupId(id);
        }

        catch (error) { 
            // console.log("errro  in group controller  ");
            throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            message: [error.message],
            
          }, HttpStatus.FORBIDDEN, {
            cause: error
          });
          
          }

    }

    
  

}
  