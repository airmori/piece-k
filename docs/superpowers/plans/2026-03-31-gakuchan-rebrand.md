# ガクチャン サイトリブランド 実装計画

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 福岡中央ライオンズクラブのサイトを「ガクチャン」に全面リブランドする

**Architecture:** 既存のAstro静的サイト構成をそのまま維持し、カラートークン・テキスト・データを差し替える。ページ構成・コンポーネント構造・認証機能はそのまま。

**Tech Stack:** Astro, Tailwind CSS v4, Cloudflare Workers/Pages

---

### Task 1: カラートークン・設定ファイルの変更

**Files:**
- Modify: `src/styles/global.css`
- Modify: `public/manifest.json`
- Modify: `wrangler.jsonc`
- Modify: `package.json`

- [ ] **Step 1: global.css のカラートークンを差し替え**

`src/styles/global.css` の `@theme` ブロック内のカラー値を以下に変更:

```css
@import "tailwindcss";

@theme {
  --color-error-container: #ffdad6;
  --color-on-surface: #1b1c1c;
  --color-surface-container: #e8eef6;
  --color-on-primary: #ffffff;
  --color-primary-fixed: #d5e3ff;
  --color-background: #fafbfd;
  --color-on-error: #ffffff;
  --color-outline-variant: #b7c4d8;
  --color-outline: #6a7a92;
  --color-on-tertiary-container: #e0e6f0;
  --color-surface-tint: #2E5DB5;
  --color-tertiary: #1a1a2e;
  --color-secondary-fixed-dim: #f5d76e;
  --color-secondary: #F5C518;
  --color-tertiary-fixed: #c8cfe0;
  --color-on-tertiary: #ffffff;
  --color-surface-container-highest: #dde3ed;
  --color-on-primary-fixed-variant: #1a3d7a;
  --color-surface-bright: #fafbfd;
  --color-on-primary-container: #e8eeff;
  --color-surface-variant: #dde3ed;
  --color-on-background: #1b1c1c;
  --color-surface-dim: #d5dbe5;
  --color-on-surface-variant: #3c4a5c;
  --color-surface-container-high: #e2e8f2;
  --color-on-secondary-fixed: #3d2e00;
  --color-surface-container-lowest: #ffffff;
  --color-on-primary-fixed: #0a1f4a;
  --color-primary-fixed-dim: #8ab0ff;
  --color-inverse-surface: #303030;
  --color-secondary-container: #fde68a;
  --color-primary-container: #5a8be0;
  --color-error: #ba1a1a;
  --color-on-error-container: #93000a;
  --color-surface: #fafbfd;
  --color-inverse-on-surface: #f3f0f0;
  --color-on-tertiary-fixed: #0a0a1a;
  --color-tertiary-container: #334155;
  --color-tertiary-fixed-dim: #8a92a8;
  --color-secondary-fixed: #fff3c4;
  --color-inverse-primary: #8ab0ff;
  --color-primary: #2E5DB5;
  --color-surface-container-low: #f0f4fa;
  --color-on-secondary: #1a1a2e;
  --color-on-secondary-fixed-variant: #5c4400;
  --color-on-secondary-container: #5c4400;

  --font-family-headline: 'Plus Jakarta Sans', 'Noto Sans JP', sans-serif;
  --font-family-body: 'Plus Jakarta Sans', 'Noto Sans JP', sans-serif;
  --font-family-label: 'Inter', 'Noto Sans JP', sans-serif;
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
```

- [ ] **Step 2: manifest.json を更新**

```json
{
  "name": "ガクチャン",
  "short_name": "ガクチャン",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#fafbfd",
  "theme_color": "#2E5DB5",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

- [ ] **Step 3: wrangler.jsonc を更新**

name を `"gakuchan"` に変更。

- [ ] **Step 4: package.json を更新**

name を `"gakuchan"` に変更。

- [ ] **Step 5: ビルド確認**

Run: `npm run build`
Expected: ビルド成功

- [ ] **Step 6: コミット**

```bash
git add src/styles/global.css public/manifest.json wrangler.jsonc package.json
git commit -m "feat: ガクチャン用にカラートークン・設定ファイルを変更"
```

---

### Task 2: 共通コンポーネント・レイアウトの変更

**Files:**
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/components/Header.astro`
- Modify: `src/components/Footer.astro`
- Modify: `src/components/BottomNav.astro`

- [ ] **Step 1: BaseLayout.astro を更新**

