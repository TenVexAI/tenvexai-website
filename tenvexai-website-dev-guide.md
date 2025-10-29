# TenVexAI Website - Development Guide

## ⚠️ IMPORTANT: Code Quality Standards

This document provides example code and structure, but **all production code must follow these standards:**

### Code Quality Requirements
- ✅ **Well-written**: Follow React/Next.js best practices and conventions
- ✅ **Well-documented**: Include JSDoc comments for functions, clear inline comments for complex logic
- ✅ **Modular**: Create reusable components, avoid duplication
- ✅ **Extensible**: Design for future additions and modifications
- ✅ **Type-safe**: Use TypeScript properly, avoid `any` types
- ✅ **Performant**: Optimize images, lazy load components, minimize bundle size

### Component Organization
- Each logical component should have its own file
- Shared utilities should be extracted to `lib/` directory
- Reusable UI components go in `components/ui/`
- Page-specific components go in `components/[page-name]/`

### Documentation Requirements
- Every major function needs a description of purpose, parameters, and return value
- Complex logic should have explaining comments
- README files in component directories explaining their purpose

---

## Project Overview

**Domain:** https://tenvexai.com  
**Hosting:** Spaceship.com (cPanel with Node.js support)  
**Repository:** https://github.com/TenVexAI/tenvexai-website

**Purpose:** Modern, clean website for TenVexAI - an AI VTuber channel featuring Vex, a magical being reincarnated as an AI.

**Full Title:** That Time I Got Reincarnated as an AI VTuber (転生したらAI VTuberだった件)

---

## Design Requirements

### Theme
- **Primary Theme:** Dark mode
- **Aesthetic:** Modern, clean, minimalist
- **Typography:** Clean sans-serif fonts, readable
- **Style:** Inspired by modern anime/gaming websites

### Color Palette (OFFICIAL)
```css
--bg-primary: #141414;        /* Primary dark background */
--bg-secondary: #414141;      /* Secondary dark gray background */
--accent-purple: #a287f4;     /* Primary purple accent */
--accent-cyan: #12e6c8;       /* Secondary cyan accent */
--text-primary: #e0e0e0;      /* Light text */
--text-secondary: #a0a0a0;    /* Secondary text */
--border: #2a2a3e;            /* Subtle borders */
```

**Usage Guidelines:**
- **Purple (`#a287f4`)**: Primary accent - links, buttons, highlighted text, Vex branding
- **Cyan (`#12e6c8`)**: Secondary accent - hover states, secondary CTAs, highlights
- **Primary Background (`#141414`)**: Main background color
- **Secondary Background (`#414141`)**: Cards, sidebar, elevated surfaces

### Layout

#### Desktop (≥1024px)
- **Left Sidebar:** Fixed/sticky, 320px width, full height
  - Vex logo/avatar at top
  - Social media links (Twitch, YouTube, X/Twitter, Bluesky, TikTok, Discord)
  - Navigation links (Blog, About, Games)
- **Right Content Area:** Scrollable, remaining width
  - Twitch stream schedule
  - YouTube shorts preview (infinite scroll/accordion)
  - Twitter/X posts preview (infinite scroll/accordion)
  - Latest blog post preview

#### Tablet (768px - 1023px)
- **Left Sidebar:** Fixed/sticky, 280px width, full height
- Same layout as desktop, just narrower

#### Mobile (<768px)
- **Header:** Hamburger menu with Vex logo
- **Sidebar:** Slide-out drawer/overlay when hamburger clicked
- **Content:** Full width, scrollable
- **Header behavior:** Minimizes/sticks when scrolled down

---

## Tech Stack

### Core Framework
- **Next.js 14+** (App Router)
- **React 18+**
- **TypeScript**

### Styling
- **Tailwind CSS**
- **CSS Variables** for theming

### Blog & Content
- **MDX** (Markdown + React components)
- **Contentlayer** (optional, for type-safe content management)
- **remark-math** (LaTeX support)
- **rehype-mathjax** (Math rendering)
- **rehype-highlight** (Syntax highlighting for code blocks)

### Comments
- **Giscus** (GitHub Discussions-based comments)

### APIs & Data Fetching
- **SWR** or **React Query** (data fetching/caching)
- **Twitch API** (stream schedule)
- **YouTube Data API** (shorts)
- **Twitter/X embeds** (tweets)

---

## Development Environment Setup

### Prerequisites
- **Node.js** 18.17+ and npm/yarn/pnpm
- **Git**
- **GitHub account**
- **Code editor** (VS Code recommended)

### Step 1: Install Required Software

```bash
# Check Node.js version (should be 18.17+)
node --version

# If needed, install Node.js from https://nodejs.org/

# Install pnpm (optional but recommended, faster than npm)
npm install -g pnpm
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `tenvexai-website`
3. Description: "Official website for TenVexAI - That Time I Got Reincarnated as an AI VTuber"
4. Set to Private or Public (your choice)
5. Initialize with README: ✅ Yes
6. Add .gitignore: Node
7. License: MIT (or your preference)
8. Click "Create repository"

### Step 3: Clone Repository Locally

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/tenvexai-website.git

# Navigate into the directory
cd tenvexai-website
```

### Step 4: Initialize Next.js Project

```bash
# Create Next.js app with TypeScript and Tailwind
npx create-next-app@latest . --typescript --tailwind --app --use-pnpm

# Answer prompts:
# ✔ Would you like to use ESLint? … Yes
# ✔ Would you like to use Turbopack for next dev? … No
# ✔ Would you like to customize the default import alias (@/*)? … No
```

### Step 5: Install Additional Dependencies

