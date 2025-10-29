# Deployment Guide - Spaceship.com cPanel

This guide covers deploying the TenVexAI website to Spaceship.com using GitHub Actions for CI/CD.

## Prerequisites

- GitHub repository: https://github.com/TenVexAI/tenvexai-website
- Spaceship.com cPanel account
- FTP access credentials
- Domain: tenvexai.com

## Setup Instructions

### 1. Configure cPanel Node.js App

1. Log into your Spaceship.com cPanel
2. Navigate to **Software** → **Setup Node.js App**
3. Click **Create Application**
4. Configure:
   - **Node.js version:** 20.x (latest LTS)
   - **Application mode:** Production
   - **Application root:** `/home/yourusername/tenvexai-website` (or your path)
   - **Application URL:** `tenvexai.com`
   - **Application startup file:** `server.js` (we'll create this)
5. Click **Create**

### 2. Create Server Startup File

In your cPanel File Manager or via FTP, create `server.js` in your application root:

```javascript
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = false; // Always production on server
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
```

### 3. Set Up GitHub Secrets

Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add these secrets:

#### FTP Configuration
- `FTP_SERVER`: Your Spaceship.com FTP server (e.g., `ftp.tenvexai.com`)
- `FTP_USERNAME`: Your FTP username
- `FTP_PASSWORD`: Your FTP password
- `FTP_SERVER_DIR`: Path on server (e.g., `/home/yourusername/tenvexai-website/`)

#### Environment Variables (from your .env.local)
- `TWITCH_CLIENT_ID`
- `TWITCH_CLIENT_SECRET`
- `TWITCH_CHANNEL_ID`
- `YOUTUBE_API_KEY`
- `YOUTUBE_CHANNEL_ID`
- `TWITTER_USERNAME`
- `NEXT_PUBLIC_GISCUS_REPO`
- `NEXT_PUBLIC_GISCUS_REPO_ID`
- `NEXT_PUBLIC_GISCUS_CATEGORY`
- `NEXT_PUBLIC_GISCUS_CATEGORY_ID`
- `NEXT_PUBLIC_SITE_URL` (set to `https://tenvexai.com`)

### 4. Initial Deployment

1. Commit and push the workflow file:
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Add CI/CD deployment workflow"
   git push origin main
   ```

2. GitHub Actions will automatically:
   - Install dependencies
   - Build the Next.js app
   - Upload files to your cPanel via FTP
   - Deploy to production

3. Monitor the deployment:
   - Go to your GitHub repo → **Actions** tab
   - Watch the deployment progress

### 5. Configure cPanel After First Deploy

After the first deployment completes:

1. Go back to cPanel → **Setup Node.js App**
2. Click on your application
3. Click **Run NPM Install** (if needed)
4. Click **Restart** to start the application

### 6. Point Domain to Application

In cPanel:
1. Ensure your domain `tenvexai.com` points to the correct directory
2. Set up SSL certificate (Let's Encrypt is free in cPanel)
3. Configure `.htaccess` if needed to proxy to Node.js app

## Adding Blog Posts

To add a new blog post:

1. Create a new `.mdx` file in `src/content/blog/`
2. Add frontmatter:
   ```mdx
   ---
   title: "Your Post Title"
   date: "2025-01-29"
   author: "Vex"
   description: "Post description"
   ---
   
   Your content here...
   ```
3. Commit and push:
   ```bash
   git add src/content/blog/your-post.mdx
   git commit -m "Add new blog post: Your Title"
   git push origin main
   ```
4. GitHub Actions automatically deploys the new post!

## Manual Deployment

If you need to deploy manually:

1. Build locally:
   ```bash
   pnpm build
   ```

2. Upload these folders/files via FTP:
   - `.next/`
   - `public/`
   - `package.json`
   - `pnpm-lock.yaml`
   - `next.config.ts`
   - `node_modules/` (or run `pnpm install` on server)

3. Restart the Node.js app in cPanel

## Troubleshooting

### Deployment fails
- Check GitHub Actions logs for errors
- Verify FTP credentials in GitHub Secrets
- Ensure server directory path is correct

### Site not loading
- Check Node.js app status in cPanel
- View application logs in cPanel
- Ensure port is not blocked
- Verify domain DNS settings

### Environment variables not working
- Double-check all secrets are set in GitHub
- Ensure secret names match exactly (case-sensitive)
- Restart the Node.js app after updating secrets

### Blog posts not showing
- Verify MDX file has correct frontmatter
- Check file is in `src/content/blog/` directory
- Ensure deployment completed successfully
- Clear browser cache

## Monitoring

- **GitHub Actions**: Monitor deployments in the Actions tab
- **cPanel Logs**: Check application logs for errors
- **Analytics**: Set up monitoring after deployment

## Security Notes

- Never commit `.env.local` to the repository
- Keep GitHub Secrets secure
- Regularly update dependencies
- Use strong FTP passwords
- Enable 2FA on GitHub and cPanel

## Support

- **GitHub Issues**: https://github.com/TenVexAI/tenvexai-website/issues
- **Contact**: broken@tenvexai.com
