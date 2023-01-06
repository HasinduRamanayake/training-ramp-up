import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AuthenticationModule } from './authentication.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthenticationModule);

  app.use(cookieParser());
  app.enableCors({
    origin:"http://localhost:3000",
    methods:"*",
    credentials:true
  })

  await app.listen(5200);
}
bootstrap();