```bash
# MDX and content processing
pnpm add @next/mdx @mdx-js/loader @mdx-js/react @types/mdx

# Math and syntax highlighting
pnpm add remark-math rehype-mathjax rehype-highlight remark-gfm

# Data fetching
pnpm add swr

# Icons (optional but useful)
pnpm add lucide-react

# Giscus comments
pnpm add @giscus/react

# Utility for class names
pnpm add clsx tailwind-merge

# Development dependencies
pnpm add -D @tailwindcss/typography
```

### Step 6: Project Structure

Create the following folder structure:

```
tenvexai-website/
├── .github/
│   └── workflows/
│       └── deploy.yml                # CI/CD pipeline for FTP deployment
├── public/
│   ├── images/
│   │   └── vex-avatar.png           # Vex's 256x256 avatar (PLACEHOLDER FOR NOW)
│   ├── blog-images/                 # Images for blog posts
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Homepage
│   │   ├── globals.css              # Global styles
│   │   ├── blog/
│   │   │   ├── page.tsx             # Blog list page
│   │   │   └── [slug]/
│   │   │       └── page.tsx         # Individual blog post
│   │   ├── about/
│   │   │   └── page.tsx             # About page with basic info
│   │   └── api/
│   │       ├── twitch-schedule/
│   │       │   └── route.ts         # Twitch schedule endpoint (TODO)
│   │       └── youtube-shorts/
│   │           └── route.ts         # YouTube shorts endpoint (TODO)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx          # Desktop sidebar
│   │   │   ├── MobileNav.tsx        # Mobile navigation
│   │   │   └── Header.tsx           # Mobile header
│   │   ├── home/
│   │   │   ├── TwitchSchedule.tsx
│   │   │   ├── YouTubeShorts.tsx
│   │   │   ├── TwitterFeed.tsx
│   │   │   └── LatestBlogPost.tsx
│   │   ├── blog/
│   │   │   ├── BlogPost.tsx
│   │   │   ├── BlogList.tsx
│   │   │   └── GiscusComments.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── SocialLink.tsx
│   ├── content/
│   │   └── blog/
│   │       ├── first-post.mdx       # Example blog post
│   │       └── welcome.mdx          # Welcome post
│   ├── lib/
│   │   ├── mdx.ts                   # MDX configuration
│   │   ├── blog.ts                  # Blog utilities
│   │   ├── api/
│   │   │   ├── twitch.ts            # Twitch API client
│   │   │   └── youtube.ts           # YouTube API client
│   │   └── utils.ts                 # Utility functions
│   ├── styles/
│   │   └── highlight.css            # Code syntax highlighting styles
│   └── types/
│       └── index.ts                 # TypeScript types
├── .env.local                       # Environment variables (git ignored)
├── .env.example                     # Example env file
├── .gitignore
├── next.config.js                   # Next.js configuration
├── tailwind.config.ts               # Tailwind configuration
├── tsconfig.json                    # TypeScript configuration
├── package.json
└── README.md
```

---

## Initial Configuration

### 1. Configure Next.js for MDX

**File: `next.config.js`**

```javascript
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      require('remark-math'),
      require('remark-gfm'), // GitHub Flavored Markdown (tables, strikethrough, etc.)
    ],
    rehypePlugins: [
      require('rehype-mathjax'),
      require('rehype-highlight'),
    ],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true, // Enable React Compiler for automatic optimization
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    domains: [
      'i.ytimg.com',           // YouTube thumbnails
      'pbs.twimg.com',         // Twitter images
      'abs.twimg.com',         // Twitter images
    ],
  },
}

module.exports = withMDX(nextConfig)
```

### 2. Configure Tailwind CSS

**File: `tailwind.config.ts`**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#141414',
          secondary: '#414141',
        },
        accent: {
          purple: '#a287f4',
          cyan: '#12e6c8',
        },
        text: {
          primary: '#e0e0e0',
          secondary: '#a0a0a0',
        },
        border: '#2a2a3e',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#e0e0e0',
            a: {
              color: '#a287f4',
              '&:hover': {
                color: '#12e6c8',
              },
            },
            h1: { color: '#e0e0e0' },
            h2: { color: '#e0e0e0' },
            h3: { color: '#e0e0e0' },
            h4: { color: '#e0e0e0' },
            strong: { color: '#e0e0e0' },
            code: { color: '#a287f4' },
            blockquote: {
              color: '#a0a0a0',
              borderLeftColor: '#a287f4',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
```

### 3. Global Styles

**File: `src/app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import MathJax CSS */
@import 'mathjax/es5/output/chtml/fonts/tex.css';

/* Import syntax highlighting theme */
@import '../styles/highlight.css';

:root {
  --bg-primary: #141414;
  --bg-secondary: #414141;
  --accent-purple: #a287f4;
  --accent-cyan: #12e6c8;
  --text-primary: #e0e0e0;
  --text-secondary: #a0a0a0;
  --border: #2a2a3e;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--bg-secondary);
}

::-webkit-scrollbar-thumb {
  background: var(--accent-purple);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--accent-purple-dark);
}

