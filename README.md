# TenVexAI Website

Official website for TenVexAI - That Time I Got Reincarnated as an AI VTuber (転生したらAI VTuberだった件)

🌐 **Live Site:** https://tenvexai.com  
📺 **Twitch:** https://twitch.tv/tenvexai  
🐙 **GitHub:** https://github.com/TenVexAI

## Tech Stack

- **Framework:** Next.js 16+ (App Router) with React 19+
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Content:** MDX with LaTeX (MathJax) and syntax highlighting
- **Comments:** Giscus (GitHub Discussions)
- **Data Fetching:** SWR
- **Icons:** Lucide React
- **Deployment:** Spaceship.com cPanel with Node.js

## Deployment

### Automatic Deployment (CI/CD)

**Status:** ✅ Production Ready

The site automatically deploys to Spaceship.com cPanel when you push to the `main` branch:

1. **Push to GitHub**: `git push origin main`
2. **GitHub Actions**: Automatically builds and deploys via FTP
3. **Live**: Changes appear on https://tenvexai.com within 2-5 minutes

**Deployment Pipeline:**
- ✅ Automated builds with Next.js
- ✅ Environment variables from GitHub Secrets
- ✅ FTP deployment to cPanel
- ✅ Node.js 20 LTS runtime
- ✅ Incremental deployments (only changed files)

**Guides:**
- [BLOG_GUIDE.md](./BLOG_GUIDE.md) - Adding blog posts

### Adding Blog Posts (Auto-Deploy)

Blog posts automatically deploy when pushed to `main`:

```bash
# 1. Create post
touch src/content/blog/my-post.mdx

# 2. Add content with frontmatter
# 3. Commit and push
git add src/content/blog/my-post.mdx
git commit -m "Add new blog post: My Title"
git push origin main

# 4. Live in ~2 minutes! 🚀
```

## Features

✅ **Production Ready:**
- Responsive design (mobile, tablet, desktop)
- Blog system with MDX support
- LaTeX math rendering with MathJax
- Code syntax highlighting (Shiki)
- Giscus comments integration
- **Twitch API integration** - Live schedule from Twitch Helix API
- **YouTube API integration** - Real shorts from YouTube Data API v3
- Twitter/X feed embed
- **CI/CD Pipeline** - Automated deployment via GitHub Actions
- **Production Deployment** - Live on Spaceship.com cPanel


## Getting Started

### Prerequisites

- Node.js 18.17 or higher
- pnpm (recommended) or npm
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/TenVexAI/tenvexai-website.git
   cd tenvexai-website
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` with your actual values (see Environment Variables section below).

4. Run the development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

### Required Variables

Copy `.env.example` to `.env.local` and fill in the following:

#### Giscus (Blog Comments)

To get these values, visit https://giscus.app and configure for your repository:

```env
NEXT_PUBLIC_GISCUS_REPO=TenVexAI/tenvexai-website
NEXT_PUBLIC_GISCUS_REPO_ID=R_xxxxxxxxxxxxx
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_xxxxxxxxxxxxx
```

**How to obtain:**
1. Go to https://giscus.app
2. Enter your repository: `TenVexAI/tenvexai-website`
3. Ensure repository is public and Discussions are enabled
4. Select category: "Announcements" (or create one)
5. Copy the generated IDs from the configuration

#### Site Configuration

```env
NEXT_PUBLIC_SITE_URL=https://tenvexai.com
```

### API Integration Variables

#### Twitch API
**Status:** ✅ Fully Integrated

Displays your live Twitch stream schedule from the Twitch Helix API:

1. Go to https://dev.twitch.tv/console
2. Register a new application:
   - **Name:** TenVexAI Website
   - **OAuth Redirect URLs:** `https://tenvexai.com/api/auth/callback`
   - **Category:** Website Integration
   - **Client Type:** Confidential
3. Get your Client ID and generate a Client Secret
4. Add to `.env.local`:

```env
TWITCH_CLIENT_ID=your_client_id_here
TWITCH_CLIENT_SECRET=your_client_secret_here
TWITCH_CHANNEL_ID=tenvexai
```

**Features:**
- Fetches real schedule from Twitch
- Shows next 7 days of streams
- Auto-updates every 5 minutes
- Graceful fallback to mock data if API fails

#### YouTube API
**Status:** ✅ Fully Integrated

Displays your latest YouTube Shorts:

1. Go to https://console.cloud.google.com
2. Create a project and enable YouTube Data API v3
3. Create credentials (API Key)
4. **Important:** Set API restrictions:
   - **Application restrictions:** None (server-side calls)
   - **API restrictions:** YouTube Data API v3 only
