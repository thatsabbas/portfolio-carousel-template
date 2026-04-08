# Portfolio Carousel Template

A modern, mobile-first personal portfolio built with React, TypeScript, Tailwind CSS, and animated gradient backgrounds via [@firecms/neat](https://neat.firecms.co).

## Features

- Swipeable tile carousel with animated gradient backgrounds
- Modal popups with card-based layouts and swipe-to-dismiss (horizontal + vertical)
- Dark/light mode toggle
- Responsive design (mobile-first with desktop arrow navigation)
- Video modal with mute/unmute controls
- Customizable gradient configs per tile

## Getting Started

### 1. Use this template

Click **"Use this template"** on GitHub to create your own copy.

### 2. Install dependencies

```bash
npm install
```

### 3. Start the dev server

```bash
npm run dev
```

### 4. Customize with your info

**`src/pages/Index.tsx`** — Update your name and bio text:
- Replace `FIRST` and `LASTNAME` with your name
- Update the intro paragraph with your own bio
- Add your own video to `public/videos/` and update the `src` path

**`src/components/TileCarousel.tsx`** — Update tile content:
- **What I Do**: Edit skills, descriptions, and step cards
- **Where I've Been**: Replace the `careerTimeline` array with your career history
- **What I Achieved**: Update patents, awards, publications
- **Podcasts**: Add your favorite podcasts with artwork URLs
- **Let's Connect**: Replace social media URLs with your own links

### 5. Customize gradients

Each tile has its own `NeatGradient` config object (e.g. `neatConfig`, `neatConfigWhereIveBeen`). Visit [neat.firecms.co](https://neat.firecms.co) to design your own gradients and paste the config.

## Tech Stack

- [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- [@firecms/neat](https://neat.firecms.co) for animated gradient backgrounds
- [Vite](https://vitejs.dev) for build tooling
- [Radix UI](https://www.radix-ui.com) for accessible dialog components

## License

MIT - Feel free to use this template for your own portfolio!
