// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { MongooseModule } from '@nestjs/mongoose';
// import * as dotenv from 'dotenv' 
// import { UserModule } from './user/user.module';
// import { AuthModule } from './auth/auth.module';
// import { GroupModule } from './group/group.module';
// import { config } from 'dotenv';

// config()
// console.log(process.env.password)

// @Module({
//   imports: [MongooseModule.forRoot('mongodb://rootuser:rootpass@localhost:27017/musik_samspil?authSource=admin'),
//   // imports: [MongooseModule.forRoot('mongodb://3.75.34.96:27017/musik_samspil'),

//   UserModule,
//   GroupModule,
//   AuthModule  
// ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}




import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GroupModule } from './group/group.module';

const databaseUrl = process.env.DATABASE_URL;

@Module({
  imports: [
    MongooseModule.forRoot(databaseUrl),
    UserModule,
    GroupModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

