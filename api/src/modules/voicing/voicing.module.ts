import { Module } from '@nestjs/common';
import { VoicingService } from './voicing.service';
import { VoicingResolver } from './voicing.resolver';
import { PrismaModule } from '@/prisma/prisma.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { AiModule } from '@/ai/ai.module';

@Module({
  imports: [PrismaModule, AuthModule, AiModule],
  providers: [VoicingService, VoicingResolver],
  exports: [VoicingService],
})
export class VoicingModule {}