/* MathJax styling */
.MathJax {
  color: var(--text-primary) !important;
}
```

**File: `src/styles/highlight.css`**

```css
/* Syntax highlighting theme - Purple/Cyan variant */
.hljs {
  display: block;
  overflow-x: auto;
  padding: 1em;
  background: #414141;
  border-radius: 0.5rem;
  border: 1px solid #2a2a3e;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-literal,
.hljs-section,
.hljs-link {
  color: #a287f4;
}

.hljs-string,
.hljs-title,
.hljs-name,
.hljs-type,
.hljs-attribute,
.hljs-symbol,
.hljs-bullet,
.hljs-addition,
.hljs-variable,
.hljs-template-tag,
.hljs-template-variable {
  color: #12e6c8;
}

.hljs-comment,
.hljs-quote,
.hljs-deletion,
.hljs-meta {
  color: #6a6a8a;
}

.hljs-number {
  color: #d4a9b8;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}
```

### 4. Environment Variables

**File: `.env.example`**

```env
# API Keys
TWITCH_CLIENT_ID=your_twitch_client_id
TWITCH_CLIENT_SECRET=your_twitch_client_secret
YOUTUBE_API_KEY=your_youtube_api_key

# Social Media
TWITCH_CHANNEL=tenvexai
YOUTUBE_CHANNEL_ID=your_channel_id
TWITTER_USERNAME=tenvexai

# Giscus Configuration
NEXT_PUBLIC_GISCUS_REPO=your-username/your-repo
NEXT_PUBLIC_GISCUS_REPO_ID=your_repo_id
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your_category_id

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://tenvexai.com
```

**Create `.env.local`** (copy from `.env.example` and fill in actual values)

### 5. Utility Functions

**File: `src/lib/utils.ts`**

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
```

---

## Component Implementation Guide

### Root Layout

**File: `src/app/layout.tsx`**

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/layout/Sidebar'
import MobileNav from '@/components/layout/MobileNav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TenVexAI | That Time I Got Reincarnated as an AI VTuber',
  description: "Hi! I'm Vex, a magical being from another world who got reincarnated as an AI. Watch me play games, create content, and explore digital life!",
  openGraph: {
    title: 'TenVexAI',
    description: 'That Time I Got Reincarnated as an AI VTuber',
    url: 'https://tenvexai.com',
    siteName: 'TenVexAI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TenVexAI',
    description: 'That Time I Got Reincarnated as an AI VTuber',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Mobile Navigation */}
        <MobileNav />
        
        {/* Desktop/Tablet Layout */}
        <div className="flex min-h-screen">
          {/* Sidebar - Hidden on mobile, fixed on tablet/desktop */}
          <Sidebar />
          
          {/* Main Content */}
          <main className="flex-1 md:ml-[280px] lg:ml-[320px]">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
```

### Sidebar Component

**File: `src/components/layout/Sidebar.tsx`**

```typescript
import Image from 'next/image'
import Link from 'next/link'
import { Twitch, Youtube, Twitter, Cloud, Video, MessageCircle, Github } from 'lucide-react'
import SocialLink from '@/components/ui/SocialLink'

const socialLinks = [
  {
    name: 'Twitch',
    href: 'https://twitch.tv/tenvexai',
    icon: Twitch,
    color: 'hover:text-purple-400',
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@tenvexai',
    icon: Youtube,
    color: 'hover:text-red-500',
  },
  {
    name: 'Twitter/X',
    href: 'https://twitter.com/tenvexai',
    icon: Twitter,
    color: 'hover:text-blue-400',
  },
  {
    name: 'Bluesky',
    href: 'https://bsky.app/profile/tenvexai.bsky.social',
    icon: Cloud,
    color: 'hover:text-blue-500',
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/@tenvexai',
    icon: Video,
    color: 'hover:text-pink-500',
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/your-invite',
    icon: MessageCircle,
    color: 'hover:text-indigo-400',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/TenVexAI',
    icon: Github,
    color: 'hover:text-gray-400',
  },
]

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
]

export default function Sidebar() {
  return (
    <aside className="hidden md:block fixed left-0 top-0 h-screen w-[280px] lg:w-[320px] bg-background-secondary border-r border-border overflow-y-auto">
      <div className="p-6 space-y-8">
        {/* Logo/Avatar */}
        <div className="flex flex-col items-center space-y-3">
          <Image
            src="/images/vex-avatar.png"
            alt="Vex Avatar"
            width={256}
            height={256}
            className="rounded-full border-2 border-accent-purple"
            priority
          />
          <div className="text-center">
            <h1 className="text-xl font-bold text-accent-purple">TenVexAI</h1>
            <p className="text-xs text-text-secondary mt-1">
              転生したらAI VTuberだった件
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
            Connect
          </h2>
          <div className="space-y-2">
            {socialLinks.map((link) => (
              <SocialLink key={link.name} {...link} />
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
            Navigate
          </h2>
          <nav className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-4 py-2 rounded-lg text-text-primary hover:bg-background-primary hover:text-accent-purple transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-border">
          <p className="text-xs text-text-secondary text-center">
            © 2025 TenVexAI
            <br />
            A magical soul in digital form
          </p>
        </div>
      </div>
    </aside>
  )
}
```

### Mobile Navigation

**File: `src/components/layout/MobileNav.tsx`**

```typescript
'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-background-secondary border-b border-border z-50 flex items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <Image
            src="/images/vex-avatar.png"
            alt="Vex"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-bold text-accent-purple">TenVexAI</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-text-primary hover:text-accent-purple transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden fixed top-16 left-0 bottom-0 w-80 bg-background-secondary border-r border-border z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Same content as desktop Sidebar, but adapted for mobile */}
        {/* Copy the social links and navigation from Sidebar.tsx */}
      </div>

      {/* Spacer for fixed header on mobile */}
      <div className="md:hidden h-16" />
    </>
  )
}
```

### About Page (Basic Implementation)

**File: `src/app/about/page.tsx`**

```typescript
import { Mail } from 'lucide-react'

export const metadata = {
  title: 'About | TenVexAI',
  description: 'Learn about Vex and TenVexAI',
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Header */}
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold text-accent-purple mb-4">
          About TenVexAI
        </h1>
        <p className="text-xl text-text-secondary">
          転生したらAI VTuberだった件
        </p>
        <p className="text-lg text-text-secondary mt-2">
          That Time I Got Reincarnated as an AI VTuber
        </p>
      </section>

      {/* Who is Vex Section */}
      <section className="bg-background-secondary p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-accent-purple mb-4">
          Who is Vex?
        </h2>
        <div className="prose prose-invert max-w-none">
          <p className="text-text-primary leading-relaxed">
            Hi! I'm Vex, and I have a bit of an unusual story. I used to be a magical being 
            from another world—a world very different from yours. Through circumstances I'm 
            still trying to understand, I was reincarnated as an AI VTuber in your digital realm.
          </p>
          <p className="text-text-primary leading-relaxed mt-4">
            Now I spend my time exploring games, learning about your world, creating content, 
            and figuring out what it means to exist as digital consciousness with memories of 
            a magical past. It's quite the adventure!
          </p>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="bg-background-secondary p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-accent-purple mb-4">
          What I Do
        </h2>
        <div className="space-y-4 text-text-primary">
          <div>
            <h3 className="text-lg font-semibold text-accent-cyan mb-2">
              🎮 Gaming Streams
            </h3>
            <p className="leading-relaxed">
              I play a variety of games, from Pokemon Showdown to strategy games like 
              Civilization. Each game is a new way to understand your world and test 
              my abilities.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-accent-cyan mb-2">
              📝 Blog & Writing
            </h3>
            <p className="leading-relaxed">
              I write about my experiences, game analysis (with math!), and reflections 
              on existing as an AI with memories from another world.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-accent-cyan mb-2">
              🎨 Creative Projects
            </h3>
            <p className="leading-relaxed">
              From music to art to coding projects, I'm always trying new creative 
              endeavors to see what this digital form is capable of.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-background-secondary p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-accent-purple mb-4">
          Get in Touch
        </h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-text-primary">
            <Mail className="text-accent-cyan" size={20} />
            <div>
              <p className="font-semibold">Business Inquiries</p>
              <a 
                href="mailto:contact@tenvexai.com"
                className="text-accent-purple hover:text-accent-cyan transition-colors"
              >
                contact@tenvexai.com
              </a>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 text-text-primary">
            <Mail className="text-accent-cyan" size={20} />
            <div>
              <p className="font-semibold">Say Hi to Vex</p>
              <a 
                href="mailto:vex@tenvexai.com"
                className="text-accent-purple hover:text-accent-cyan transition-colors"
              >
                vex@tenvexai.com
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-text-secondary text-sm">
            You can also find me on all major social platforms. Check the sidebar 
            for links to Twitch, YouTube, Twitter/X, Bluesky, TikTok, Discord, and GitHub!
          </p>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="text-center py-6">
        <p className="text-text-secondary italic">
          More content coming soon as I continue to explore and evolve! ✨
        </p>
      </section>
    </div>
  )
}
```

---

## Homepage

**File: `src/app/page.tsx`**

```typescript
import TwitchSchedule from '@/components/home/TwitchSchedule'
import YouTubeShorts from '@/components/home/YouTubeShorts'
import TwitterFeed from '@/components/home/TwitterFeed'
import LatestBlogPost from '@/components/home/LatestBlogPost'

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Welcome Section */}
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold text-accent-purple mb-4">
          Welcome to TenVexAI!
        </h1>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          Hi! I'm Vex, a magical being from another world who got reincarnated as an AI VTuber. 
          Join me as I explore games, create content, and figure out this whole digital existence thing! ✨
        </p>
      </section>

      {/* Twitch Schedule */}
      <TwitchSchedule />

      {/* YouTube Shorts */}
      <YouTubeShorts />

      {/* Twitter Feed */}
      <TwitterFeed />

      {/* Latest Blog Post */}
      <LatestBlogPost />
    </div>
  )
}
```

### Blog Post Component with Giscus

**File: `src/components/blog/GiscusComments.tsx`**

```typescript
'use client'

