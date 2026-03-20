# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for **Fukuoka Chuo Lions Club** (福岡中央ライオンズクラブ). The site is a mobile-first, Japanese-language homepage built with standalone HTML files and Tailwind CSS via CDN.

## Architecture

- **No build system or package manager** — each page is a self-contained `code.html` file loaded via Tailwind CDN (`cdn.tailwindcss.com`)
- All pages live under `stitch/` with naming convention: `{page}_{version}/code.html` (e.g., `home_1/`, `home_2/`, `home_link_fixed/`). Each directory also contains a `screen.png` screenshot of the design.
- Pages: **home**, **about**, **activities**, **activity_detail**
- Suffixed `_link_fixed` directories contain the navigation-corrected versions (latest iteration)

## Tech Stack

- **Tailwind CSS** (CDN, with forms and container-queries plugins)
- **Google Fonts**: Plus Jakarta Sans, Noto Sans JP, Inter
- **Material Symbols Outlined** for icons
- Custom Tailwind config is inline in each HTML file's `<script id="tailwind-config">` block

## Design System

Defined in `stitch/j_stream_mobile/DESIGN.md`. Key rules:

- **Color tokens** follow Material Design 3 naming (primary, secondary, tertiary, surface variants). Primary: `#af000d` (red), Secondary: `#1d5fa8` (blue), Tertiary: `#7d4900` (amber)
- **"No-Line" rule**: No 1px borders for sectioning — use background color shifts between surface tiers instead
- **Elevation**: Tonal layering over drop shadows. Use `surface-container-lowest` (#fff) on `surface-container-low` (#f6f3f2) for card lift
- **Typography**: Plus Jakarta Sans for headlines/display, Noto Sans JP for body Japanese text, Inter for labels
- **Components**: Glassmorphic bottom nav (85% opacity + backdrop-blur), rounded-xl cards, gradient CTAs, no divider lines inside cards
- **Text color**: Never use pure black (#000) — use `on-surface` (#1b1c1c)

## Development

To preview any page, open the `code.html` file directly in a browser — no server needed. The Tailwind config is embedded inline, so pages are fully self-contained.

## Language

Site content is in Japanese. The organization name is "福岡中央ライオンズクラブ" (Fukuoka Chuo Lions Club).