line 19: `<title>{title} | 福岡中央ライオンズクラブ</title>` → `<title>{title} | ガクチャン</title>`
line 25: `<meta name="theme-color" content="#af000d" />` → `<meta name="theme-color" content="#2E5DB5" />`

- [ ] **Step 2: Header.astro を更新**

ロゴ画像とテキストを差し替え。背景色をガクチャンカラーに:

```astro
---
// No props needed
---
<header class="fixed top-0 w-full z-50 bg-[#fafbfd]/85 backdrop-blur-md shadow-[0_8px_32px_rgba(27,28,28,0.06)] h-16">
  <div class="max-w-2xl mx-auto h-full flex items-center justify-between px-6">
    <a href="/" class="flex items-center gap-2">
      <img src="/gakuchan-logo.jpg" alt="ガクチャン" class="h-9 object-contain flex-shrink-0" />
    </a>
    <a href="/members/" class="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
      <span class="material-symbols-outlined" style="font-size:20px;">lock</span>
    </a>
  </div>
</header>
```

Note: ロゴ画像にテキストが含まれているので、別途テキスト表記は不要。

- [ ] **Step 3: Footer.astro を更新**

```astro
---
// No props needed
---
<footer class="w-full bg-[#f0f4fa] flex items-center justify-center px-8 py-6">
  <div class="text-[10px] text-[#1b1c1c]/50 font-label">&copy; 2026 ガクチャン</div>
</footer>
```

- [ ] **Step 4: BottomNav.astro のハードコードされた色を更新**

line 15: `bg-[#fbf9f8]/85` → `bg-[#fafbfd]/85`
line 19: `text-[#1d5fa8] bg-[#7ab0ff]/10` → `text-[#2E5DB5] bg-[#5a8be0]/10`（Primaryベース）
line 20: hover `bg-[#f6f3f2]` → `bg-[#f0f4fa]`

- [ ] **Step 5: dev サーバーで表示確認**

Run: ブラウザで http://localhost:4321/ を確認
Expected: ヘッダーにガクチャンロゴ、フッターに「ガクチャン」、新しい色スキーム

- [ ] **Step 6: コミット**

```bash
git add src/layouts/BaseLayout.astro src/components/Header.astro src/components/Footer.astro src/components/BottomNav.astro
git commit -m "feat: ヘッダー・フッター・レイアウトをガクチャンにリブランド"
```

---

### Task 3: events.json をガクチャン用ダミーデータに差し替え

**Files:**
- Modify: `src/data/events.json`

- [ ] **Step 1: events.json を差し替え**

既存のライオンズクラブイベントを全削除し、ガクチャン用ダミーイベントに置き換え。
既存の写真ディレクトリをそのまま流用。

