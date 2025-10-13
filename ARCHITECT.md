# 🧭 BOM-AI Platform Architecture Overview

### Phase 2 – Application & Infrastructure Design

**Goal:**  
E-BOM ⇄ M-BOM 構造を中核とした製造業向け BOM 管理基盤を、AI 解析と統合する最小アーキテクチャを定義する。  
設計（E）→ 製造（M）→ フィードバック（AI）を循環させる仕組みを構築。

---

## 🏗️ 全体アーキテクチャ

```

[Vercel / Next.js (FE)]
│ Apollo Client (GraphQL)
▼
[ECS Fargate / NestJS (BE, Apollo Server)]
│
├── PostgreSQL (RDS, pgvector)
├── S3 (図面・仕様)
├── SQS → Lambda Worker (AI / メタ抽出 / 非同期処理)
└── OpenAI API / LangChain (AI 解析)

```

---

## ⚙️ 技術スタック一覧

| 層                    | 技術                                                    | 役割                                                  |
| --------------------- | ------------------------------------------------------- | ----------------------------------------------------- |
| **Frontend (FE)**     | Next.js (App Router) / TypeScript / MUI / Apollo Client | UI 構築、Cognito 認証、GraphQL 通信                   |
| **Backend (BE)**      | NestJS / Apollo Server / Prisma                         | GraphQL API・BOM/Item/Mapping ロジック・AI 連携       |
| **Database**          | PostgreSQL (RDS) + pgvector                             | BOM・Item・Mapping など全データの永続化・ベクトル検索 |
| **Storage**           | S3                                                      | 図面・仕様・関連ファイル格納                          |
| **Message Queue**     | SQS                                                     | AI 解析やファイルメタ処理などの非同期実行             |
| **Async Compute**     | Lambda                                                  | AI Worker, ファイルメタ抽出, 定期ジョブなど           |
| **Infra (Container)** | ECS (Fargate)                                           | NestJS の常駐 API コンテナ運用                        |
| **Auth**              | Cognito                                                 | JWT 認証、ユーザープロビジョニング                    |
| **Deployment**        | Vercel (FE) / AWS ECS (BE) / GitHub Actions (CI/CD)     | デプロイパイプライン                                  |
| **Local Dev**         | Docker / LocalStack / Node.js                           | ローカル検証環境                                      |

---

## 🧩 システム構成詳細

### 1. Frontend

- **Next.js (App Router 構成)**
  - CSR/ISR 両対応
  - Material UI で設計者・製造者向けの操作 UI 構築
  - GraphQL 通信（Apollo Client）で BOM/Item/AI 結果を取得
- **Auth**: Cognito 連携（local では開発用ユーザーを aws から使用）
- **主な画面**
  - BOM ブラウザ（階層構造＋差分表示）
  - Item リスト・詳細
  - E⇄M 対応マップビュー
  - AI 解析結果パネル（要約／提案）

---

### 2. Backend (NestJS on Fargate)

- **NestJS 構造**

```

src/
├── main.ts
├── app.module.ts
├── modules/
│ ├── auth/
│ ├── item/
│ ├── bom/
│ ├── mapping/
│ ├── files/
│ ├── ai/
│ └── queue/
└── prisma/

```

- **GraphQL (Apollo Server)**
- 自動スキーマ生成 (`@nestjs/graphql`)
- Resolver 単位で Module 分割
- Subscriptions 対応（AI 処理結果の Push 通知）

- **Service レイヤ**
- `bom.service.ts`: E-BOM/M-BOM CRUD・階層操作
- `mapping.service.ts`: BomMap 生成・差分計算
- `ai.service.ts`: OpenAI 埋め込み／要約処理
- `queue.service.ts`: SQS 連携（enqueue/dequeue）

- **Prisma**
- DB スキーマは 3NF で正規化済み（上記モデル）
- pgvector 拡張を有効化
- `vector`カラムで AI 埋め込み保存＆類似検索

- **AI 連携**
- OpenAI Embedding API (`text-embedding-3-large`)
- LangChain で RAG・類似検索を抽象化
- 結果を `AIInsight` テーブルに保存

---

### 3. 非同期処理（Lambda + SQS）

| 処理              | トリガー                      | 概要                                             |
| ----------------- | ----------------------------- | ------------------------------------------------ |
| **AI 解析ジョブ** | SQS（`startAIAnalyze`実行時） | BOM 構造を解析し、埋め込み生成・要約を実施       |
| **S3 メタ抽出**   | S3 PutObject イベント         | アップロードファイルの自動解析（CAD/Excel メタ） |
| **夜間バッチ**    | CloudWatch Event              | ベクトル再生成、インデックス再構築など           |
| **通知 Webhook**  | 手動 / Queue                  | 他システムへの連携通知                           |

