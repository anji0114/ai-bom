import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVoicingInput } from './dto/create-voicing.input';

@Injectable()
export class VoicingService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, input: CreateVoicingInput) {
    return this.prisma.voicing.create({
      data: {
        userId,
        content: input.content,
        source: input.source,
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }
}
