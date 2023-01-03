import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';
import { TokenService } from './token.service';
import { Token,TokenSchema } from './token.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), MongooseModule.forFeature([{name: Token.name, schema: TokenSchema}]),

],
  controllers: [UserController],
  providers: [UserService, TokenService],
  exports:[UserService]
})
export class UserModule {}