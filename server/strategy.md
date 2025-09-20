# Voicing機能実装戦略

## 1. 機能概要

PDM AI Agentにおける顧客の声（VoC: Voice of Customer）管理機能の実装戦略。
ユーザーがVoCを登録すると、AIが自動で以下の分析を実行：
- 要約生成
- 感情分析（POSITIVE/NEUTRAL/NEGATIVE）
- インパクト評価（数値スコア）
- 自動タグ付与

## 2. アーキテクチャ設計

### 2.1 レイヤー構成
```
├── GraphQL Schema & Resolvers    # API層
├── Services                      # ビジネスロジック層
├── AI Analysis Service          # AI連携層（langchain.js）
└── Repository/Prisma            # データアクセス層
```

### 2.2 主要コンポーネント

**GraphQL API**
- VoicingResolver: CRUD操作のエンドポイント
- VoicingInput/Output DTOs: リクエスト/レスポンス型定義

**Services**
- VoicingService: VoCの管理ロジック
- AIAnalysisService: AI分析の実行と結果処理
- TagService: タグ管理ロジック

**AI連携**
- langchain.jsを使用した外部LLM API連携
- 分析結果の構造化とバリデーション

## 3. GraphQL API設計

### 3.1 スキーマ定義

```graphql
type Voicing {
  id: ID!
  content: String!
  source: String!
  summary: String
  sentiment: Sentiment
  impactScore: Int
  tags: [Tag!]!
  createdAt: DateTime!
  updatedAt: DateTime!
}

enum Sentiment {
  POSITIVE
  NEUTRAL
  NEGATIVE
}

input CreateVoicingInput {
  content: String!
  source: String!
}

input VoicingFilterInput {
  tags: [String!]
  sentiment: Sentiment
  keyword: String
}

type Query {
  voicings(filter: VoicingFilterInput, skip: Int, take: Int): [Voicing!]!
  voicing(id: ID!): Voicing
  voicingsSummary: VoicingSummary!
}

type Mutation {
  createVoicing(input: CreateVoicingInput!): Voicing!
  deleteVoicing(id: ID!): Boolean!
}

type VoicingSummary {
  totalCount: Int!
  sentimentDistribution: SentimentDistribution!
  topTags: [TagCount!]!
}
```

### 3.2 主要エンドポイント

**Queries**
- `voicings`: VoC一覧取得（フィルタリング・ページネーション対応）
- `voicing`: VoC詳細取得
- `voicingsSummary`: ダッシュボード用統計情報取得

**Mutations**
- `createVoicing`: VoC新規作成（AI分析を自動実行）
- `deleteVoicing`: VoC削除

## 4. AI分析機能設計

### 4.1 分析フロー
```
VoC入力 → AI分析要求 → LLM API呼び出し → 結果パース → DB保存
```

### 4.2 AI分析サービス実装

```typescript
@Injectable()
export class AIAnalysisService {
  async analyzeVoicing(content: string): Promise<AnalysisResult> {
    // langchain.jsを使用してLLM APIに分析を依頼
    // 1. 要約生成
    // 2. 感情分析
    // 3. インパクトスコア算出
    // 4. 関連タグ抽出
  }
}

interface AnalysisResult {
  summary: string;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
  impactScore: number; // 1-10スケール
  suggestedTags: string[];
}
```

### 4.3 プロンプト設計

**統合分析プロンプト例:**
```
以下の顧客の声を分析し、JSON形式で結果を返してください：

"{content}"

以下の形式で回答：
{
  "summary": "要約（100文字以内）",
  "sentiment": "POSITIVE|NEUTRAL|NEGATIVE",
  "impactScore": 1-10の数値,
  "suggestedTags": ["タグ1", "タグ2", ...]
}
```

## 5. 実装順序

### Phase 1: 基本CRUD機能

#### Step 1.1: 型定義とDTO作成
1. `src/voicing/dto/create-voicing.input.ts` - 作成用入力型
2. `src/voicing/dto/voicing-filter.input.ts` - フィルター用入力型  
3. `src/voicing/entities/voicing.entity.ts` - GraphQL Entity
4. `src/voicing/dto/voicing.output.ts` - 出力型・統計型

#### Step 1.2: Voicing Module & Service基盤
1. `src/voicing/voicing.module.ts` - モジュール定義
2. `src/voicing/voicing.service.ts` - サービス基盤クラス作成（空実装）
3. PrismaServiceの依存注入設定

#### Step 1.3: Create機能（AI分析なし）
1. `createVoicing` mutation - GraphQL Resolver
2. VoicingService.create() - DB保存ロジック
3. 基本バリデーション（content, source必須チェック）
4. ユーザー認証チェック