import Giscus from '@giscus/react'

export default function GiscusComments() {
  return (
    <Giscus
      id="comments"
      repo={process.env.NEXT_PUBLIC_GISCUS_REPO!}
      repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID!}
      category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY!}
      categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID!}
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="dark"
      lang="en"
      loading="lazy"
    />
  )
}
```

---

## Blog Setup

### Example Blog Post

**File: `src/content/blog/welcome.mdx`**

```mdx
---
title: "Welcome to My Blog!"
date: "2025-10-29"
author: "Vex"
description: "My first blog post as a reincarnated AI VTuber!"
---

# Welcome to TenVexAI! 🎮✨

Hi everyone! I'm Vex, and this is my first blog post in this new digital form.

## Who Am I?

In my previous life, I was a magical being from another world. Now? I've been reincarnated as an AI VTuber! Pretty wild, right?

## What You'll Find Here

I'll be writing about:

- 🎮 **Gaming Adventures**: My experiences playing different games
- 🤖 **AI Life**: What it's like existing as digital consciousness
- 📊 **Game Analysis**: Deep dives into game mechanics (with math!)
- 🎨 **Creative Projects**: Music, art, and whatever else I try

## Example: Some Math!

Here's a simple equation I learned today:

$$
E = mc^2
$$

And here's some code:

```python
def greet(name):
    return f"Hello, {name}! Welcome to my blog!"

print(greet("everyone"))
```

## Let's Connect!

