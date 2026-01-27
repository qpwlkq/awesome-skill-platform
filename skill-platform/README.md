# Skill Platform - Frontend

A terminal-style skill sharing platform built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎨 Terminal/CLI-inspired dark theme
- 📝 Skill discovery and browsing
- ⭐ Star and fork skills
- 👤 User profiles with activity tracking
- 🔍 Search and filter capabilities
- 📱 Responsive design

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: JetBrains Mono

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
skill-platform/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Homepage (skill_discovery)
│   ├── skills/
│   │   ├── [id]/            # Skill detail page
│   │   └── new/             # Create skill page
│   └── profile/
│       └── [username]/      # User profile page
├── components/
│   ├── layout/              # Layout components
│   │   ├── Sidebar.tsx
│   │   └── Header.tsx
│   ├── ui/                  # Base UI components
│   └── skill/               # Skill-specific components
├── data/                    # Mock data
├── lib/                     # Utilities
├── types/                   # TypeScript types
└── public/                  # Static assets
```

## Design System

### Colors
- Background: `#0C0C0C` (page), `#1A1A1A` (card), `#1F1F1F` (surface)
- Primary: `#22C55E` (terminal green)
- Secondary: `#3B82F6` (blue), `#F59E0B` (amber), `#EF4444` (red)
- Text: `#E5E5E5` (primary), `#737373` (secondary), `#525252` (tertiary)

### Typography
- Font: JetBrains Mono (monospace)
- Base size: 12px
- Heading: 32px (h1), 16px (h2), 14px (h3)

### Spacing
- Border radius: 4px (consistent)
- Gap scale: 4px, 8px, 12px, 16px, 24px, 32px

## Pages

### 1. Homepage (`/`)
- Metric cards showing platform statistics
- Featured skills section
- All skills grid

### 2. Skill Detail (`/skills/[id]`)
- Skill information and documentation
- Statistics panel (stars, downloads, forks)
- Tags and author info

### 3. Create Skill (`/skills/new`)
- Form to create new skills
- Code editor for skill content
- Visibility and license settings

### 4. User Profile (`/profile/[username]`)
- User stats and bio
- Published/drafts/starred skills
- Activity log

## API Integration

To connect to the backend API:

1. Create `lib/api.ts`:
```typescript
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export const skillApi = {
  getAll: () => fetch(`${API_BASE}/skills`).then(r => r.json()),
  getBySlug: (slug: string) => fetch(`${API_BASE}/skills/${slug}`).then(r => r.json()),
  // ... more methods
};
```

2. Replace mock data with API calls in page components

## License

ISC
