# **PDM AI Agent - Phase2: インサイト発見機能**

**前提:** Phase1でVoC追加・AI分析（タグ、感情、要約）機能が完成済み

## **1. Phase2の目的とゴール**

**目的:** VoCを単に整理するだけでなく、**隠れたパターンや重要な課題を自動発見**し、PDMの戦略的意思決定を支援する

**ゴール:**

- 複数VoCから共通課題・トレンドを自動抽出
- 緊急度の高い問題の自動検出とアラート
- データドリブンな意思決定を可能にする洞察の提供

## **2. 新機能仕様**

### **2.1. インサイト自動分析エンジン**

**トリガー:**

- VoC追加時（リアルタイム分析）
- 定期実行（日次・週次バッチ処理）
- ユーザーが手動で「インサイト更新」ボタンを押した時

**分析内容:**

1. **共通課題の抽出**
   - 類似するVoCをクラスタリング
   - 頻出する問題パターンを特定
   - 課題の重要度スコア算出

2. **トレンド分析**
   - 時系列での感情変化
   - 特定タグの増加/減少傾向
   - 新興課題の早期発見

3. **緊急度判定**
   - 高インパクト × 高頻度の課題を特定
   - ネガティブ感情の急激な増加を検知
   - クリティカルなキーワード（「バグ」「障害」「使えない」等）の検出

### **2.2. インサイトダッシュボード**

**URL:** `/dashboard/insights` (新ページ)

**画面構成:**

1. **アラートセクション**
   - 緊急対応が必要な課題をカード形式で表示
   - 「要注意」「警告」「緊急」の3レベル

2. **トレンドセクション**
   - 感情スコアの時系列チャート
   - タグ別件数の推移グラフ
   - 新しく発見されたトレンド一覧

3. **課題クラスターセクション**
   - AIが発見した課題グループをカード形式で表示
   - 各クラスターの概要、影響VoC件数、推奨アクション

### **2.3. データベーススキーマ拡張**

```prisma
// 新規追加
model Insight {
  id          String        @id @default(cuid())
  userId      String
  type        InsightType   // CLUSTER, TREND, ALERT
  title       String
  description String
  severity    Severity      // LOW, MEDIUM, HIGH, CRITICAL
  score       Float         // 重要度スコア
  metadata    Json          // 分析結果の詳細データ
  isRead      Boolean       @default(false)
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt

  user        User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  voicings    InsightVoicing[]

  @@index([userId, createdAt])
}

model InsightVoicing {
  insightId   String
  voicingId   String
  relevance   Float         // このVoCがインサイトにどの程度関連するか (0-1)
  createdAt   DateTime      @default(now())

  insight     Insight       @relation(fields: [insightId], references: [id], onDelete: Cascade)
  voicing     Voicing       @relation(fields: [voicingId], references: [id], onDelete: Cascade)

  @@id([insightId, voicingId])
}

enum InsightType {
  CLUSTER    // 共通課題クラスター
  TREND      // トレンド変化
  ALERT      // 緊急アラート
}

enum Severity {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}

// 既存モデルに追加
model Voicing {
  // ... 既存フィールド
  insights    InsightVoicing[]
}

model User {
  // ... 既存フィールド
  insights    Insight[]
}
```

### **2.4. AI分析ロジック**

**使用技術:**

- LangChain.js + GPT-4 for 高度な分析
- ベクトル類似度計算 (OpenAI Embeddings)
- 統計分析ライブラリ

**分析フロー:**

1. **VoCテキストのベクトル化**
2. **クラスタリング分析** (K-means, DBSCAN)
3. **時系列分析** (移動平均, 異常検知)
4. **重要度スコアリング** (頻度 × インパクト × 緊急度)

## **3. 実装優先順位**

### **Phase 2.1 (Week 1-2):**

- データベーススキーマ拡張
- 基本的なクラスタリング分析機能
- インサイトダッシュボードのUI実装

### **Phase 2.2 (Week 3-4):**

- トレンド分析機能
- アラート機能
- リアルタイム分析の実装

### **Phase 2.3 (Week 5-6):**

- 分析精度の向上
- パフォーマンス最適化
- ユーザーテスト・フィードバック反映

## **4. 期待される価値**

1. **意思決定の高速化**
   - 重要課題を見逃さない
   - データに基づく優先順位付け

2. **プロダクト改善の方向性明確化**
   - ユーザーの真のニーズを発見
   - 改善インパクトの予測

3. **リスク管理の強化**
   - 問題の早期発見
   - 炎上前の予防的対応

## **5. 成功指標 (KPI)**

- インサイト発見数 (週次)
- アラート対応率
- ユーザーのダッシュボード利用時間
- 発見された課題の実際の重要度 (ユーザー評価)
