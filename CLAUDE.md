# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A mystical Tarot card divination web app built with React + TypeScript + Vite. Users input a question, select 3 cards from a fan of 78 tarot cards, and receive AI-powered interpretations via DeepSeek API.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production (runs TypeScript check first)
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Architecture

### Flow
1. **Input Phase** - User enters a question
2. **Selection Phase** - 78 cards displayed in fan layout; user clicks to select 3
3. **Flip Phase** - Selected card flips from back to front (center screen overlay)
4. **Result Phase** - 3 cards shown with positions (past/present/challenge), optional AI analysis

### Key Files
- `src/App.tsx` - Main component with all state and UI logic
- `src/App.css` - All styling including fan layout, flip animation, starfield background
- `src/data/tarotData.ts` - 78 tarot card definitions (22 Major + 56 Minor Arcana)
- `src/api/deepseek.ts` - DeepSeek API integration for AI card interpretation
- `public/tarot/` - Card images (card-back.png + 78 card images named `{卡牌名称}.png`)

### Card Data Structure
```typescript
interface TarotCard {
  id: number;           // 0-77
  name: string;         // e.g., '愚人', '宝剑八'
  nameEn: string;       // e.g., 'The Fool', 'Eight of Swords'
  image: string;        // e.g., '/tarot/愚人.png'
  meaning: string;      // upright meaning
  meaningReversed: string;
  type: 'major' | 'minor';
  suit?: string;        // 'wands' | 'cups' | 'swords' | 'pentacles'
}
```

### Fan Layout Implementation
78 cards positioned using absolute positioning with CSS custom property `--rotation`:
- Spread angle: 100 degrees
- Radius: 560px from center
- Each card rotates via `transform: rotate(var(--rotation))`

### Flip Animation
CSS 3D flip using `backface-visibility: hidden` on two faces (back/front) within a perspective container. Triggered by adding `.flipping` class to `.flip-card-inner`.

## Card Image Requirements
- Card back: `public/tarot/card-back.png`
- Card fronts: `public/tarot/{name}.png` (e.g., `宝剑八.png`, `愚人.png`)