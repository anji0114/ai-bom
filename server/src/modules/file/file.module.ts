import { Module } from '@nestjs/common';
import { FileResolver } from './file.resolver';
import { FileService } from './file.service';
import { S3Module } from '../s3/s3.module';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [S3Module, AuthModule, PrismaModule],
  providers: [FileResolver, FileService],
  exports: [FileResolver, FileService],
})
export class FileModule {}