**処理フロー例：**

1. NestJS → `SQS.sendMessage({ job: "analyze", bomId })`
2. Lambda Worker が SQS メッセージを受信
3. DB から BOM 構造を取得し、OpenAI API に送信
4. 結果（embedding, summary）を保存
5. NestJS Subscription 経由で FE へ通知

---

### 4. Database (PostgreSQL + pgvector)

- モデル構成は提示の通り
- `Tenant/User`：マルチテナント基盤
- `Item/Bom/BomItem/BomLink`：構成管理の中核
- `BomMap`：E⇄M 対応マッピング
- `Folder/File`：ドキュメント階層構造
- `quantity`は `BomLink` にのみ保持（正規化 ◎）
- `attributes` / `metadata` は JSONB
- ベクトル検索：`ivfflat`インデックス
- 外部キー制約は Cascade 設定

---

### 5. Storage (S3)

| バケット       | 用途              | 備考                       |
| -------------- | ----------------- | -------------------------- |
| `bom-files`    | 図面・仕様・画像  | Presigned URL アップロード |
| `bom-metadata` | 解析済みメタ JSON | Lambda が自動生成          |

- **Presigned URL 発行 API**
- NestJS → S3 SDK → 一時 URL 生成
- FE から直接アップロード

- **ファイルメタ抽出 Lambda**
- ファイルアップロード完了イベントで起動
- EXIF／CAD 属性／拡張子分類を DB 登録

---

### 6. 認証・認可

| 層      | 機能                                      |
| ------- | ----------------------------------------- |
| Cognito | ユーザー登録・ログイン・トークン発行      |
| NestJS  | JWT 検証（Passport-JWT）／Tenant 境界制御 |
| FE      | AccessToken を Apollo Header に付与       |
| DB      | `tenantId`でデータスコープ分離            |

---

### 7. 開発・運用環境

#### 🔹 ローカル開発環境

```

docker-compose.yml
├── postgres
├── nest (API)
├── next (FE)
└── localstack (S3, SQS)

```

- NestJS / Next.js は Node 実行
- Prisma でマイグレーション管理
- LocalStack で S3/SQS の mock
- `.env` に環境変数管理

#### 🔹 CI/CD

- GitHub Actions
  - Prisma migrate → Test → Build → Deploy
- Fargate タスク定義更新
- Lambda は CDK Stack として別管理

---

### 8. ネットワーク / セキュリティ

- VPC 内通信 (Fargate, RDS, Lambda)
- Security Group:
  - Fargate ⇄ RDS : 5432/TCP
  - Fargate ⇄ S3/SQS : IAM ロール許可
- SecretsManager で API Key / DB 接続管理
- WAF + HTTPS(ALB) + CloudFront(Optional)

---

---

## 🧠 全体アーキテクチャ図

```

              ┌────────────────────────────┐
              │        Vercel / FE          │
              │  Next.js + Apollo Client    │
              └────────────┬───────────────┘
                           │ GraphQL
                           ▼
            ┌────────────────────────────────┐
            │      ECS Fargate / NestJS       │
            │  Apollo Server / Prisma / AI    │
            │  Auth: Cognito + Passport-JWT   │
            ├────────────────┬────────────────┤
            │                │
      PostgreSQL(pgvector)   │
            │                │  async job
            ▼                ▼
     ┌─────────────┐     ┌──────────────┐
     │    RDS       │     │  SQS Queue   │
     └─────────────┘     └──────┬───────┘
                                 │
                           ┌─────▼──────┐
                           │  Lambda    │
                           │ (AI Worker)│
                           └─────┬──────┘
                                 │
                           ┌─────▼──────┐
                           │   S3       │
                           │ Files/Meta │
                           └────────────┘

```

---

## ✅ まとめ

| 層         | 技術                                    | 役割                       |
| ---------- | --------------------------------------- | -------------------------- |
| FE         | Next.js / Apollo / MUI                  | UI・GraphQL 通信           |
| BE         | NestJS / Apollo / Prisma                | API・業務ロジック・AI 連携 |
| 非同期     | SQS + Lambda                            | AI ジョブ・メタ解析・通知  |
| DB         | Postgres + pgvector                     | データ永続化・ベクトル検索 |
| ストレージ | S3                                      | 図面・仕様ファイル         |
| インフラ   | ECS(Fargate) / Cognito / SecretsManager | 運用・セキュリティ         |
| 開発環境   | Docker / LocalStack / Node              | ローカル統合開発           |

---

### 📘 Keywords

`NestJS`, `Apollo`, `Next.js`, `Prisma`, `PostgreSQL`, `pgvector`, `AWS ECS (Fargate)`,
`S3`, `SQS`, `Lambda`, `Cognito`, `OpenAI`, `LangChain`, `LocalStack`
