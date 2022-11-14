import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { GroupController } from './group.controller';
import { Group, GroupSchema } from './group.schema';
import { GroupService } from './group.service';



@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }],
   
    ),

],
  controllers: [GroupController],
  providers: [GroupService],
  exports:[GroupService]
})
export class GroupModule {}