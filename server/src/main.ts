import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // HTTP-only cookieのミドルウェア設定
  app.use(cookieParser());

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));

  // CORS設定（必要に応じて）
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true, // cookieを含むリクエストを許可
  });

  await app.listen(process.env.PORT ?? 3300);
}
bootstrap();
