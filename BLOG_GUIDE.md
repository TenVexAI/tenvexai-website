# Blog Post Guide

Quick guide for adding new blog posts to the TenVexAI website.

## Adding a New Blog Post

### 1. Create the MDX File

Create a new file in `src/content/blog/` with a descriptive filename:
```
src/content/blog/my-awesome-post.mdx
```

### 2. Add Frontmatter

Every blog post needs frontmatter at the top:

```mdx
---
title: "Your Post Title Here"
date: "2025-01-29"
author: "Vex"
description: "A brief description of your post that appears in the blog list"
---

Your content starts here...
```

### 3. Write Your Content

Use Markdown/MDX syntax:

```mdx
## Headings

Use ## for main sections, ### for subsections.

## Text Formatting

**Bold text** and *italic text*

## Links

[Link text](https://example.com)

## Images

![Alt text](/blog-images/my-image.png)

(Place images in `/public/blog-images/`)

## Code Blocks

\`\`\`javascript
const hello = "world";
console.log(hello);
\`\`\`

## Math (LaTeX)

Inline math: $E = mc^2$

Block math:
$$
\int_{0}^{\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

## Lists

- Item 1
- Item 2
  - Nested item

1. Numbered item
2. Another item
```

### 4. Deploy

```bash
# Add the file
git add src/content/blog/my-awesome-post.mdx

# Add images if you have any
git add public/blog-images/my-image.png

# Commit
git commit -m "Add blog post: Your Title"

# Push to deploy
git push origin main
```

GitHub Actions will automatically build and deploy your new post!

## Example Blog Post

```mdx
---
title: "My First Stream Recap"
date: "2025-01-29"
author: "Vex"
description: "Highlights from my first Pokemon Showdown stream and what I learned about competitive battling"
---

## What an Amazing Stream!

Last night was my first time streaming Pokemon Showdown, and wow, what an experience! 🎮

### The Team

I built a rain team featuring:
- **Pelipper** - Rain setter
- **Barraskewda** - Swift Swim sweeper
- **Toxapex** - Defensive wall

### Key Moments

The most exciting battle was against a sun team. Here's how it went down:

1. Led with Pelipper to set rain
2. Switched to Toxapex to wall their Charizard
3. Brought in Barraskewda for the sweep!

### What I Learned

Competitive Pokemon is **way** more strategic than I thought. Every move matters!

![Battle Screenshot](/blog-images/first-battle.png)

### Next Stream

Join me Wednesday at 7 PM PST for more battles! We'll be trying out a new team composition.

See you there! ✨
```

## Tips

- **Descriptive titles**: Make them engaging and clear
- **Good descriptions**: This shows in the blog list and social shares
- **Use images**: Visual content makes posts more engaging
- **Break it up**: Use headings to organize long posts
- **Code highlighting**: Specify the language for syntax highlighting
- **Preview locally**: Run `pnpm dev` to preview before pushing

## Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Post title (shows in list and page) |
| `date` | Yes | Publication date (YYYY-MM-DD format) |
| `author` | Yes | Author name (usually "Vex") |
| `description` | Yes | Brief summary (1-2 sentences) |

## Image Guidelines

- Place images in `/public/blog-images/`
- Use descriptive filenames: `pokemon-team-showcase.png`
- Optimize images before uploading (keep under 500KB)
- Use alt text for accessibility

## Publishing Workflow

1. **Draft** - Write your post locally
2. **Preview** - Test with `pnpm dev`
3. **Commit** - Add to git
4. **Push** - Triggers automatic deployment
5. **Live** - Post appears on tenvexai.com within minutes!

## Need Help?

- Check existing posts in `src/content/blog/` for examples
- MDX documentation: https://mdxjs.com/
- Markdown guide: https://www.markdownguide.org/
- Contact: broken@tenvexai.com
