# Fomi AI Image Generator UI

A polished Next.js frontend implementation of the Fomi AI image-generation interface. The project focuses on closely matching the provided assignment mockup while adding small usability improvements such as clickable generation history and multi-prompt result accumulation.

## Live Demo

**Vercel Deployment:** `fomi-theta.vercel.app`


## Overview

This app recreates an AI media generation workspace with a prompt panel, media output grid, prompt context controls, top navigation, and a history rail. The generation flow is mocked locally, so the UI can be reviewed without connecting to a real AI image-generation API.

The goal of this project is not just to build a working interface, but to make the final result feel close to the original design in spacing, layout, color, and interaction behavior.

## Features

- Pixel-focused implementation based on the provided design
- Prompt input area for generating media results
- Mock generation flow using local sample media
- Multiple prompts can be submitted and shown in the results area
- Clickable history images for revisiting previous generations
- Top navigation with dropdown-based controls
- Prompt context/settings card for generation options
- Responsive layout built with reusable components
- Local mock data, no backend setup required
- Clean component-based structure for maintainability

## Tech Stack

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui-style components**
- **pnpm**

## Project Structure

```txt
.
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── GenerationWorkbench.tsx
│   │   ├── HistoryRail.tsx
│   │   ├── MediaGrid.tsx
│   │   ├── PromptContextCard.tsx
│   │   ├── PromptPanel.tsx
│   │   ├── TopNav.tsx
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── popover.tsx
│   │       └── select.tsx
│   ├── data/
│   │   └── media.ts
│   └── lib/
│       ├── dropdowns.ts
│       ├── mockGenerate.ts
│       └── utils.ts
├── components.json
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── postcss.config.mjs
└── tsconfig.json
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/eashah-uwu/Fomi/
cd Fomi
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Run the development server

```bash
pnpm dev
```

Open the app in your browser:

```txt
http://localhost:3000
```

## Available Scripts

### Start the development server

```bash
pnpm dev
```

Runs the app in development mode.

### Create a production build

```bash
pnpm build
```

Creates an optimized production build.

### Run the production build locally

```bash
pnpm start
```

Starts the production version of the app locally.

### Run linting

```bash
pnpm lint
```

Runs lint checks for the project.

## Implementation Notes

The app is intentionally frontend-only for the assignment. Instead of calling an external image-generation API, the project uses local mock generation logic through `src/lib/mockGenerate.ts` and sample media data from `src/data/media.ts`.

This keeps the project easy to run, easy to review, and simple to deploy without requiring API keys or backend setup.

The UI is split into focused components:

- `TopNav.tsx` handles the main navigation and dropdown controls.
- `PromptPanel.tsx` handles the main prompt input area.
- `PromptContextCard.tsx` displays generation options and prompt context.
- `MediaGrid.tsx` displays generated media results.
- `HistoryRail.tsx` displays previous generations.
- `GenerationWorkbench.tsx` ties the main interface together.

## Bonus Work

The assignment asked for the implementation to match the design closely. In addition to that, the project includes a few small interactive improvements:

- History images are clickable.
- Multiple prompt submissions can remain visible in the results area.
- The result panel updates with mock generated media.
- UI primitives are reusable across dropdowns, popovers, selects, and buttons.
- The interface is structured to feel closer to a real creative tool instead of a static mockup.

## Author

**Eashah Emaan**