```json
[
  {
    "slug": "career-seminar",
    "date": "2026-03-23",
    "title": "キャリアデザインセミナー",
    "category": "セミナー",
    "desc": "社会人メンターと一緒に、自分だけのキャリアプランを描くセミナーを開催しました。",
    "location": "福岡市中央区",
    "imageDir": "2026-03-23_hair-donation",
    "heroImage": "hair-donation01.jpg",
    "gridPhotos": ["hair-donation02.jpg", "hair-donation03.jpg"],
    "sliderPhotos": ["hair-donation04.jpg", "hair-donation05.jpg"],
    "content": {
      "sections": [
        {
          "icon": "school",
          "color": "primary",
          "title": "セミナーの概要",
          "paragraphs": [
            "ガクチャンが主催するキャリアデザインセミナーは、大学生が自分の将来を主体的に考えるきっかけを提供するプログラムです。各業界で活躍する社会人メンターを招き、リアルなキャリアストーリーを共有していただきました。",
            "参加者はワークシートを使いながら自分の強み・価値観・目標を整理し、メンターとの1on1セッションで具体的なアクションプランを作成しました。"
          ]
        },
        {
          "icon": "groups",
          "color": "secondary",
          "title": "当日の様子",
          "paragraphs": [
            "会場には30名を超える大学生が集まり、真剣な眼差しでメンターの話に耳を傾けていました。グループディスカッションでは活発な意見交換が行われ、異なる大学・学部の学生同士が刺激し合う場となりました。",
            "セミナー後の交流会では、参加者同士が連絡先を交換し、今後も互いに高め合える仲間づくりが自然と生まれていました。"
          ]
        }
      ],
      "voiceTitle": "参加者の声",
      "voiceIcon": "format_quote",
      "voice": "漠然としていた将来のイメージが、メンターとの対話を通じて具体的な目標に変わりました。同じ志を持つ仲間にも出会えて、参加して本当に良かったです。"
    },
    "youtube": null
  },
  {
    "slug": "startup-workshop",
    "date": "2026-03-01",
    "title": "起業アイデアワークショップ",
    "category": "ワークショップ",
    "desc": "学生ならではの視点でビジネスアイデアを形にする実践型ワークショップ。",
    "location": "福岡市博多区",
    "imageDir": "2025-12-16_christmas",
    "heroImage": "christmas01.jpg",
    "gridPhotos": ["christmas02.jpg", "christmas03.jpg"],
    "sliderPhotos": ["christmas04.jpg", "christmas05.jpg", "christmas06.jpg"],
    "content": {
      "sections": [
        {
          "icon": "lightbulb",
          "color": "primary",
          "title": "ワークショップの概要",
          "paragraphs": [
            "「アイデアを形にする力」をテーマに、起業に興味のある大学生を対象としたワークショップを開催しました。現役の起業家やベンチャーキャピタリストをゲストに迎え、ビジネスモデルキャンバスの作成からピッチ練習まで、実践的なプログラムを提供しました。",
            "チームに分かれてのアイデアソンでは、社会課題の解決をテーマに、学生ならではの斬新なアイデアが次々と生まれました。"
          ]
        },
        {
          "icon": "rocket_launch",
          "color": "secondary",
          "title": "当日の様子",
          "paragraphs": [
            "午前中はインプットセッションとして、起業の基礎知識やリーンスタートアップの考え方を学びました。午後はチームごとにアイデアをブラッシュアップし、最終プレゼンに向けて準備を進めました。",
            "審査員からのフィードバックは厳しくも温かく、学生たちは自分たちのアイデアの可能性と課題を客観的に理解する貴重な機会となりました。"
          ]
        }
      ],
      "voiceTitle": "参加者の声",
      "voiceIcon": "format_quote",
      "voice": "起業って遠い世界の話だと思っていましたが、実際にアイデアを形にしてみると『自分にもできるかも』と思えるようになりました。チームメンバーとの議論も刺激的でした。"
    },
    "youtube": null
  },
  {
    "slug": "networking-event",
    "date": "2026-02-20",
    "title": "企業×学生 交流会",
    "category": "交流会",
    "desc": "福岡の注目企業と大学生が直接対話できる交流イベントを開催。",
    "location": "福岡市中央区天神",
    "imageDir": "2025-11-04_new-member",
    "heroImage": "new-member01.jpg",
    "gridPhotos": ["new-member02.jpg", "new-member03.jpg"],
    "sliderPhotos": ["new-member04.jpg", "new-member05.jpg"],
    "content": {
      "sections": [
        {
          "icon": "handshake",
          "color": "primary",
          "title": "交流会の概要",
          "paragraphs": [
            "ガクチャンが企画する「企業×学生 交流会」は、就活の面接ではなく、フラットな対話を通じて企業と学生が互いを知る場です。福岡で注目のスタートアップやIT企業、老舗企業など多様な10社が参加しました。",
            "堅苦しいスーツではなく私服での参加を推奨し、カジュアルな雰囲気の中で本音のコミュニケーションが生まれる場をデザインしました。"
          ]
        },
        {
          "icon": "diversity_3",
          "color": "secondary",
          "title": "当日の様子",
          "paragraphs": [
            "ラウンドテーブル形式で、学生と企業の担当者が少人数で対話。20分ごとにテーブルをローテーションし、多くの企業と話す機会が設けられました。",
            "イベント後のアンケートでは参加学生の95%が『参加して良かった』と回答。企業側からも『普段の採用活動では出会えない優秀な学生と話せた』と好評でした。"
          ]
        }
      ],
      "voiceTitle": "参加者の声",
      "voiceIcon": "format_quote",
      "voice": "普通の合同説明会とは全く違って、企業の方と対等に話せる感じが新鮮でした。自分が知らなかった業界にも興味が湧いて、視野が広がりました。"
    },
    "youtube": null
  },
  { "date": "2026-04-15", "title": "4月定例ミーティング", "category": "セミナー", "desc": "月次の振り返りと今後のイベント企画会議を行います。" },
  { "date": "2026-04-02", "title": "新歓イベント企画会議", "category": "ワークショップ", "desc": "新入生歓迎イベントの企画・準備ミーティング。" },
  { "date": "2026-03-18", "title": "3月定例ミーティング", "category": "セミナー", "desc": "3月の活動振り返りと次月の計画を話し合います。" },
  { "date": "2026-03-04", "title": "SNSマーケティング勉強会", "category": "ワークショップ", "desc": "SNSを活用した情報発信スキルを学ぶ勉強会。" },
  { "date": "2026-02-18", "title": "2月定例ミーティング", "category": "セミナー", "desc": "2月の活動振り返りと次月の計画を話し合います。" },
  { "date": "2026-02-04", "title": "プレゼンスキルアップ講座", "category": "ワークショップ", "desc": "効果的なプレゼンテーションの基礎を学ぶ講座。" },
  { "date": "2026-01-21", "title": "1月定例ミーティング", "category": "セミナー", "desc": "新年最初の定例ミーティング。年間計画を策定します。" }
]
```

