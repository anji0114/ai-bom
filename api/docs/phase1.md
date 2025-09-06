# **PDM AI Agent - PoC開発仕様書**

**1. プロダクト概要**

AIを活用し、プロダクトマネジメントにおける顧客の声（VoC）の整理・分析業務を自動化・効率化するSaaSの概念実証（PoC）版。ユーザーが登録したVoCに対し、AIが自動で「分類」「感情分析」「インパクト評価」「要約」を行い、直感的なダッシュボードで可視化する。

**PoCのゴール:** 「AIによるVoC自動分析」というコアバリューが、ユーザーにとって価値があるかを最速で検証する。

**2. アーキテクチャ概要**

- **フロントエンド:** Next.js
- **バックエンド:** NestJS
- **API:** GraphQL
- **データベース:** PostgreSQL (Prisma ORM)
- **認証:** Auth0 (Googleログイン) + NestJSによるHttpOnly Cookieセッション管理
- **AI連携:** langchain.js経由で外部LLM APIを利用

**3. データベーススキーマ**

PoCでは、ユーザー(`User`)を基点とし、すべてのデータ（`Voicing`, `Tag`）がユーザーに紐づくシングルテナントモデルを採用する。

prisma

```sql
model User {
  id        String    @id @default(cuid())
  email     String    @unique
  name      String?
  image     String?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  accounts  Account[]
  sessions  Session[]

  voicings  Voicing[]
  tags      Tag[]
}

model Account {
  id                 String        @id @default(cuid())
  userId             String
  provider           AuthProvider
  providerAccountId  String

  accessToken       String?       @db.Text
  refreshToken      String?       @db.Text
  idToken           String?       @db.Text
  expiresAt         DateTime?

  createdAt          DateTime      @default(now())
  updatedAt          DateTime      @updatedAt

  user               User          @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
}

model Session {
  id            String    @id @default(cuid())
  userId        String
  sessionToken  String    @unique
  expires       DateTime

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, expires])
}

// ---------- Domain ----------
model Voicing {
  id            String     @id @default(cuid())
  userId        String
  content       String
  source        String
  summary       String?
  sentiment     Sentiment?
  impactScore   Int?
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt

  user          User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  tags          VoicingTag[]

  @@index([userId, createdAt])
}

model Tag {
  id        String     @id @default(cuid())
  userId    String
  name      String
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt

  user      User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  voicings  VoicingTag[]

  // ユーザー内ユニーク
  @@unique([userId, name])
}

model VoicingTag {
  voicingId String
  tagId     String
  createdAt DateTime @default(now())

  voicing   Voicing @relation(fields: [voicingId], references: [id], onDelete: Cascade)
  tag       Tag     @relation(fields: [tagId], references: [id], onDelete: Cascade)

  @@id([voicingId, tagId])
}
```

**4. ページ別機能仕様**

PoCで開発するページは、実質的に以下の2ページと1つのモーダルコンポーネントです。

**4.1. トップページ / ログインページ**

- **URL:** `/`
- **目的:** サービス未利用のユーザーをログインに導くためのランディングページ。
- **表示条件:** ユーザーが認証されていない場合のみ表示。認証済みの場合は`/dashboard`へリダイレクトする。
- **機能一覧:**
  - **① サービス紹介:**
    - **内容:** 「AIで顧客の声を自動分析」「散らばるフィードバックを瞬時に整理」といった、サービスのコアバリューを伝える見出しと簡単な説明文を配置する。
    - **目的:** ユーザーに「これは何のサービスか」を即座に理解させる。
  - **② ログインボタン:**
    - **内容:** 「Googleでログイン / 新規登録」と書かれた目立つボタンを配置する。
    - **動作:** クリックすると、バックエンド(NestJS)のログイン開始エンドポイント (`/api/auth/google`) に遷移する。その後、ユーザーはGoogleの認証画面にリダイレクトされる。

**4.2. VoCダッシュボード**

- **URL:** `/dashboard`
- **目的:** ログインユーザーがVoCを一覧し、分析結果を俯瞰するためのメイン画面。
- **表示条件:** ユーザーが認証されている場合のみ表示。認証されていない場合はトップページ`/`へリダイレクトする。
- **機能一覧:**
  - **① ヘッダー:**
    - **内容:** 画面上部に常に表示される。左側にサービスロゴ、右側にユーザーのプロフィール画像と名前を表示する。
    - **動作:** ユーザー名部分をクリックするとドロップダウンメニューが開き、「ログアウト」ボタンが表示される。ログアウトボタンを押すと、バックエンドのログアウトエンドポイントを呼び出し、セッションを破棄してトップページ`/`に遷移する。
  - **② サマリーエリア:**
    - **内容:** 登録されたVoC全体の統計情報を表示するカードやグラフを配置する。（例: 「VoC総数: 58件」「感情比率: Positive 60% / Negative 40%」「タグ別件数」など）
    - **目的:** ユーザーがVoCの全体像を直感的に把握できるようにする。
  - **③ VoC一覧テーブル:**
    - **内容:** 自分が登録したVoCを一行ずつテーブル形式で表示する。表示するカラムは「VoC要約」「タグ」「感情」「インパクト」「受信日時」など。
    - **目的:** 個々のVoCの分析結果を一覧で比較・確認できるようにする。
  - **④ VoC追加ボタン:**
    - **内容:** 「+ VoCを追加」のようなボタンをテーブルの上部などに配置する。
    - **動作:** クリックすると、後述の「VoC追加モーダル」が表示される。
  - **⑤ フィルタリング機能:**
    - **内容:** テーブルの上部に、タグ、感情、キーワード検索などのフィルターUIを配置する。
    - **動作:** ユーザーがフィルター条件を選択・入力すると、VoC一覧テーブルの表示内容がリアルタイム（または適用ボタン押下時）に絞り込まれる。
  - **⑥ 詳細表示機能:**
    - **内容:** テーブルの各行をクリック可能にする。
    - **動作:** 行をクリックすると、そのVoCの詳細情報を持つ「VoC詳細モーダル」が表示される。

**4.3. VoC追加 / 詳細モーダル**

- **URL:** なし (ダッシュボードページ内のコンポーネント)
- **目的:** VoCの新規作成と、既存VoCの詳細情報の確認を行う。
- **機能一覧:**
  - **① 追加モード:**
    - **表示条件:** ダッシュボードの「VoC追加ボタン」を押したときに表示。
    - **入力項目:**
      - `content` (VoC原文): 複数行入力可能なテキストエリア。
      - `source` (収集元): 「手動入力」「Slack」などを選択できるプルダウン。
    - **アクション:** 「保存」ボタンを押すと、入力内容をバックエンドに送信する。成功したらモーダルを閉じ、ダッシュボードのVoC一覧を更新する。
  - **② 詳細モード:**
    - **表示条件:** ダッシュボードのVoC一覧テーブルの行をクリックしたときに表示。
    - **表示項目 (読み取り専用):**
      - VoC原文 (`content`)
      - AIによる要約 (`summary`)
      - AIによる感情分析結果 (`sentiment`)
      - AIによるインパクト評価 (`impactScore`)
      - AIによって付与されたタグ (`tags`) の一覧
    - **目的:** AIがどのような分析を行ったかをユーザーが確認できるようにする。