#### Step 1.4: Get機能（単体取得）
1. `voicing` query - GraphQL Resolver（ID指定）
2. VoicingService.findOne() - 単体取得ロジック
3. ユーザー認可チェック（自分のVoCのみ取得可能）

#### Step 1.5: List機能（一覧取得）
1. `voicings` query - GraphQL Resolver（一覧取得）
2. VoicingService.findMany() - 一覧取得ロジック
3. 基本的なページネーション（skip, take）
4. ユーザーでの絞り込み

#### Step 1.6: Delete機能
1. `deleteVoicing` mutation - GraphQL Resolver
2. VoicingService.delete() - 削除ロジック
3. 削除権限チェック（自分のVoCのみ削除可能）
4. 関連するVoicingTagの削除（CASCADE）

### Phase 2: AI分析機能

#### Step 2.1: AI分析サービス基盤
1. `src/ai/ai.module.ts` - AIモジュール作成
2. `src/ai/ai-analysis.service.ts` - AIサービス基盤
3. langchain.js依存関係セットアップ
4. 環境変数設定（LLM APIキー等）

#### Step 2.2: AI分析ロジック実装
1. AIAnalysisService.analyzeVoicing() - 分析メソッド
2. プロンプト設計と実装
3. LLM APIレスポンスのパース処理
4. 分析結果のバリデーション

#### Step 2.3: Create機能にAI分析統合
1. VoicingService.create()修正 - AI分析呼び出し
2. 分析結果の保存（summary, sentiment, impactScore）
3. エラーハンドリング（AI分析失敗時の処理）

#### Step 2.4: タグ機能統合
1. `src/tag/tag.module.ts` - タグモジュール
2. `src/tag/tag.service.ts` - タグCRUD機能
3. AI分析結果からのタグ自動生成
4. VoicingTagリレーション保存

### Phase 3: 高度な機能

#### Step 3.1: フィルタリング機能
1. VoicingFilterInput DTOの詳細実装
2. タグフィルタリング（配列指定）
3. 感情フィルタリング（enum指定）
4. キーワード検索（content, summary対象）
5. 日付範囲フィルタリング

#### Step 3.2: 統計・サマリー機能
1. `voicingsSummary` query - GraphQL Resolver
2. VoicingService.getSummary() - 統計取得ロジック
3. 感情分布計算
4. トップタグ計算
5. 総件数・期間別集計

#### Step 3.3: パフォーマンス最適化
1. データベースクエリ最適化
2. N+1問題解決（DataLoader導入）
3. AI分析の非同期化検討
4. キャッシュ機能（Redis等）

#### Step 3.4: エラーハンドリング強化
1. LLM API呼び出しのリトライ機能
2. レート制限対応
3. 分析失敗時のフォールバック処理
4. ログ出力・監視機能

### 各Stepの完了条件

**Step完了の定義:**
- 該当機能のUnit Test作成・実行成功
- GraphQL Playgroundでの動作確認
- Prisma Studioでのデータ確認

**Phase完了の定義:**  
- 全Stepの完了
- Integration Test実行成功
- フロントエンドとの疎通確認（該当Phase機能）

## 6. 考慮事項

### 6.1 パフォーマンス
- AI分析は非同期実行を検討
- 分析中はローディング状態を管理
- 大量データに対するページネーション

### 6.2 エラーハンドリング
- LLM API呼び出し失敗時の再試行
- 分析結果のバリデーション
- 不正な入力に対するエラーレスポンス

### 6.3 セキュリティ
- ユーザー認証・認可の確保
- 入力データのサニタイゼーション
- レート制限の実装

### 6.4 拡張性
- 複数のLLMプロバイダー対応
- 分析設定のカスタマイズ機能
- バッチ分析機能

## 7. ファイル構成

```
src/
├── voicing/
│   ├── dto/
│   │   ├── create-voicing.input.ts
│   │   ├── voicing-filter.input.ts
│   │   └── voicing.output.ts
│   ├── entities/
│   │   └── voicing.entity.ts
│   ├── voicing.resolver.ts
│   ├── voicing.service.ts
│   └── voicing.module.ts
├── ai/
│   ├── ai-analysis.service.ts
│   └── ai.module.ts
└── tag/
    ├── tag.resolver.ts
    ├── tag.service.ts
    └── tag.module.ts
```

## 8. 開発・テスト戦略

### 8.1 単体テスト
- Service層のビジネスロジックテスト
- AI分析結果のバリデーションテスト

### 8.2 統合テスト
- GraphQL APIのE2Eテスト
- AI分析機能の統合テスト

### 8.3 開発用モック
- AI分析のモックレスポンス
- 開発時のLLM API使用量制御