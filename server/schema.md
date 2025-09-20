# PDM Agent Database Schema Design

## ユーザーが本当に欲しい機能（優先度順）

### 🚀 MVP必須機能
1. **VOC管理**: 顧客の声を蓄積・分析
2. **プロダクト基本情報**: 名前、説明、現状把握
3. **機能・改善アイデア管理**: VOCから生まれたアイデアを記録
4. **優先度付け**: どれから取り組むべきかの判断

### 💡 欲しい機能（フェーズ2）
5. **VOCと機能の関連性**: なぜこの機能を作るのかの根拠
6. **進捗管理**: 機能開発の状況追跡
7. **バージョン管理**: リリース計画とロードマップ

### 🔮 将来的に欲しい機能
8. **AI自動分析**: VOCから機能提案
9. **インパクト測定**: 機能リリース後の効果測定
10. **チーム連携**: 複数人での共同作業

## MVP設計方針
- **シンプル**: 3ヶ月で価値を感じられる
- **拡張可能**: 将来の機能追加に対応
- **データ蓄積**: 使えば使うほど価値が出る

## MVP Core Models

### User (ユーザー)
```
- id, email, name, image
- createdAt, updatedAt
```

### Product (プロダクト)
```
- id
- userId
- name
- description  // 簡潔な説明（1-2行）
- content      // 詳細情報（マークダウン対応、初期は空文字OK）
- createdAt, updatedAt
```

### Voicing (VOC) ※既存
```
- id
- userId
- productId  // 新規追加
- content
- source
- summary, sentiment, impactScore
- createdAt, updatedAt
```

### Feature (機能/改善アイデア)
```
- id
- productId     // versionIdではなくproductIdに直結
- name
- description   // 簡潔な説明（1-2行）
- content       // 詳細仕様（マークダウン対応、技術的詳細、要件など）
- priority (HIGH, MEDIUM, LOW)
- status (IDEA, PLANNED, IN_PROGRESS, COMPLETED)
- createdAt, updatedAt
```

### FeatureVoicing (関連性) ※将来拡張用
```
- featureId
- voicingId
- createdAt
```

## 関連性テーブル

### FeatureVoicing (機能とVOCの関連)
```
- featureId
- voicingId
- relationshipType ("INSPIRED_BY", "VALIDATES", "CONTRADICTS")
- notes (関連の説明)
- createdAt
```

### Tag (分類タグ)
```
- id
- userId
- name
- color
- createdAt, updatedAt
```

### VoicingTag / FeatureTag
既存のタグ機能をVOCと機能の両方で活用

## PDMにとっての価値

### 1. VOCドリブンな機能開発
- どのVOCがどの機能のインスピレーションになったかを追跡
- 機能リリース後に元のVOCが解決されたかを検証

### 2. ロードマップの根拠を明確化
- 「なぜこの機能を作るのか？」→関連するVOCを表示
- ステークホルダーへの説明が容易

### 3. インパクト測定
- 高いimpactScoreのVOCに対応する機能を優先
- リリース後のVOC変化を追跡

### 4. タグベースの分析
- "UI/UX"タグのVOCが多い→UI改善を優先
- "パフォーマンス"タグのVOCとその解決状況

## ユースケース例

### ケース1: 新機能の企画
1. VOCを分析してpainポイントを特定
2. 解決する機能をFeatureとして作成
3. FeatureVoicingで関連VOCを紐付け
4. 優先度とロードマップを決定

### ケース2: 機能の効果検証
1. リリースした機能に関連するVOCを確認
2. リリース後の新しいVOCで改善を測定
3. 次のイテレーションを計画

### ケース3: ステークホルダー報告
1. 機能一覧と各機能の根拠となるVOCを表示
2. VOCのsentimentとimpactScoreで優先度を説明
3. ロードマップの進捗状況を報告

## 最適化ポイント

### シンプルさを保つ
- 複雑すぎる関連は避ける
- PDMが日常的に使える粒度

### 拡張性
- エンタープライズでも個人でも使える
- 将来的な機能追加に対応

### データの価値
- 入力コストに見合う価値を提供
- AI分析で自動化できる部分は自動化