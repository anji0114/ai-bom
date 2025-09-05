import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // HTTP-only cookieのミドルウェア設定
  app.use(cookieParser());

  // CORS設定（必要に応じて）
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true, // cookieを含むリクエストを許可
  });

  await app.listen(process.env.PORT ?? 3300);
}
bootstrap();