- [ ] **Step 2: ビルド確認**

Run: `npm run build`
Expected: ビルド成功（新しいスラッグでイベント詳細ページが生成される）

- [ ] **Step 3: コミット**

```bash
git add src/data/events.json
git commit -m "feat: events.jsonをガクチャン用ダミーデータに差し替え"
```

---

### Task 4: カテゴリマッピングの更新（全ページ）

**Files:**
- Modify: `src/pages/index.astro` (lines 57-67)
- Modify: `src/pages/activities/index.astro` (lines 10-14, 32-34)
- Modify: `src/pages/events/[slug].astro` (lines 17-21)
- Modify: `src/pages/schedule/index.astro` (lines 63-67)

- [ ] **Step 1: index.astro のカテゴリマッピングを更新**

lines 57-67 の categoryColorMap と categoryBadgeMap を差し替え:

```typescript
const categoryColorMap: Record<string, { bg: string; text: string }> = {
  'セミナー': { bg: 'bg-primary/10', text: 'text-primary' },
  'ワークショップ': { bg: 'bg-tertiary/10', text: 'text-tertiary' },
  '交流会': { bg: 'bg-secondary/10', text: 'text-secondary' },
};

const categoryBadgeMap: Record<string, string> = {
  'セミナー': 'bg-primary text-on-primary',
  'ワークショップ': 'bg-tertiary text-on-tertiary',
  '交流会': 'bg-secondary text-on-secondary',
};
```

- [ ] **Step 2: activities/index.astro のカテゴリを更新**

lines 10-14 の categoryBadgeMap:

```typescript
const categoryBadgeMap: Record<string, string> = {
  'セミナー': 'bg-primary',
  'ワークショップ': 'bg-tertiary',
  '交流会': 'bg-secondary',
};
```

lines 32-34 のフィルタボタン:

```html
<button class="filter-btn flex-shrink-0 px-5 py-2 rounded-full text-sm font-bold shadow-sm transition-colors" data-category="all">すべて</button>
<button class="filter-btn flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-colors" data-category="セミナー">セミナー</button>
<button class="filter-btn flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-colors" data-category="ワークショップ">ワークショップ</button>
<button class="filter-btn flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-colors" data-category="交流会">交流会</button>
```

- [ ] **Step 3: events/[slug].astro のカテゴリ色を更新**

lines 17-21:

```typescript
const categoryColors = {
  'セミナー': 'bg-primary text-white',
  'ワークショップ': 'bg-tertiary text-white',
  '交流会': 'bg-secondary text-on-secondary',
};
```

- [ ] **Step 4: schedule/index.astro のカテゴリ色を更新**

lines 63-67 の categoryColors:

```javascript
var categoryColors = {
  'セミナー':      { tag: 'bg-primary',   badge: 'bg-primary/10 text-primary' },
  'ワークショップ': { tag: 'bg-tertiary',  badge: 'bg-tertiary/10 text-tertiary' },
  '交流会':        { tag: 'bg-secondary', badge: 'bg-secondary/10 text-secondary' }
};
```

- [ ] **Step 5: ビルド確認**

Run: `npm run build`
Expected: ビルド成功

- [ ] **Step 6: コミット**

```bash
git add src/pages/index.astro src/pages/activities/index.astro src/pages/events/\[slug\].astro src/pages/schedule/index.astro
git commit -m "feat: カテゴリマッピングをガクチャン用に更新"
```

---