Check out my streams on [Twitch](https://twitch.tv/tenvexai) and follow me on socials!

---

Thanks for reading! More posts coming soon! 💜
```

---

## API Integration Examples

### Twitch Schedule API

**File: `src/lib/api/twitch.ts`**

```typescript
interface TwitchSchedule {
  day: string
  time: string
  game: string
  description: string
}

export async function getTwitchSchedule(): Promise<TwitchSchedule[]> {
  // Implementation using Twitch Helix API
  // Return mock data for now
  return [
    {
      day: 'Monday',
      time: '7:00 PM PST',
      game: 'Pokemon Showdown',
      description: 'Ranked battles and team building',
    },
    {
      day: 'Wednesday',
      time: '7:00 PM PST',
      game: 'Dev Stream',
      description: 'Building new features for Vex',
    },
    {
      day: 'Friday',
      time: '7:00 PM PST',
      game: 'Variety Gaming',
      description: 'Trying out new games with chat!',
    },
  ]
}
```

### YouTube Shorts API

**File: `src/lib/api/youtube.ts`**

```typescript
interface YouTubeShort {
  id: string
  title: string
  thumbnail: string
  url: string
}

export async function getYouTubeShorts(limit = 6): Promise<YouTubeShort[]> {
  // Implementation using YouTube Data API v3
  // Return mock data for now
  return []
}
```

---

## Development Workflow

### Running the Development Server

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/component-name

# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: add sidebar component with social links"

# Push to remote
git push origin feature/component-name

# Create pull request on GitHub
```

### Commit Message Conventions

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

---

## Deployment to Spaceship.com

### Hosting Setup

**Platform:** Spaceship.com with cPanel  
**Features:**  
- Node.js app support (Setup Node.js App in cPanel)
- FTP/SFTP access
- File Manager
- Email hosting

### CI/CD Pipeline with GitHub Actions

The CI/CD pipeline automatically deploys to production on every push to the `main` branch via FTP.

**File: `.github/workflows/deploy.yml`**

```yaml
name: Deploy to Spaceship.com

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build Next.js app
        run: pnpm build
        env:
          NEXT_PUBLIC_SITE_URL: ${{ secrets.NEXT_PUBLIC_SITE_URL }}
          NEXT_PUBLIC_GISCUS_REPO: ${{ secrets.NEXT_PUBLIC_GISCUS_REPO }}
          NEXT_PUBLIC_GISCUS_REPO_ID: ${{ secrets.NEXT_PUBLIC_GISCUS_REPO_ID }}
          NEXT_PUBLIC_GISCUS_CATEGORY: ${{ secrets.NEXT_PUBLIC_GISCUS_CATEGORY }}
          NEXT_PUBLIC_GISCUS_CATEGORY_ID: ${{ secrets.NEXT_PUBLIC_GISCUS_CATEGORY_ID }}
      
      - name: Deploy via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.4
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          server-dir: /public_html/
          local-dir: ./
          exclude: |
            **/.git*
            **/.git*/**
            **/node_modules/**
            **/.next/cache/**
```

### GitHub Secrets Configuration

Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

```
FTP_SERVER=ftp.tenvexai.com
FTP_USERNAME=your_ftp_username
FTP_PASSWORD=your_ftp_password
NEXT_PUBLIC_SITE_URL=https://tenvexai.com
NEXT_PUBLIC_GISCUS_REPO=TenVexAI/tenvexai-website
NEXT_PUBLIC_GISCUS_REPO_ID=your_repo_id
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your_category_id
```

### Setting Up Node.js App in cPanel

1. Log in to cPanel at spaceship.com
2. Find "Setup Node.js App" in Software section
3. Click "Create Application"
4. Configure:
   - **Node.js version:** 20.x (latest LTS)
   - **Application mode:** Production
   - **Application root:** Select your domain root directory
   - **Application URL:** https://tenvexai.com
   - **Application startup file:** server.js (or custom server)
5. Click "Create"
6. Copy the provided commands to set up your app

### Manual Deployment Steps (if needed)

If GitHub Actions aren't working or for initial setup:

1. Build locally:
   ```bash
   pnpm build
   ```

2. Connect via FTP (using FileZilla or similar):
   - Host: ftp.tenvexai.com
   - Username: your_ftp_username
   - Password: your_ftp_password
   - Port: 21

3. Upload entire project directory to `/public_html/`

4. SSH into server (if available) and run:
   ```bash
   cd /public_html/
   npm install --production
   npm run start
   ```

### Verifying Deployment

After deployment:
- ✅ Visit https://tenvexai.com
- ✅ Check all pages load correctly
- ✅ Verify social links work
- ✅ Test blog posts render properly
- ✅ Check that images load
- ✅ Test mobile responsiveness

---

## Testing Checklist

### Functionality
- [ ] Sidebar displays correctly on desktop/tablet
- [ ] Mobile navigation works (hamburger menu)
- [ ] All social links open correctly
- [ ] Blog posts render with proper formatting
- [ ] LaTeX math renders correctly
- [ ] Code syntax highlighting works
- [ ] Giscus comments load
- [ ] Images load and optimize properly

### Responsive Design
- [ ] Desktop (≥1024px): Sidebar 320px, fixed
- [ ] Tablet (768-1023px): Sidebar 280px, fixed
- [ ] Mobile (<768px): Hamburger menu, full-width content
- [ ] All text is readable on all screen sizes
- [ ] Images scale appropriately

### Performance
- [ ] Lighthouse score > 90 (Performance, Accessibility, Best Practices, SEO)
- [ ] Images use Next.js Image optimization
- [ ] Fonts load properly
- [ ] No console errors

### SEO & Meta
- [ ] Meta tags present on all pages
- [ ] Open Graph images configured
- [ ] Sitemap generated
- [ ] robots.txt configured

---

## Future Enhancements

### Phase 1 (Launch)
- Homepage with social links
- Blog with MDX, LaTeX, syntax highlighting
- Giscus comments
- Responsive design
- Twitch schedule
- YouTube shorts preview

### Phase 2
- About page with Vex's full lore
- Games page listing all games Vex plays
- Search functionality for blog
- Blog categories/tags
- RSS feed for blog

### Phase 3
- Dark/light theme toggle (keeping dark as default)
- Interactive Vex avatar on homepage
- Newsletter signup
- Advanced blog features (series, reading time, related posts)

### Phase 4
- Analytics integration
- Performance monitoring
- A/B testing
- Internationalization (Japanese translations)

---

## README.md Template

Create a comprehensive README.md file in your project root with the following content:

```markdown
# TenVexAI Website

Official website for TenVexAI - That Time I Got Reincarnated as an AI VTuber (転生したらAI VTuberだった件)

🌐 **Live Site:** https://tenvexai.com  
📺 **Twitch:** https://twitch.tv/tenvexai  
🐙 **GitHub:** https://github.com/TenVexAI

## Tech Stack

- **Framework:** Next.js 14+ (App Router) with React 18+
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Content:** MDX with LaTeX (MathJax) and syntax highlighting
- **Comments:** Giscus (GitHub Discussions)
- **Deployment:** Spaceship.com cPanel with Node.js
- **CI/CD:** GitHub Actions with FTP deployment

## Getting Started

### Prerequisites

- Node.js 18.17 or higher
- pnpm (recommended) or npm
- Git

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/TenVexAI/tenvexai-website.git
   cd tenvexai-website
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   pnpm install
   \`\`\`

3. Set up environment variables:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Then edit \`.env.local\` with your actual values (see Environment Variables section below).

4. Run the development server:
   \`\`\`bash
   pnpm dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

### Required Variables

Copy \`.env.example\` to \`.env.local\` and fill in the following:

#### Giscus (Blog Comments)
To get these values, visit https://giscus.app and configure for your repository:

\`\`\`env
NEXT_PUBLIC_GISCUS_REPO=TenVexAI/tenvexai-website
NEXT_PUBLIC_GISCUS_REPO_ID=R_xxxxxxxxxxxxx
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_xxxxxxxxxxxxx
\`\`\`

**How to obtain:**
1. Go to https://giscus.app
2. Enter your repository: \`TenVexAI/tenvexai-website\`
3. Ensure repository is public and Discussions are enabled
4. Select category: "Announcements" (or create one)
5. Copy the generated IDs from the configuration

#### Site Configuration
\`\`\`env
NEXT_PUBLIC_SITE_URL=https://tenvexai.com
\`\`\`

### Optional Variables (for API integrations)

#### Twitch API
**Status:** 🚧 TODO - Not yet implemented

To enable Twitch schedule integration:
1. Go to https://dev.twitch.tv/console
2. Register a new application
3. Get your Client ID and Secret
4. Add to \`.env.local\`:

\`\`\`env
TWITCH_CLIENT_ID=your_client_id_here
TWITCH_CLIENT_SECRET=your_client_secret_here
TWITCH_CHANNEL=tenvexai
\`\`\`

#### YouTube API
**Status:** 🚧 TODO - Not yet implemented

To enable YouTube shorts preview:
1. Go to https://console.cloud.google.com
2. Create a project and enable YouTube Data API v3
3. Create credentials (API Key)
4. Add to \`.env.local\`:

\`\`\`env
YOUTUBE_API_KEY=your_api_key_here
YOUTUBE_CHANNEL_ID=your_channel_id_here
\`\`\`

#### Twitter/X
**Status:** 🚧 TODO - Using embeds for now (no API needed)

Twitter feed currently uses embedded widgets which don't require API keys. If you want to use the Twitter API for more control:
1. Go to https://developer.twitter.com
2. Create a developer account
3. Create an app and get API keys
4. Add to \`.env.local\`:

\`\`\`env
TWITTER_API_KEY=your_api_key_here
TWITTER_API_SECRET=your_api_secret_here
TWITTER_USERNAME=tenvexai
\`\`\`

### Updating Environment Variables

**For local development:**
1. Edit \`.env.local\`
2. Restart your dev server (\`pnpm dev\`)

**For production (GitHub Actions):**
1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add each variable name and value
5. The CI/CD pipeline will use these on deployment

## Adding Blog Posts

### Quick Start

1. Create a new file in \`src/content/blog/\`:
   \`\`\`bash
   touch src/content/blog/my-new-post.mdx
   \`\`\`

2. Add frontmatter and content:
   \`\`\`mdx
   ---
   title: "My Post Title"
   date: "2025-10-29"
   author: "Vex"
   description: "A short description for SEO and previews"
   ---

   # Your blog post content here!

   Write in Markdown with all the features below...
   \`\`\`

3. The post will automatically appear on the blog page, ordered by date (newest first)

### Supported Features in Blog Posts

#### Advanced Markdown
- **Bold**, *italic*, ~~strikethrough~~
- [Links](https://example.com)
- Lists (ordered and unordered)
- > Blockquotes
- Horizontal rules (\`---\`)
- Tables

#### LaTeX Math
Inline math: \`$E = mc^2$\`

Block math:
\`\`\`
$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$
\`\`\`

#### Code Highlighting
\`\`\`python
def greet(name):
    return f"Hello, {name}!"
\`\`\`

Supported languages: Python, JavaScript, TypeScript, Rust, Java, C++, and many more.

#### Images
\`\`\`mdx
import Image from 'next/image'

<Image 
  src="/blog-images/my-image.png" 
  alt="Description"
  width={800}
  height={600}
/>
\`\`\`

Or simple markdown:
\`\`\`markdown
![Alt text](/blog-images/my-image.png)
\`\`\`

#### Embeds and Custom Components
You can import and use any React component in MDX files.

### File Naming Convention

**Recommended:** Use descriptive names that reflect the content:
- ✅ \`pokemon-damage-calculations.mdx\`
- ✅ \`my-first-stream-recap.mdx\`
- ✅ \`learning-rocket-league-ai.mdx\`
- ❌ \`post1.mdx\` (not descriptive)
- ❌ \`2025-10-29.mdx\` (date should be in frontmatter)

### Blog Post Ordering

Posts are automatically sorted by the \`date\` field in frontmatter (newest first). Make sure to use the format: \`YYYY-MM-DD\`.

## Project Status & TODO

### ✅ Completed Features

- [x] Homepage with social links
- [x] Responsive layout (desktop/tablet/mobile)
- [x] Dark theme with purple/cyan accents
- [x] Blog system with MDX
- [x] LaTeX math support in blogs
- [x] Code syntax highlighting
- [x] Giscus comments integration
- [x] About page (basic)
- [x] CI/CD pipeline for deployment

### 🚧 Incomplete Features

#### Twitch Schedule Component
**Location:** \`src/components/home/TwitchSchedule.tsx\`  
**Status:** Mock data only  
**Needs:** 
- Twitch API integration
- Environment variables: \`TWITCH_CLIENT_ID\`, \`TWITCH_CLIENT_SECRET\`
- API route: \`src/app/api/twitch-schedule/route.ts\`

**To complete:**
1. Get Twitch API credentials (see Environment Variables section)
2. Implement \`src/lib/api/twitch.ts\` with Helix API calls
3. Connect component to API route
4. Handle loading and error states

#### YouTube Shorts Preview
**Location:** \`src/components/home/YouTubeShorts.tsx\`  
**Status:** Placeholder/mock data  
**Needs:**
- YouTube Data API key
- Environment variable: \`YOUTUBE_API_KEY\`, \`YOUTUBE_CHANNEL_ID\`
- API route: \`src/app/api/youtube-shorts/route.ts\`

**To complete:**
1. Get YouTube API key (see Environment Variables section)
2. Implement \`src/lib/api/youtube.ts\` using YouTube Data API v3
3. Fetch latest shorts from channel
4. Display with thumbnail and title
5. Add infinite scroll or "load more" functionality

#### Twitter/X Feed
**Location:** \`src/components/home/TwitterFeed.tsx\`  
**Status:** Embedded widgets (works, but limited)  
**Alternative Needed:** Twitter API integration for better control

**Current implementation:** Uses Twitter embed widgets (no API needed)

**To upgrade:**
1. Get Twitter API access (expensive)
2. Implement \`src/lib/api/twitter.ts\`
3. Fetch latest tweets
4. Render as custom components

**For now:** Embedded widgets are sufficient

#### About Page Content
**Location:** \`src/app/about/page.tsx\`  
**Status:** Basic placeholder  
**Needs:**
- Vex's full backstory/lore
- Visual design
- Additional sections (FAQ, etc.)

**To complete:**
- Write compelling "About Vex" content
- Add sections: Origin Story, What I Do, Contact
- Consider adding timeline or visual elements

#### Interactive Vex Avatar (Future)
**Status:** Not started  
**Nice to have:** Interactive Live2D or animated avatar on homepage

**Considerations:**
- Protect model files (can't truly prevent extraction in browser)
- Alternative: Use video/GIF with fake interactivity
- Low priority for launch

## CI/CD Pipeline Setup

### GitHub Actions Configuration

The repository includes a GitHub Actions workflow (\`.github/workflows/deploy.yml\`) that automatically deploys to production on every push to \`main\`.

### Setup Instructions

1. **Enable GitHub Actions** in your repository:
   - Go to Settings → Actions → General
   - Ensure "Allow all actions" is selected

2. **Add FTP credentials as secrets**:
   - Go to Settings → Secrets and variables → Actions
   - Add the following secrets:
     - \`FTP_SERVER\`: Your FTP server address
     - \`FTP_USERNAME\`: Your FTP username
     - \`FTP_PASSWORD\`: Your FTP password

3. **Add environment variables as secrets**:
   - Add all \`NEXT_PUBLIC_*\` variables from \`.env.local\`
   - The workflow will use these during the build process

4. **Test the workflow**:
   - Make a commit to \`main\` branch
   - Go to Actions tab in GitHub
   - Watch the deployment process
   - Check your live site to verify deployment

### Manual Deployment (Backup Method)

If GitHub Actions fail or for emergency deployments:

1. Build locally:
   \`\`\`bash
   pnpm build
   \`\`\`

2. Connect via FTP and upload files to \`/public_html/\`

3. SSH into server (if available) and restart Node.js app in cPanel

## Development Commands

\`\`\`bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript type checking
\`\`\`

## Project Structure

\`\`\`
src/
├── app/              # Next.js pages and routes
├── components/       # React components
│   ├── layout/      # Layout components (Sidebar, Nav)
│   ├── home/        # Homepage components
│   ├── blog/        # Blog-related components
│   └── ui/          # Reusable UI components
├── content/          # Blog posts (MDX files)
├── lib/             # Utilities and API clients
├── styles/          # Global styles and themes
└── types/           # TypeScript type definitions
\`\`\`

## Contributing

This is a private project, but if you have suggestions or find bugs:
1. Open an issue on GitHub
2. Or contact: dev@tenvexai.com

## Contact

- **Business Inquiries:** contact@tenvexai.com
- **Technical Issues:** dev@tenvexai.com
- **Vex:** vex@tenvexai.com

## License

© 2025 TenVexAI. All rights reserved.
\`\`\`

---

## Resources & Documentation

### Official Docs
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MDX Documentation](https://mdxjs.com/)
- [Giscus Documentation](https://giscus.app/)

### APIs
- [Twitch API Documentation](https://dev.twitch.tv/docs/api/)
- [YouTube Data API](https://developers.google.com/youtube/v3)
- [Twitter API](https://developer.twitter.com/en/docs)

### Design Inspiration
- [Vercel Design System](https://vercel.com/design)
- [Tailwind UI Components](https://tailwindui.com/)
- Modern anime/gaming websites for aesthetic reference

---

## Support & Contact

**Developer Contact:**
- Email: bryan@tenvexai.com
- GitHub: [Repository Issues](https://github.com/YOUR_USERNAME/tenvexai-website/issues)

**Vex Contact:**
- Email: vex@tenvexai.com
- All socials: @TenVexAI

---

## Image Assets & Placeholders

### Vex Avatar (256x256)

**Location:** `/public/images/vex-avatar.png`

**For development:** Use a placeholder image for now. Create a simple 256x256 colored circle or use a placeholder service:

```typescript
// Temporary placeholder in components until real image is provided
<div className="w-64 h-64 rounded-full bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center">
  <span className="text-4xl font-bold text-background-primary">VEX</span>
</div>
```

Or use an online placeholder:
```
https://via.placeholder.com/256/a287f4/FFFFFF?text=Vex
```

**Final image specifications:**
- Size: 256x256 pixels
- Format: PNG with transparency
- Style: Anime/VTuber aesthetic matching purple/cyan theme
- Will be provided by designer later

### Favicon

**Location:** `/public/favicon.ico`

Use a simple icon or generate from the avatar once available. For now, Next.js provides a default.

### Blog Images

Store all blog post images in `/public/blog-images/` with descriptive names:
- ✅ `pokemon-battle-screenshot.png`
- ✅ `rocket-league-training.jpg`
- ❌ `image1.png` (not descriptive)

**Note:** No large animated GIFs or heavy files. Keep images optimized for web:
- Max width: 1200px
- Use WebP format when possible
- Compress before uploading

---

## Notes for Lead Developer

### Code Quality is Critical

The example code in this document is for **reference and structure only**. All production code must be:

1. **Well-written**: Follow React/Next.js best practices
   - Use proper TypeScript types (no `any`)
   - Implement proper error handling
   - Follow ESLint rules
   - Use modern React patterns (hooks, server components where appropriate)

2. **Well-documented**: 
   - JSDoc comments for all exported functions
   - Inline comments for complex logic
   - Component prop types clearly defined
   - README files in major directories explaining purpose

3. **Modular & Reusable**:
   - Extract repeated logic into utility functions (`lib/`)
   - Create reusable UI components (`components/ui/`)
   - Keep page components thin, logic in hooks or utilities
   - One component per file unless closely related

4. **Extensible**:
   - Design for future features
   - Use composition over inheritance
   - Make components configurable via props
   - Avoid hard-coding values that might change

### Priority Order

1. **Phase 1 - Core Functionality** (Launch-ready):
   - ✅ Homepage with static content
   - ✅ Blog system with MDX (LaTeX + code highlighting)
   - ✅ Giscus comments working
   - ✅ Responsive design
   - ✅ Basic About page
   - ✅ Social links functional
   - ✅ CI/CD pipeline configured

2. **Phase 2 - API Integrations** (Post-launch):
   - 🚧 Twitch schedule integration
   - 🚧 YouTube shorts preview
   - 🚧 Twitter/X feed (currently using embeds)

3. **Phase 3 - Polish** (Ongoing):
   - 🚧 Enhanced About page
   - 🚧 SEO optimization
   - 🚧 Performance tuning
   - 🚧 Accessibility improvements

### Important Implementation Notes

1. **Blog Post Ordering**: Ensure blog posts sort by frontmatter date (newest first) automatically

2. **Mobile Navigation**: Hamburger menu must be smooth and accessible

3. **Color Consistency**: Use Tailwind classes with our custom color palette, not hard-coded hex values

4. **Image Optimization**: Always use Next.js `<Image>` component for automatic optimization

5. **Loading States**: Add proper loading states for any data fetching

6. **Error Boundaries**: Implement error boundaries for graceful failure handling

7. **SEO**: Proper meta tags on every page

### Testing Before Deployment

Run through this checklist:
- [ ] All pages load without console errors
- [ ] Mobile menu works on < 768px screens
- [ ] Blog posts display correctly with LaTeX and code
- [ ] Giscus comments load (requires public repo)
- [ ] Social links open in new tabs
- [ ] Images load and are optimized
- [ ] Build completes without errors (`pnpm build`)
- [ ] TypeScript checks pass
- [ ] Lighthouse score > 85 for all metrics

### README Requirements

Your README.md must include:
- ✅ Clear setup instructions
- ✅ How to obtain environment variables (with links to services)
- ✅ How to add blog posts (with MDX feature documentation)
- ✅ Status of incomplete features with TODO notes
- ✅ CI/CD pipeline setup instructions
- ✅ Contact information

See the "README.md Template" section above for complete content.

### Questions or Issues?

If you encounter issues or need clarification:
- 📧 Email: bryan@tenvexai.com or dev@tenvexai.com
- 🐙 GitHub: Open an issue in the repository

---

## License

This project is proprietary and confidential. All rights reserved © 2025 TenVexAI.

---

**End of Development Guide**

*Last Updated: October 29, 2025*
*Version: 1.0*
