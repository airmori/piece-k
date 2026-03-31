# ガクチャン サイトリブランド設計書

## 概要
福岡中央ライオンズクラブのサイトを「ガクチャン（大学生にチャンスを！）」に全面リブランド。
ページ構成は既存を維持し、テキスト・カラー・データを差し替える。

## ブランディング
- 名称: ガクチャン
- キャッチコピー: 大学生にチャンスを！
- ロゴ: `public/gakuchan-logo.jpg`, `public/gakuchan-logo2.jpg`

## カラートークン変更（global.css）

| トークン | 旧値 | 新値 | 備考 |
|---|---|---|---|
| --md-sys-color-primary | #af000d | #2E5DB5 | ロゴの青 |
| --md-sys-color-on-primary | #ffffff | #ffffff | |
| --md-sys-color-primary-container | #d9161b | #5a8be0 | 明るい青 |
| --md-sys-color-secondary | #1d5fa8 | #F5C518 | ロゴの黄 |
| --md-sys-color-on-secondary | #ffffff | #1a1a2e | 黄色上は暗い文字 |
| --md-sys-color-secondary-container | #7ab0ff | #fde68a | 明るい黄 |
| --md-sys-color-tertiary | #7d4900 | #1a1a2e | ダークネイビー |
| --md-sys-color-tertiary-container | #9f5e00 | #334155 | |
| --md-sys-color-background | #fbf9f8 | #fafbfd | 青寄りの白 |
| --md-sys-color-surface | #fbf9f8 | #fafbfd | |
| --md-sys-color-surface-container-low | #f6f3f2 | #f0f4fa | |
| --md-sys-color-surface-container | #f0eded | #e8eef6 | |
| テーマカラー（meta） | #af000d | #2E5DB5 | |

## ページ別変更内容

### BaseLayout.astro
- title サフィックス: 「福岡中央ライオンズクラブ」→「ガクチャン」
- meta theme-color: #2E5DB5
- description: 大学生にチャンスを提供するプラットフォーム

### Header.astro
- ロゴ画像: `gakuchan-logo.jpg` に差し替え
- テキスト: 「ガクチャン」

### Footer.astro
- 「© 2026 ガクチャン」

### index.astro（ホーム）
- ヒーロー: 「大学生にチャンスを！」キャッチコピー
- 説明文: ガクチャンの紹介テキスト
- 募集バナー: 参加者募集テキストに変更

### about/index.astro（紹介）
- 団体概要テーブル: ガクチャンの基本情報（設立、拠点、ミッション等）
- メンバー紹介: public/images/about/ の写真を使用（ダミー名前・役職）
- ミッション・ビジョン文章
- 歴史→ガクチャンの沿革（ダミー）

### activities/index.astro（活動報告）
- カテゴリフィルタ: 「例会」「イベント」「式典」→「セミナー」「ワークショップ」「交流会」

### schedule/index.astro（カレンダー）
- カテゴリ色: 新カテゴリに対応

### contact/index.astro（お問い合わせ）
- 団体名・連絡先をダミーに変更

### events/[slug].astro（イベント詳細）
- カテゴリバッジ色を新カテゴリに対応

### members/ （会員ページ）
- 構造維持、ブランド名のみ変更

## events.json
既存イベントを全削除し、以下のダミーイベントに差し替え:

1. **キャリアデザインセミナー** (2026-03-15) - slug: career-seminar, カテゴリ: セミナー
2. **起業アイデアワークショップ** (2026-03-01) - slug: startup-workshop, カテゴリ: ワークショップ  
3. **企業×学生交流会** (2026-02-20) - slug: networking-event, カテゴリ: 交流会
4. **カレンダーのみ**: 定例ミーティング数件

既存のイベント写真を流用（ディレクトリはそのまま）。

## 設定ファイル
- manifest.json: name/short_name を「ガクチャン」に、theme_color を #2E5DB5 に
- wrangler.jsonc: プロジェクト名を「gakuchan」に
- package.json: name を「gakuchan」に

## 変更しないもの
- Astro/Tailwind のビルド設定
- 認証機能の仕組み
- ページルーティング構成
- GallerySlider/EventCard/RelatedActivities コンポーネントの構造