### Task 5: ホームページ（index.astro）のテキスト変更

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: ヒーローセクションのテキストを変更**

line 78: `We Serve` → `Gakuchan`
line 79: `福岡の街を、もっと輝かせたい。<br/>私たちは奉仕の力で繋がっています。` → `大学生にチャンスを！<br/>挑戦と成長の機会を届けます。`

- [ ] **Step 2: 募集バナーのテキストを変更**

line 175: `共に奉仕をしませんか？` → `一緒に挑戦しませんか？`
line 176: `福岡中央ライオンズクラブでは、随時新入会員を募集しています。` → `ガクチャンでは、一緒に活動する大学生メンバーを募集しています。`
line 178 のリンクテキスト: `詳しい案内を見る` → そのまま（About ページへのリンク）

- [ ] **Step 3: ビルド確認**

Run: `npm run build`
Expected: ビルド成功

- [ ] **Step 4: コミット**

```bash
git add src/pages/index.astro
git commit -m "feat: ホームページのテキストをガクチャン用に変更"
```

---

### Task 6: 紹介ページ（about/index.astro）の全面書き換え

**Files:**
- Modify: `src/pages/about/index.astro`

- [ ] **Step 1: ページ全体をガクチャン用に書き換え**

ページヘッダー、団体概要、メンバー紹介、ミッション、沿革、活動拠点をすべてガクチャン用のダミーコンテンツに差し替え。

メンバー写真は `public/images/about/` にある以下を使用:
- mori.jpg
- ishibashi.jpg
- yasui.jpg
- hayashi.jpg
- komine.jpg

完全な置き換え内容:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
---
<BaseLayout title="ガクチャンについて" activePage="about">
<main class="pt-20 pb-32 px-4 max-w-2xl mx-auto w-full">
<!-- Page Header -->
<section class="mb-8 mt-4">
  <span class="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">About Us</span>
  <h2 class="font-headline text-3xl font-extrabold tracking-tight text-on-surface mb-2">ガクチャンについて</h2>
  <p class="text-on-surface-variant text-sm leading-relaxed">大学生にチャンスを。挑戦と成長の機会を届けるコミュニティです。</p>
</section>

<!-- 団体概要 -->
<section class="mb-10">
  <h3 class="text-xl font-bold font-headline mb-6 flex items-center gap-2">
    <span class="w-1 h-6 bg-primary-container rounded-full"></span>
    団体概要
  </h3>
  <div class="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
    <div class="divide-y divide-surface-container">
      <div class="flex px-5 py-3">
        <span class="text-xs font-bold text-on-surface-variant w-24 flex-shrink-0">設立</span>
        <span class="text-sm text-on-surface">2024年4月</span>
      </div>
      <div class="flex px-5 py-3">
        <span class="text-xs font-bold text-on-surface-variant w-24 flex-shrink-0">拠点</span>
        <span class="text-sm text-on-surface">福岡市中央区天神</span>
      </div>
      <div class="flex px-5 py-3">
        <span class="text-xs font-bold text-on-surface-variant w-24 flex-shrink-0">対象</span>
        <span class="text-sm text-on-surface">福岡県内の大学生</span>
      </div>
      <div class="flex px-5 py-3">
        <span class="text-xs font-bold text-on-surface-variant w-24 flex-shrink-0">メンバー数</span>
        <span class="text-sm text-on-surface">約50名</span>
      </div>
      <div class="flex px-5 py-3">
        <span class="text-xs font-bold text-on-surface-variant w-24 flex-shrink-0">活動頻度</span>
        <span class="text-sm text-on-surface">月2〜3回のイベント + 定例ミーティング</span>
      </div>
    </div>
  </div>
</section>

