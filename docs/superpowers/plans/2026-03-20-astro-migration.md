# Astro Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the Fukuoka Chuo Lions Club website from static HTML to Astro for component reuse and centralized event data management.

**Architecture:** Astro static site with shared layout components (Header, BottomNav, Footer). All event data in a single `events.json` — the schedule page, activities list, home page upcoming events, and activity detail pages all derive from this single source. Cloudflare Workers integration preserved for members password protection.

**Tech Stack:** Astro 5, Tailwind CSS 4, TypeScript, Cloudflare Workers (adapter)

---

## File Structure

```
/
├── public/                        # Static assets (unchanged by Astro)
│   ├── images/                    # All images (activities, about, logos)
│   ├── members/
│   │   └── documents/             # Protected PDFs
│   ├── manifest.json
│   ├── apple-touch-icon.png
│   ├── icon-192.png
│   └── icon-512.png
├── src/
│   ├── data/
│   │   └── events.json            # Single source of truth for all events
│   ├── layouts/
│   │   └── BaseLayout.astro       # HTML skeleton, head, header, footer, nav
│   ├── components/
│   │   ├── Header.astro           # Logo + club name + lock icon
│   │   ├── BottomNav.astro        # 5-tab navigation (active tab via prop)
│   │   ├── Footer.astro           # © 2026 copyright
│   │   ├── GallerySlider.astro    # 2-up grid + swipe slider with dots/arrows
│   │   ├── EventCard.astro        # Activity card (used in activities list + home)
│   │   └── RelatedActivities.astro # "他の活動を見る" section with "すべて見る" link
│   ├── pages/
│   │   ├── index.astro            # Home page
│   │   ├── about/index.astro
│   │   ├── activities/index.astro
│   │   ├── schedule/index.astro
│   │   ├── contact/index.astro
│   │   ├── members/index.astro    # Login form (public)
│   │   ├── members/dashboard.astro # Document list (protected by Worker)
│   │   └── events/[slug].astro    # Dynamic activity detail pages
│   └── index.js                   # Cloudflare Worker entry (password protection)
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
└── wrangler.jsonc
```

**Key design decisions:**
- `events.json` is the single source of truth. Adding an event = adding 1 JSON entry + photos
- Activity detail pages use `[slug].astro` dynamic routes generated from events.json
- Worker entry point (`src/index.js`) stays for Cloudflare password protection
- `public/` holds images/PDFs/PWA assets — Astro copies these as-is

---

### Task 1: Initialize Astro project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`
- Modify: `wrangler.jsonc`
- Delete: old `public/*.html` files (after migration complete)

- [ ] **Step 1: Initialize Astro with Tailwind and Cloudflare adapter**

```bash
cd /Users/kentaro.mori/Desktop/repos/hoshuto/lions-hp
npm create astro@latest . -- --template minimal --no-install --no-git
npm install
npx astro add tailwind cloudflare
```

- [ ] **Step 2: Configure astro.config.mjs**

```javascript
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  }
});
```

- [ ] **Step 3: Update wrangler.jsonc**

```jsonc
{
  "name": "fukuoka-lions-home-page",
  "compatibility_date": "2025-12-06",
  "main": "src/index.js",
  "assets": {
    "directory": "./dist",
    "binding": "ASSETS"
  }
}
```

- [ ] **Step 4: Create base CSS**

Create `src/styles/global.css`:
```css
@import "tailwindcss";
```

- [ ] **Step 5: Verify Astro builds**

