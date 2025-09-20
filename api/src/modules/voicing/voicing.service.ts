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

    // VoCを先に保存（AI分析なし）
    const voicing = await this.prisma.voicing.create({
      data: {
        productId: product.id,
        content: input.content,
        source: input.source,
      },
    });

    // AI分析を非同期で実行
    this.processAiAnalysis(userId, voicing.id, input.content).catch((error) => {
      console.error('AI分析処理でエラーが発生しました:', error);
    });

    return voicing;
  }

  private async processAiAnalysis(
    userId: string,
    voicingId: string,
    content: string,
  ) {
    try {
      const analysisResult = await this.aiService.analyzeVoC(content);

      // VoCにAI分析結果を更新
      await this.prisma.voicing.update({
        where: { id: voicingId },
        data: {
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
                voicingId: voicingId,
                tagId: tag.id,
              },
            }),
          ),
        );
      }
    } catch (error) {
      console.error(`VoC ID ${voicingId} のAI分析処理に失敗しました:`, error);
    }
  }

  async getVoicings(userId: string, productId: string) {
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

    const total = await this.prisma.voicing.count({ where: { productId } });

    return {
      data: voicings.map((voicing) => ({
        ...voicing,
        tags: voicing.tags.map((vt) => vt.tag),
      })),
      total,
    };
  }
}
