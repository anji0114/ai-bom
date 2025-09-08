import { Injectable } from '@nestjs/common';
import { ChatAnthropic } from '@langchain/anthropic';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { z } from 'zod';
import { VOC_ANALYSIS_PROMPT } from './prompts/voc-analysis.prompt';

const VoCAnalysisSchema = z.object({
  summary: z.string().describe('VoCの要約（50文字以内）'),
  sentiment: z
    .enum(['POSITIVE', 'NEUTRAL', 'NEGATIVE'])
    .describe('感情分析結果'),
  impactScore: z.number().min(1).max(10).describe('インパクトスコア（1-10）'),
  tags: z.array(z.string()).describe('分類タグ（最大5個）'),
});

export type VoCAnalysis = z.infer<typeof VoCAnalysisSchema>;

@Injectable()
export class AiService {
  private llm: ChatAnthropic;

  constructor() {
    this.llm = new ChatAnthropic({
      modelName: 'claude-sonnet-4-20250514',
      temperature: 0.3,
    });
  }

  async analyzeVoC(content: string): Promise<VoCAnalysis> {
    const prompt = ChatPromptTemplate.fromTemplate(VOC_ANALYSIS_PROMPT);

    try {
      const chain = prompt.pipe(this.llm);
      const result = await chain.invoke({ content });

      // AI応答から JSON部分を抽出・整形
      const cleanedResult = this.extractAndCleanJson(result.content as string);
      const parsedResult: unknown = JSON.parse(cleanedResult);
      const validatedResult = VoCAnalysisSchema.parse(parsedResult);

      return validatedResult;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`AI分析に失敗しました: ${errorMessage}`);
    }
  }

  private extractAndCleanJson(content: string): string {
    // JSONブロック（```json ... ```）から抽出を試行
    const jsonBlockMatch = content.match(
      /```(?:json)?\s*(\{[\s\S]*?\})\s*```/i,
    );
    if (jsonBlockMatch) {
      return jsonBlockMatch[1].trim();
    }

    // 波括弧で囲まれた部分を抽出
    const braceMatch = content.match(/\{[\s\S]*\}/);
    if (braceMatch) {
      return braceMatch[0].trim();
    }

    // そのまま返す（JSONが直接返されている場合）
    return content.trim();
  }
}
