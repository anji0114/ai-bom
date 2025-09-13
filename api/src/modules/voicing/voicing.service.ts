import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { AiService } from '@/ai/ai.service';
import { CreateVoicingInput } from './dto/voicing.input';

@Injectable()
export class VoicingService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  async create(userId: string, input: CreateVoicingInput) {
    const product = await this.prisma.product.findUnique({
      where: { id: input.productId, userId },
    });

    if (!product) {
      throw new NotFoundException('指定されたプロダクトが見つかりません');
    }

    const analysisResult = await this.aiService.analyzeVoC(input.content);

    // VoCを保存（AI分析結果も含む）
    const voicing = await this.prisma.voicing.create({
      data: {
        productId: product.id,
        content: input.content,
        source: input.source,
        summary: analysisResult.summary,
        impactScore: analysisResult.impactScore,
      },
    });

    // タグを処理（既存タグを取得または新規作成）
    if (analysisResult.tags.length > 0) {
      const tagPromises = analysisResult.tags.map(async (tagName) => {
        // 既存タグを確認、なければ作成
        return this.prisma.tag.upsert({
          where: { userId_name: { userId, name: tagName } },
          update: {},
          create: { userId, name: tagName },
        });
      });

      const tags = await Promise.all(tagPromises);

      // VoicingTagリレーションを作成
      await Promise.all(
        tags.map((tag) =>
          this.prisma.voicingTag.create({
            data: {
              voicingId: voicing.id,
              tagId: tag.id,
            },
          }),
        ),
      );
    }

    // 最新データを取得して返す
    const result = await this.prisma.voicing.findUnique({
      where: { id: voicing.id },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!result) {
      throw new NotFoundException('指定されたVoCが見つかりません');
    }

    return {
      ...result,
      tags: result.tags.map((vt) => vt.tag),
    };
  }

  async getVoicings(productId: string, userId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId, userId },
    });

    if (!product) {
      throw new NotFoundException('指定されたプロダクトが見つかりません');
    }

    const voicings = await this.prisma.voicing.findMany({
      where: { productId: product.id },
      include: {
        tags: { include: { tag: true } },
      },
    });

    const total = await this.prisma.voicing.count({ where: { productId: '' } });

    return {
      data: voicings.map((voicing) => ({
        ...voicing,
        tags: voicing.tags.map((vt) => vt.tag),
      })),
      total,
    };
  }
}