```bash
npm run build
```
Expected: `dist/` directory created with default page

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: initialize Astro project with Tailwind and Cloudflare"
```

---

### Task 2: Create events.json data file

**Files:**
- Create: `src/data/events.json`

- [ ] **Step 1: Create events.json with all event data**

Every event in one place. Events with `content` field have detail pages. Events without are schedule-only.

```json
[
  {
    "slug": "sakura-festa",
    "date": "2026-04-07",
    "title": "さくらフェスタ",
    "category": "イベント",
    "desc": "春の恒例イベント。桜の下で地域の皆さんと交流します。",
    "location": "福岡市中央区",
    "imageDir": "2026-04-07_sakura-festa",
    "heroImage": "schedule.jpg",
    "photos": ["schedule.jpg"],
    "content": {
      "sections": [
        { "icon": "park", "color": "primary", "title": "イベントの概要", "text": "さくらフェスタは..." },
        { "icon": "event_note", "color": "secondary", "title": "イベントスケジュール", "scheduleImage": true },
        { "icon": "celebration", "color": "tertiary", "title": "開催内容", "text": "当日は満開の桜のもとで..." }
      ],
      "voice": "「桜の下で地域の方々と触れ合えるこのイベントは...」"
    },
    "youtube": null
  },
  {
    "slug": "christmas",
    "date": "2025-12-16",
    "title": "クリスマス例会",
    "category": "例会",
    "desc": "年末恒例のクリスマス例会。会員同士の親睦を深め、一年の活動を振り返りました。",
    "location": "福岡市中央区",
    "imageDir": "2025-12-16_christmas",
    "heroImage": "christmas01.jpg",
    "photos": ["christmas01.jpg","christmas02.jpg","christmas03.jpg","christmas04.jpg","christmas05.jpg","christmas06.jpg","christmas07.jpg","christmas08.jpg"],
    "gridPhotos": ["christmas02.jpg","christmas03.jpg"],
    "sliderPhotos": ["christmas04.jpg","christmas05.jpg","christmas06.jpg","christmas07.jpg","christmas08.jpg"],
    "content": {
      "sections": [
        { "icon": "history_edu", "color": "primary", "title": "例会の概要", "text": "クリスマス例会は..." },
        { "icon": "celebration", "color": "secondary", "title": "当日の様子", "text": "当日は会長挨拶に始まり..." }
      ],
      "voice": "「今年も皆さんと一緒に年末を締めくくることができ...」"
    },
    "youtube": null
  },
  {
    "slug": "new-member",
    "date": "2025-11-04",
    "title": "新会員入会式",
    "category": "例会",
    "desc": "新たな仲間を迎える入会式を執り行いました。",
    "location": "福岡市中央区",
    "imageDir": "2025-11-04_new-member",
    "heroImage": "new-member01.jpg",
    "photos": ["new-member01.jpg","new-member02.jpg","new-member03.jpg","new-member04.jpg","new-member05.jpg"],
    "gridPhotos": ["new-member02.jpg","new-member03.jpg"],
    "sliderPhotos": ["new-member04.jpg","new-member05.jpg"],
    "content": {
      "sections": [
        { "icon": "history_edu", "color": "primary", "title": "入会式の概要", "text": "..." },
        { "icon": "groups", "color": "secondary", "title": "当日の様子", "text": "..." }
      ],
      "voice": "「この度、福岡中央ライオンズクラブに入会させていただき...」"
    },
    "youtube": null
  },
  {
    "slug": "noryo",
    "date": "2025-08-20",
    "title": "納涼例会",
    "category": "例会",
    "desc": "夏の暑さを忘れるひととき。会員同士の親睦を深めました。",
    "location": "福岡市中央区",
    "imageDir": "2025-08-20_noryo",
    "heroImage": "noryo01.jpg",
    "photos": ["noryo01.jpg","noryo02.jpg","noryo03.jpg","noryo04.jpg","noryo05.jpg","noryo06.jpg"],
    "gridPhotos": ["noryo02.jpg","noryo03.jpg"],
    "sliderPhotos": ["noryo04.jpg","noryo05.jpg","noryo06.jpg"],
    "content": {
      "sections": [
        { "icon": "celebration", "color": "primary", "title": "例会の概要", "text": "..." },
        { "icon": "groups", "color": "secondary", "title": "当日の様子", "text": "..." }
      ],
      "voice": "「毎年楽しみにしている納涼例会...」"
    },
    "youtube": null
  },
  {
    "slug": "60th-anniversary",
    "date": "2023-03-29",
    "title": "結成60周年式典",
    "category": "式典",
    "desc": "福岡中央ライオンズクラブ結成60周年を祝う式典を開催しました。",
    "location": "福岡市中央区",
    "imageDir": "2023-03-29_60th-anniversary",
    "heroImage": "anniversary01.jpg",
    "photos": ["anniversary01.jpg","anniversary02.jpg","anniversary03.jpg","anniversary04.jpg","anniversary05.jpg"],
    "gridPhotos": ["anniversary02.jpg","anniversary03.jpg"],
    "sliderPhotos": ["anniversary04.jpg","anniversary05.jpg"],
    "content": {
      "sections": [
        { "icon": "history_edu", "color": "primary", "title": "式典の概要", "text": "..." },
        { "icon": "celebration", "color": "secondary", "title": "当日の様子", "text": "..." }
      ],
      "voice": "「60年という節目を、こうして皆さんと一緒に祝うことができて...」"
    },
    "youtube": "MVawcIUKJgc"
  },
  { "date": "2026-04-01", "title": "4月度第一例会", "category": "例会", "desc": "4月度第一例会を開催します。" },
  { "date": "2026-03-18", "title": "3月度第二例会", "category": "例会", "desc": "3月度第二例会を開催します。" },
  { "date": "2026-03-04", "title": "3月度第一例会", "category": "例会", "desc": "3月度第一例会を開催します。" },
  { "date": "2026-02-18", "title": "2月度第二例会", "category": "例会", "desc": "2月度第二例会を開催します。" },
  { "date": "2026-02-04", "title": "2月度第一例会", "category": "例会", "desc": "2月度第一例会を開催します。" },
  { "date": "2026-01-21", "title": "1月度第二例会", "category": "例会", "desc": "1月度第二例会を開催します。" }
]
```

- [ ] **Step 2: Commit**

```bash
git add src/data/events.json
git commit -m "feat: add centralized events.json data file"
```

---

### Task 3: Create shared layout and components

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Header.astro`
- Create: `src/components/BottomNav.astro`
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Create Header.astro**

