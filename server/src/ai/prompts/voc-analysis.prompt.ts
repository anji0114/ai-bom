export const VOC_ANALYSIS_PROMPT = `
あなたは製品フィードバック分析の専門家です。以下の顧客の声（VoC）を分析してください。

VoC内容:
{content}

分析の観点:
- summary: VoCの主要な内容を簡潔に要約
- sentiment: 全体的な感情的トーンを判定
- impactScore: ビジネスへの影響度を1-10で評価（10が最も重要）
- tags: 機能、UI/UX、パフォーマンス、要望、不具合等の適切なカテゴリ

以下の形式で分析結果をJSONで返してください:
{{
  "summary": "VoCの要約（50文字以内）",
  "sentiment": "POSITIVE | NEUTRAL | NEGATIVE",
  "impactScore": 1-10の数値,
  "tags": ["タグ1", "タグ2", ...] (最大5個)
}}
`;
