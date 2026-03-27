# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**福岡中央ライオンズクラブ**（Fukuoka Chuo Lions Club）の公式ウェブサイト。モバイルファーストの日本語サイト。

## Architecture

- **Astro** ベースの静的サイト（`stitch/` 時代のスタンドアロンHTMLから移行済み）
- ソースコード: `src/` 配下
  - `src/pages/` — Astroページ（home, about, activities, events, schedule, contact, members）
  - `src/components/` — 共通コンポーネント
  - `src/layouts/` — レイアウト
  - `src/data/events.json` — 全イベントデータ（カレンダー＋詳細ページ兼用）
  - `src/styles/` — スタイル
- `public/images/activities/` — イベント写真（`{YYYY-MM-DD}_{slug}/` ディレクトリ構成）
- デプロイ: **Cloudflare Workers/Pages**（`wrangler.jsonc`）

## Tech Stack

- **Astro** + **Tailwind CSS**
- **Google Fonts**: Plus Jakarta Sans, Noto Sans JP, Inter
- **Material Symbols Outlined** for icons

## Design System

- **Color tokens**: Material Design 3 naming. Primary: `#af000d`（赤）, Secondary: `#1d5fa8`（青）, Tertiary: `#7d4900`（琥珀）
- **"No-Line" rule**: 1pxボーダーで区切らない — 背景色の切り替えで区分
- **Elevation**: ドロップシャドウよりトーナル・レイヤリング
- **Typography**: Plus Jakarta Sans（見出し）, Noto Sans JP（本文）, Inter（ラベル）
- **Text color**: 純黒(#000)禁止 — `on-surface`(#1b1c1c)を使用

## Development

```bash
npm run dev      # 開発サーバー起動
npm run build    # ビルド
```

## Git Workflow

- GitHub org: `fukuoka-lions`
- ブランチ: `feat/` or `fix/` → PR → `main` マージ
- コミットメッセージ: 日本語（`feat:` / `fix:` プレフィックス）

## Event Addition Workflow（イベント追加手順）

新しいイベントを追加する際の手順:

### 1. 写真フォルダの作成
`public/images/activities/{YYYY-MM-DD}_{slug}/` にイベント写真を配置する。

写真のファイル名規則:
- `{slug}01.jpg`, `{slug}02.jpg`, `{slug}03.jpg` ...
- 1枚目 → heroImage
- 2〜3枚目 → gridPhotos
- 4枚目以降 → sliderPhotos

### 2. events.json の更新
`src/data/events.json` の配列先頭（日付降順）にイベントデータを追加。

**詳細イベント（写真あり）のフォーマット:**
```json
{
  "slug": "event-slug",
  "date": "YYYY-MM-DD",
  "title": "イベント名",
  "category": "イベント",
  "desc": "1行の概要説明",
  "location": "開催場所",
  "imageDir": "YYYY-MM-DD_event-slug",
  "heroImage": "slug01.jpg",
  "portrait": false,
  "gridPhotos": ["slug02.jpg", "slug03.jpg"],
  "sliderPhotos": ["slug04.jpg", "slug05.jpg"],
  "content": {
    "sections": [
      {
        "icon": "material_icon_name",
        "color": "primary",
        "title": "セクションタイトル",
        "paragraphs": ["段落1", "段落2"]
      },
      {
        "icon": "material_icon_name",
        "color": "secondary",
        "title": "当日の様子",
        "paragraphs": ["段落1", "段落2"]
      }
    ],
    "voiceTitle": "参加者の声",
    "voiceIcon": "format_quote",
    "voice": "参加者のコメント"
  },
  "youtube": null
}
```

**カレンダーのみ（写真なし）のフォーマット:**
```json
{ "date": "YYYY-MM-DD", "title": "例会名", "category": "例会", "desc": "説明" }
```

### 3. 文章の自動生成
- 写真からイベントの内容・雰囲気を読み取り、日本語の説明文を生成
- sections は基本2つ（概要 + 当日の様子）
- `portrait: true` は縦写真がheroの場合に設定
- category は「イベント」「例会」「式典」のいずれか

## Language

サイトコンテンツは日本語。組織名は「福岡中央ライオンズクラブ」。
