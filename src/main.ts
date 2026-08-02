import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
 const app = await NestFactory.create<NestExpressApplication>(AppModule);

 app.useStaticAssets(join(__dirname, '..', 'public'));

  app.useGlobalPipes(
   new ValidationPipe({
  whitelist: false,
  forbidNonWhitelisted: false,
  transform: true,
}),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