<!-- メンバー紹介 -->
<section class="mb-10">
  <h3 class="text-xl font-bold font-headline mb-6 flex items-center gap-2">
    <span class="w-1 h-6 bg-primary-container rounded-full"></span>
    運営メンバー
  </h3>
  <div class="grid grid-cols-2 gap-4">
    <div class="bg-surface-container-lowest p-4 rounded-2xl shadow-sm text-center scroll-reveal" style="transition-delay: 0ms;">
      <div class="w-20 h-20 mx-auto rounded-full overflow-hidden mb-3 bg-surface-container-low">
        <img src="/images/about/mori.jpg" alt="森 大輝" class="w-full h-full object-cover" />
      </div>
      <span class="block text-[10px] font-bold text-primary tracking-widest uppercase mb-1">代表</span>
      <p class="font-bold text-sm">森 大輝</p>
    </div>
    <div class="bg-surface-container-lowest p-4 rounded-2xl shadow-sm text-center scroll-reveal" style="transition-delay: 100ms;">
      <div class="w-20 h-20 mx-auto rounded-full overflow-hidden mb-3 bg-surface-container-low">
        <img src="/images/about/ishibashi.jpg" alt="石橋 美咲" class="w-full h-full object-cover" />
      </div>
      <span class="block text-[10px] font-bold text-on-surface-variant tracking-widest uppercase mb-1">副代表</span>
      <p class="font-bold text-sm">石橋 美咲</p>
    </div>
    <div class="bg-surface-container-lowest p-4 rounded-2xl shadow-sm text-center scroll-reveal" style="transition-delay: 200ms;">
      <div class="w-20 h-20 mx-auto rounded-full overflow-hidden mb-3 bg-surface-container-low">
        <img src="/images/about/yasui.jpg" alt="安井 翔太" class="w-full h-full object-cover" />
      </div>
      <span class="block text-[10px] font-bold text-on-surface-variant tracking-widest uppercase mb-1">イベント企画</span>
      <p class="font-bold text-sm">安井 翔太</p>
    </div>
    <div class="bg-surface-container-lowest p-4 rounded-2xl shadow-sm text-center scroll-reveal" style="transition-delay: 300ms;">
      <div class="w-20 h-20 mx-auto rounded-full overflow-hidden mb-3 bg-surface-container-low">
        <img src="/images/about/hayashi.jpg" alt="林 あかり" class="w-full h-full object-cover" />
      </div>
      <span class="block text-[10px] font-bold text-on-surface-variant tracking-widest uppercase mb-1">広報</span>
      <p class="font-bold text-sm">林 あかり</p>
    </div>
    <div class="bg-surface-container-lowest p-4 rounded-2xl shadow-sm text-center scroll-reveal col-span-2 max-w-[calc(50%-0.5rem)]" style="transition-delay: 400ms;">
      <div class="w-20 h-20 mx-auto rounded-full overflow-hidden mb-3 bg-surface-container-low">
        <img src="/images/about/komine.jpg" alt="小峰 健一" class="w-full h-full object-cover" />
      </div>
      <span class="block text-[10px] font-bold text-on-surface-variant tracking-widest uppercase mb-1">会計</span>
      <p class="font-bold text-sm">小峰 健一</p>
    </div>
  </div>
</section>

<!-- ミッション -->
<section class="mb-10">
  <h3 class="text-xl font-bold font-headline mb-6 flex items-center gap-2">
    <span class="w-1 h-6 bg-primary-container rounded-full"></span>
    ミッション
  </h3>
  <div class="bg-surface-container-lowest rounded-xl p-5 space-y-4">
    <p class="text-lg font-bold text-on-surface">大学生にチャンスを！</p>
    <p class="text-sm text-on-surface-variant leading-relaxed">ガクチャンは、大学生が社会に出る前に多様な経験と出会いを得られる場を提供します。キャリア、起業、スキルアップなど、あらゆる「チャンス」を届けることで、学生一人ひとりの可能性を広げます。</p>
    <div class="flex items-start gap-3">
      <span class="material-symbols-outlined text-primary flex-shrink-0 mt-0.5" style="font-size:20px;">flag</span>
      <div>
        <p class="text-sm font-bold text-on-surface">ビジョン</p>
        <p class="text-sm text-on-surface-variant">すべての大学生が自分の可能性に気づける社会をつくる</p>
      </div>
    </div>
    <div class="flex items-start gap-3">
      <span class="material-symbols-outlined text-secondary flex-shrink-0 mt-0.5" style="font-size:20px;">checklist</span>
      <div>
        <p class="text-sm font-bold text-on-surface">活動の柱</p>
        <ul class="text-sm text-on-surface-variant space-y-1 mt-1">
          <li>1. キャリア支援セミナーの開催</li>
          <li>2. 起業・ビジネス体験ワークショップ</li>
          <li>3. 企業と学生をつなぐ交流会</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- 沿革 -->
