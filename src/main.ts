import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // app.use(session({
  //   secret: 'LOL',
  //   resave: false,
  //   saveUninitialized: false,
  //   // cookie: {
  //   //   maxAge:  30000,
  //   // }
  // }))
  app.enableCors();
  app.use(cookieParser());
  // app.use(passport.initialize())
  // app.use(passport.session())

  await app.listen(3030);
}
bootstrap();
