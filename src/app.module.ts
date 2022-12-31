import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv' 
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GroupModule } from './group/group.module';


@Module({
  // imports: [MongooseModule.forRoot('mongodb://rootuser:rootpass@localhost:27017/musik_samspil?authSource=admin'),
  imports: [MongooseModule.forRoot('mongodb://3.75.34.96:27017/musik_samspil'),

  UserModule,
  GroupModule,
  AuthModule  
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
