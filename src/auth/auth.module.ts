import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';


import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './utils/constants';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './utils/local.strategy';
import { UserService } from 'src/user/user.service';
import { JwtStrategy } from './utils/jwt.strategy';
import { GroupModule } from 'src/group/group.module';



@Module({
  imports: [
    UserModule,
    GroupModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}