<section class="mb-10">
  <h3 class="text-xl font-bold font-headline mb-6 flex items-center gap-2">
    <span class="w-1 h-6 bg-primary-container rounded-full"></span>
    沿革
  </h3>
  <div class="space-y-6 relative before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-container-highest">
    <div class="relative pl-10">
      <div class="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white border-4 border-primary-container z-10"></div>
      <span class="block text-sm font-bold text-primary mb-1">2024年4月</span>
      <h4 class="font-bold text-sm mb-1">ガクチャン設立</h4>
      <p class="text-xs text-on-surface-variant">福岡の大学生5名で発足。「大学生にチャンスを」を合言葉に活動開始</p>
    </div>
    <div class="relative pl-10">
      <div class="absolute left-1.5 top-2 w-3 h-3 rounded-full bg-surface-container-highest z-10"></div>
      <span class="block text-sm font-bold text-on-surface-variant mb-1">2024年8月</span>
      <h4 class="font-bold text-sm mb-1">初のキャリアセミナー開催</h4>
      <p class="text-xs text-on-surface-variant">参加者20名。社会人メンター5名を招いて実施</p>
    </div>
    <div class="relative pl-10">
      <div class="absolute left-1.5 top-2 w-3 h-3 rounded-full bg-surface-container-highest z-10"></div>
      <span class="block text-sm font-bold text-on-surface-variant mb-1">2025年1月</span>
      <h4 class="font-bold text-sm mb-1">メンバー30名突破</h4>
      <p class="text-xs text-on-surface-variant">福岡大学・九州大学・西南学院大学など複数校から参加</p>
    </div>
    <div class="relative pl-10">
      <div class="absolute left-1.5 top-2 w-3 h-3 rounded-full bg-surface-container-highest z-10"></div>
      <span class="block text-sm font-bold text-on-surface-variant mb-1">2025年6月</span>
      <h4 class="font-bold text-sm mb-1">企業連携スタート</h4>
      <p class="text-xs text-on-surface-variant">福岡の企業10社と提携し、交流会・インターン紹介を開始</p>
    </div>
    <div class="relative pl-10">
      <div class="absolute left-1.5 top-2 w-3 h-3 rounded-full bg-surface-container-highest z-10"></div>
      <span class="block text-sm font-bold text-on-surface-variant mb-1">2026年3月</span>
      <h4 class="font-bold text-sm mb-1">メンバー50名・累計イベント参加者500名</h4>
      <p class="text-xs text-on-surface-variant">ウェブサイト公開、活動の輪が広がり続けています</p>
    </div>
  </div>
</section>

<!-- 活動拠点・アクセス -->
<section>
  <h3 class="text-xl font-bold font-headline mb-6 flex items-center gap-2">
    <span class="w-1 h-6 bg-primary-container rounded-full"></span>
    活動拠点・アクセス
  </h3>
  <div class="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
    <div class="w-full aspect-video">
      <iframe src="https://www.google.com/maps?q=福岡市中央区天神&output=embed&z=15" class="w-full h-full border-0" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    <div class="p-5">
      <h4 class="font-bold text-lg mb-2">天神エリア</h4>
      <p class="text-sm text-on-surface-variant mb-4 flex items-start gap-2">
        <span class="material-symbols-outlined text-base mt-0.5 text-primary">location_on</span>
        福岡市中央区天神（イベントにより会場は異なります）
      </p>
      <div class="flex items-center gap-4 py-3 border-t border-surface-container">
        <div class="flex-1">
          <span class="block text-[10px] text-on-surface-variant font-bold">定例ミーティング</span>
          <p class="text-sm font-bold">月1回（土曜日）</p>
        </div>
        <div class="flex-1 border-l border-surface-container pl-4">
          <span class="block text-[10px] text-on-surface-variant font-bold">イベント</span>
          <p class="text-sm font-bold">月2〜3回</p>
        </div>
      </div>
    </div>
  </div>
</section>
</main>

<style>
  .scroll-reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .scroll-reveal.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
</style>

