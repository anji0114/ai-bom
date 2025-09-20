# 要求管理機能 実装TODO

## 概要
PDM業務のコア機能として、VoCから得られた顧客要求を体系的に管理する要求管理機能を実装する。

## 実装予定機能
- ✅ 要求の分類（機能要求・非機能要求・品質要求）
- ✅ 優先順位付け（High/Medium/Low）
- ✅ 実装ステータス管理（New/InProgress/Done/Rejected）
- ✅ VoCとの関連付け
- ✅ Productとの関連付け
- ✅ 要求のタグ管理

## 技術仕様
- **Backend**: NestJS + GraphQL + Prisma + PostgreSQL
- **認証**: 既存のGqlAuthGuard使用
- **リレーション**: Product(1:N)Requirement(N:N)VoC

## 実装TODO

### 1. 設計・分析 📋
- [ ] 要求管理機能の設計・分析を行う
- [ ] Requirementエンティティとスキーマを設計する

### 2. データベース設計 🗄️
- [ ] Prismaスキーマにrequirementテーブルを追加する

### 3. エンティティ・DTO作成 📝
- [ ] RequirementエンティティとDTOを作成する

### 4. サービス・リゾルバー実装 ⚙️
- [ ] RequirementServiceを実装する
- [ ] RequirementResolverを実装する

### 5. モジュール設定 🔧
- [ ] RequirementModuleを作成・設定する

### 6. 関連機能実装 🔗
- [ ] ProductとRequirementの関連付けを実装する
- [ ] VoCとRequirementの関連付けを実装する

### 7. テスト実装 🧪
- [ ] 要求管理機能のテストを実装する

## データモデル設計案

### Requirement
```prisma
model Requirement {
  id          String   @id @default(cuid())
  userId      String
  productId   String
  title       String
  description String?
  type        RequirementType  // FUNCTIONAL, NON_FUNCTIONAL, QUALITY
  priority    Priority         // HIGH, MEDIUM, LOW
  status      RequirementStatus // NEW, IN_PROGRESS, DONE, REJECTED
  source      String?          // 要求の出典
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  product     Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  voicings    Voicing[] @relation("RequirementVoicing")
}
```

### Enums
```prisma
enum RequirementType {
  FUNCTIONAL      // 機能要求
  NON_FUNCTIONAL  // 非機能要求
  QUALITY         // 品質要求
}

enum Priority {
  HIGH
  MEDIUM
  LOW
}

enum RequirementStatus {
  NEW
  IN_PROGRESS
  DONE
  REJECTED
}
```

## API設計案

### Mutations
- `createRequirement(input: CreateRequirementInput!): Requirement!`
- `updateRequirement(input: UpdateRequirementInput!): Requirement!`
- `deleteRequirement(id: String!): Boolean!`

### Queries
- `getRequirement(id: String!): Requirement`
- `getRequirements(filter: RequirementFilterInput): RequirementConnection!`
- `getRequirementsByProduct(productId: String!): RequirementConnection!`

### Filters
- プロダクト別
- ステータス別
- 優先度別
- タイプ別
- 作成日範囲

---
*実装開始日: 2025-09-20*