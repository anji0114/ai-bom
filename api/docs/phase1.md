# 📘 アプリ概要ドキュメント（POC版）

## 1. アプリ概要

本アプリは **顧客の声（Voice of Customer, VOC）を収集・分析** することを目的とした POC アプリケーションです。

- ユーザーはアカウント作成やログイン不要（Basic 認証のみ）
- 顧客の声（フィードバック）をアプリに登録
- 登録時に軽量な AI 処理で **自動カテゴリ分類（タグ付け）**
- ユーザーは複数のフィードバックを選択して **AI による詳細分析** を実行
- 分析結果は **要約、感情、カテゴリ、インサイト、影響度、優先度** といった情報を含む

POC フェーズの狙いは、
「顧客の声を元に AI がどのような整理・洞察を提供できるか」を確認することです。

---

## 2. データベース設計

### エンティティ一覧

- **CustomerFeedback**
  顧客の声を1件ずつ保存するテーブル。登録時に軽いAI処理で自動カテゴリを付与。

- **AiAnalysis**
  ユーザーが複数のフィードバックを選択して AI による詳細分析を行った結果を保存するテーブル。

- **FeedbackAnalysis（中間テーブル）**
  どのフィードバックがどの分析に利用されたかを管理。

---

### Prisma モデル定義

```prisma
model CustomerFeedback {
  id                 Int          @id @default(autoincrement())
  source             String?
  customerIdentifier String?
  content            String
  autoCategories     Json?        // 登録時の即時AIタグ付け
  createdAt          DateTime     @default(now())

  analyses           FeedbackAnalysis[] // N:M
  @@map("customer_feedback")
}

model AiAnalysis {
  id         Int      @id @default(autoincrement())
  summary    String?
  sentiment  Sentiment?
  categories Json?     // ex: ["ui", "save_page"]
  insights   String?   // ex: "保存操作でユーザーが混乱している"
  impact     String?   // ex: "UX低下、売上影響は小"
  priority   Int?      // 1=High, 2=Medium, 3=Low
  createdAt  DateTime  @default(now())

  feedbacks  FeedbackAnalysis[]
  @@map("ai_analysis")
}

model FeedbackAnalysis {
  feedbackId Int
  analysisId Int

  feedback   CustomerFeedback @relation(fields: [feedbackId], references: [id])
  analysis   AiAnalysis       @relation(fields: [analysisId], references: [id])

  @@id([feedbackId, analysisId])
  @@map("feedback_analysis")
}

enum Sentiment {
  positive
  neutral
  negative
}
```

---

## 3. データフロー

1. **フィードバック登録**
   - `CustomerFeedback` に保存
   - `autoCategories` に軽量AIでタグ付け

2. **ユーザー操作（複数選択 → 分析実行）**
   - 選択されたフィードバック群を元に AI で分析
   - 結果を `AiAnalysis` に保存
   - `FeedbackAnalysis` に対象フィードバックとの関連を保存

---

## 4. 今後の拡張想定

- `pdm_item`（製品改善アイデア）テーブルを追加し、AiAnalysis から改善タスクへ連携
- ユーザー管理やプロジェクト管理の追加（Basic 認証から拡張）
- 定期的なバッチ分析や自動クラスタリング