5. Add to `.env.local`:

```env
YOUTUBE_API_KEY=your_api_key_here
YOUTUBE_CHANNEL_ID=@TenVexAI
```

**Features:**
- Fetches latest shorts (videos under 60 seconds)
- Auto-filters by duration
- Updates every 5 minutes
- Shows up to 6 most recent shorts

#### Twitter/X
**Status:** ✅ Using Embedded Timeline

Twitter feed uses embedded widgets (no API key needed):

```env
TWITTER_USERNAME=tenvexai
```

## Adding Blog Posts

### Quick Start

1. Create a new file in `src/content/blog/`:
   ```bash
   touch src/content/blog/my-new-post.mdx
   ```

2. Add frontmatter and content:
   ```mdx
   ---
   title: "My Post Title"
   date: "2025-10-29"
   author: "Vex"
   description: "A short description for SEO and previews"
   ---

   # Your blog post content here!

   Write in Markdown with all the features below...
   ```

3. The post will automatically appear on the blog page, ordered by date (newest first)

### Supported Features in Blog Posts

#### Advanced Markdown
- **Bold**, *italic*, ~~strikethrough~~
- [Links](https://example.com)
- Lists (ordered and unordered)
- > Blockquotes
- Horizontal rules (`---`)
- Tables

#### LaTeX Math

Inline math: `$E = mc^2$`

Block math:
```
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

#### Code Highlighting

```python
def greet(name):
    return f"Hello, {name}!"
```

Supported languages: Python, JavaScript, TypeScript, Rust, Java, C++, and many more.

#### Images

Place images in `public/blog-images/` and reference them:

```markdown
![Alt text](/blog-images/my-image.png)
```

### File Naming Convention

**Recommended:** Use descriptive names that reflect the content:
- ✅ `pokemon-damage-calculations.mdx`
- ✅ `my-first-stream-recap.mdx`
- ✅ `learning-rocket-league-ai.mdx`
- ❌ `post1.mdx` (not descriptive)

## Development Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## Project Structure

```
src/
├── app/              # Next.js pages and routes
│   ├── page.tsx      # Homepage
│   ├── about/        # About page
│   ├── blog/         # Blog list and individual posts
│   └── layout.tsx    # Root layout
├── components/       # React components
│   ├── layout/       # Layout components (Sidebar, MobileNav)
│   ├── home/         # Homepage components
│   ├── blog/         # Blog-related components
│   └── ui/           # Reusable UI components
├── content/          # Blog posts (MDX files)
│   └── blog/         # All blog posts go here
├── lib/              # Utilities and API clients
│   ├── api/          # API client functions
│   ├── blog.ts       # Blog utilities
│   └── utils.ts      # Helper functions
├── styles/           # Global styles
└── types/            # TypeScript type definitions
```

## Color Palette

The site uses a consistent dark theme with purple and cyan accents:

- **Primary Background:** `#141414`
- **Secondary Background:** `#313131`
- **Accent Purple:** `#a287f4` (primary accent)
- **Accent Cyan:** `#12e6c8` (secondary accent)
- **Text Primary:** `#e0e0e0`
- **Text Secondary:** `#a0a0a0`
- **Border:** `#2a5a5e`

## Responsive Design

- **Desktop (≥768px):** Fixed sidebar (260px), full content area
- **Mobile (<768px):** Hamburger menu with slide-out drawer, full-width content
- **Consistent spacing:** 260px sidebar width across all breakpoints

## Code Quality Standards

All code in this project follows:
- ✅ **Well-written:** React/Next.js best practices
- ✅ **Well-documented:** JSDoc comments for functions
- ✅ **Modular:** Reusable components, no duplication
- ✅ **Type-safe:** Proper TypeScript usage
- ✅ **Performant:** Optimized images and lazy loading

## Development Workflow

### Branch Strategy

- **`main`** - Production branch (auto-deploys to tenvexai.com)
- **`dev`** - Development branch (for testing before deployment)

### Making Changes

```bash
# Work on dev branch
git checkout dev
# Make changes...
git add .
git commit -m "feat: add new feature"
git push origin dev

# When ready to deploy
git checkout main
git merge dev
git push origin main  # Triggers deployment
```

## Contributing

This is a private project. For suggestions or bug reports:
1. Open an issue on GitHub
2. Or contact: broken@tenvexai.com

## Contact

- **Website:** https://tenvexai.com
- **Twitch:** https://twitch.tv/tenvexai
- **YouTube:** https://youtube.com/@TenVexAI
- **Twitter/X:** https://x.com/tenvexai
- **GitHub:** https://github.com/TenVexAI
- **Technical Issues:** broken@tenvexai.com
