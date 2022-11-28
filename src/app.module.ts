import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv' 
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GroupModule } from './group/group.module';
import { config } from 'dotenv';

config()
console.log(process.env.password)

@Module({
  imports: [MongooseModule.forRoot(`mongodb+srv://ion123:Ciocaion221998@cluster0.ks6sfje.mongodb.net/Samspil-backend`),
  UserModule,
  GroupModule,
  AuthModule  
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

