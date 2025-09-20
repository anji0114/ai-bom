# X-Koutei (クロス・コウテイ)

日本の町工場に、「つながる頭脳」を。

X-Koutei は、中小・零細製造業が抱える情報の分断と属人化の課題を解決し、AI の力で世界に誇るものづくりを実現するための、製造業特化型コンサルティング AI です。

## ✨ プロダクトビジョン

我々は、日本の町工場に「つながる頭脳」を授ける。
分断された紙と Excel の情報を一つに繋ぎ合わせ、中小・零細企業こそが、AI の力で、世界に誇るものづくりを実現する未来を創造する。

## 🎯 現在のフェーズ：技術検証 MVP (Professional Core)

このリポジトリは、X-Koutei の核心技術である RAG (Retrieval-Augmented Generation) パイプラインを、AWS の本格的なインフラ上で構築・検証するためのものです。

### MVP の主要機能

- **ユーザー認証**: Amazon Cognito によるセキュアな認証基盤
- **製品管理**: コンサルティング対象となる『製品』を登録・管理
- **ファイル管理**: 各『製品』に複数の関連ファイル（設計図、仕様書など）を AWS S3 にアップロード
- **横断 AI チャット**: 登録された全ファイルを横断的に AI が理解し、専門的な質問に根拠を提示しながら回答

### 🛠️ 技術スタック & アーキテクチャ

| 領域           | サービス / 技術                      |
| -------------- | ------------------------------------ |
| フロントエンド | Next.js, MUI, Apollo Client          |
| バックエンド   | Nest.js, GraphQL, Prisma             |
| データベース   | PostgreSQL (pgvector 拡張)           |
| AI             | OpenAI API, Gemini API, LangChain.js |
| 認証           | Amazon Cognito                       |
| インフラ       | AWS (Fargate, RDS, S3), Vercel       |
| 開発環境       | Docker                               |

## 🚀 開発を始める (Getting Started)

### 1. 前提条件

- Node.js (v22.x or later)
- pnpm (v8.x or later)
- Docker & Docker Compose
- AWS CLI
- Vercel CLI

### 2. 環境変数の設定

`client/` と `server/` の各ディレクトリに、`.env.local` および `.env` ファイルを作成し、必要な環境変数を設定します。（詳細は各ディレクトリの README を参照）

### 3. ローカル開発環境の起動

#### データベースの起動

プロジェクトのルートディレクトリで、Docker Compose を使い PostgreSQL コンテナを起動します。

```bash
docker-compose up -d
```

#### 依存関係のインストール

プロジェクトのルートディレクトリで、`pnpm install` を実行します。

```bash
pnpm install
```

#### バックエンドの起動

server ディレクトリで、開発サーバーを起動します。

```bash
cd server
pnpm run server start:dev
```

バックエンドは http://localhost:3300 で起動します。

#### フロントエンドの起動

同様に、client ディレクトリで開発サーバーを起動します。

```bash
cd client
pnpm dev
```

フロントエンドは http://localhost:3000 で起動します。

### 4. 型定義の生成

バックエンドの API スキーマに変更があった場合、フロントエンドで codegen スクリプトを実行して型定義ファイルを更新します。

```bash
pnpm run codegen:watch
```