<script>
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
</script>
</BaseLayout>
```

- [ ] **Step 2: ビルド確認**

Run: `npm run build`
Expected: ビルド成功

- [ ] **Step 3: コミット**

```bash
git add src/pages/about/index.astro
git commit -m "feat: 紹介ページをガクチャン用に全面書き換え"
```

---

### Task 7: お問い合わせページ・活動報告テキストの更新

**Files:**
- Modify: `src/pages/contact/index.astro`
- Modify: `src/pages/activities/index.astro` (テキストのみ)

- [ ] **Step 1: contact/index.astro を更新**

ページ全体をガクチャン用ダミー連絡先に差し替え:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
---
<BaseLayout title="お問い合わせ" activePage="contact">
<main class="pt-20 pb-32 px-4 max-w-2xl mx-auto w-full">
<!-- Page Header -->
<section class="mb-8 mt-4">
  <span class="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">Contact</span>
  <h2 class="font-headline text-3xl font-extrabold tracking-tight text-on-surface mb-2">お問い合わせ</h2>
  <p class="text-on-surface-variant text-sm leading-relaxed">活動内容やメンバー募集について、お気軽にお問い合わせください。</p>
</section>

<!-- Contact Card -->
<section class="mb-10">
  <div class="bg-surface-container-lowest rounded-xl p-6 shadow-sm space-y-5">
    <div class="text-center mb-2">
      <p class="font-bold text-lg text-on-surface">ガクチャン 運営事務局</p>
    </div>
    <div class="space-y-4">
      <a href="mailto:info@gakuchan.jp" class="flex items-center gap-4 p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
        <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
          <span class="material-symbols-outlined" style="font-size:20px;">mail</span>
        </div>
        <div>
          <p class="text-[10px] font-bold text-on-surface-variant">メール</p>
          <p class="text-sm font-bold text-on-surface">info@gakuchan.jp</p>
        </div>
      </a>
      <div class="flex items-center gap-4 p-4 rounded-xl bg-surface-container-low">
        <div class="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0">
          <span class="material-symbols-outlined" style="font-size:20px;">tag</span>
        </div>
        <div>
          <p class="text-[10px] font-bold text-on-surface-variant">SNS</p>
          <p class="text-sm font-bold text-on-surface">@gakuchan_fukuoka</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Message -->
<section>
  <div class="bg-surface-container-low rounded-xl p-6 text-center">
    <span class="material-symbols-outlined text-primary mb-2" style="font-size:32px;">chat</span>
    <p class="text-sm text-on-surface-variant leading-relaxed">活動への参加、メンバー募集、企業連携など、<br/>どうぞお気軽にご連絡ください。</p>
  </div>
</section>
</main>
</BaseLayout>
```

- [ ] **Step 2: activities/index.astro のテキストを更新**

line 25 の説明文: `福岡の街と共に歩む、私たちの奉仕活動の記録。` → `大学生の挑戦と成長の記録。`

- [ ] **Step 3: ビルド確認**

Run: `npm run build`
Expected: ビルド成功

- [ ] **Step 4: コミット**

```bash
git add src/pages/contact/index.astro src/pages/activities/index.astro
git commit -m "feat: お問い合わせ・活動報告ページをガクチャン用に更新"
```

---

### Task 8: スケジュールページのハードコード色の修正

**Files:**
- Modify: `src/pages/schedule/index.astro`

- [ ] **Step 1: 日曜日の色を更新**

line 51: `text-[#af000d]` → `text-[#2E5DB5]`（Primary に統一。日曜の赤は Lions 由来なので、ガクチャンではPrimary青に）

Note: ただし日本の慣習として日曜=赤は一般的なので、これはそのまま残してもよい。判断に迷うが、ガクチャンの Primary が青なので `#af000d` のハードコードだけ `#c62828`（一般的な赤）に変える。

line 51: `text-[#af000d]` → `text-[#c62828]`
line 164: `text-[#af000d]` → `text-[#c62828]`
line 50: `text-[#1d5fa8]` → `text-[#2E5DB5]`
line 164: `text-[#1d5fa8]` → `text-[#2E5DB5]`

- [ ] **Step 2: コミット**

```bash
git add src/pages/schedule/index.astro
git commit -m "fix: スケジュールページのハードコード色をガクチャンカラーに更新"
```

---

### Task 9: 最終ビルド確認・動作確認

- [ ] **Step 1: クリーンビルド**

Run: `npm run build`
Expected: ビルド成功、エラーなし

- [ ] **Step 2: dev サーバーで全ページ確認**

Run: `npm run dev`
確認項目:
- ホーム: ガクチャンロゴ、青/黄カラー、ダミーイベント表示
- 紹介: メンバー写真・ダミー情報表示
- カレンダー: 新カテゴリでイベント表示
- 活動報告: 3件のダミーイベントカード
- イベント詳細: 各ダミーイベントの詳細ページ
- お問い合わせ: ダミー連絡先
- 会員ページ: ログインUI表示

- [ ] **Step 3: コミット（必要に応じて修正を含む）**

```bash
git add -A
git commit -m "feat: ガクチャンへのサイトリブランド完了"
```