Props: none. Renders logo + club name + lock icon. All pages use same header.

- [ ] **Step 2: Create BottomNav.astro**

Props: `activePage: 'home' | 'schedule' | 'activities' | 'about' | 'contact' | 'none'`

Renders 5-tab nav with active state applied based on prop.

- [ ] **Step 3: Create Footer.astro**

No props. Just `© 2026 福岡中央ライオンズクラブ`.

- [ ] **Step 4: Create BaseLayout.astro**

Props: `title: string`, `activePage: string`

Wraps Header + slot + Footer + BottomNav. Includes all `<head>` meta (Tailwind, fonts, Material Symbols, PWA manifest, theme-color).

- [ ] **Step 5: Verify build compiles**

```bash
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add src/layouts/ src/components/
git commit -m "feat: add shared layout and nav components"
```

---

### Task 4: Create reusable event components

**Files:**
- Create: `src/components/EventCard.astro`
- Create: `src/components/GallerySlider.astro`
- Create: `src/components/RelatedActivities.astro`

- [ ] **Step 1: Create EventCard.astro**

Props: `event`, `size: 'large' | 'small'`. Used in activities list and home page.

- [ ] **Step 2: Create GallerySlider.astro**

Props: `imageDir`, `gridPhotos`, `sliderPhotos`. Renders 2-up grid + swipe slider with dots and arrow buttons.

- [ ] **Step 3: Create RelatedActivities.astro**

Props: `currentSlug`, `events`. Shows 2 related events with "すべて見る" link.

- [ ] **Step 4: Commit**

```bash
git add src/components/
git commit -m "feat: add EventCard, GallerySlider, RelatedActivities components"
```

---

### Task 5: Migrate pages (Home, Schedule, Activities, About, Contact)

**Files:**
- Create: `src/pages/index.astro` (home)
- Create: `src/pages/about/index.astro`
- Create: `src/pages/activities/index.astro`
- Create: `src/pages/schedule/index.astro`
- Create: `src/pages/contact/index.astro`

- [ ] **Step 1: Create home page** — hero slideshow, upcoming schedule from events.json, latest activities from events.json, membership CTA
- [ ] **Step 2: Create schedule page** — calendar rendered from events.json (JS stays client-side)
- [ ] **Step 3: Create activities page** — cards + filter + load-more from events.json
- [ ] **Step 4: Create about page** — club info, officers, history, venue
- [ ] **Step 5: Create contact page** — contact info card
- [ ] **Step 6: Verify all pages build and render**

```bash
npm run dev
```

- [ ] **Step 7: Commit**

```bash
git add src/pages/
git commit -m "feat: migrate all main pages to Astro"
```

---

### Task 6: Migrate activity detail pages (dynamic routes)

**Files:**
- Create: `src/pages/events/[slug].astro`

- [ ] **Step 1: Create dynamic route**

Uses `getStaticPaths()` to generate pages from events.json (only entries with `content` field). Each page renders hero, content sections, gallery, youtube embed, related activities.

- [ ] **Step 2: Verify all detail pages generate**

```bash
npm run build
ls dist/events/
```

Expected: `christmas/`, `new-member/`, `noryo/`, `60th-anniversary/`, `sakura-festa/` directories

- [ ] **Step 3: Update all internal links**

Old: `/activity_detail/christmas.html` → New: `/events/christmas/`

Update events.json links and any hardcoded references.

- [ ] **Step 4: Commit**

```bash
git add src/pages/events/ src/data/events.json
git commit -m "feat: add dynamic activity detail pages from events.json"
```

---

### Task 7: Members pages + Worker

**Files:**
- Create: `src/pages/members/index.astro` (login form)
- Create: `src/pages/members/dashboard.astro` (document list)
- Keep: `src/index.js` (Worker password protection)

- [ ] **Step 1: Create members login page**
- [ ] **Step 2: Create members dashboard page**
- [ ] **Step 3: Verify Worker still works with new dist/ output**

```bash
npm run build
npx wrangler dev
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/members/
git commit -m "feat: migrate members pages to Astro"
```

---

### Task 8: Cleanup and PR

**Files:**
- Delete: `public/*.html` (all old static HTML files)
- Delete: `public/home/`, `public/about/`, `public/activities/`, etc.

- [ ] **Step 1: Remove old static HTML files**

```bash
rm -rf public/about public/activities public/activity_detail public/contact public/home public/members/index.html public/members/dashboard.html public/schedule public/index.html
```

- [ ] **Step 2: Final build verification**

```bash
npm run build
```

- [ ] **Step 3: Commit and create PR**

```bash
git add -A
git commit -m "chore: remove old static HTML files"
gh pr create --title "feat: Astro migration" --body "..."
```
