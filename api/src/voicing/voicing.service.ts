import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
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

  async findOne(id: string, userId: string) {
    const voicing = await this.prisma.voicing.findUnique({
      where: { id },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!voicing) {
      throw new NotFoundException('指定されたVoCが見つかりません');
    }

    if (voicing.userId !== userId) {
      throw new ForbiddenException('他のユーザーのVoCにはアクセスできません');
    }

    return voicing;
  }

  async findMany(userId: string) {
    return this.prisma.voicing.findMany({
      where: { userId },
      include: {
        tags: { include: { tag: true } },
      },
    });
  }
}
