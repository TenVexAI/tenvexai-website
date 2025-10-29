# Deployment Setup Checklist

Use this checklist to set up CI/CD deployment to Spaceship.com cPanel.

## ☐ Step 1: GitHub Repository Setup

- [x] Code is in GitHub: https://github.com/TenVexAI/tenvexai-website
- [ ] Workflow file committed: `.github/workflows/deploy.yml`
- [ ] Server file committed: `server.js`

## ☐ Step 2: GitHub Secrets Configuration

Go to: https://github.com/TenVexAI/tenvexai-website/settings/secrets/actions

Add these secrets (click "New repository secret" for each):

### FTP Configuration
- [ ] `FTP_SERVER` - Your Spaceship.com FTP server (e.g., `ftp.tenvexai.com`)
- [ ] `FTP_USERNAME` - Your FTP username
- [ ] `FTP_PASSWORD` - Your FTP password  
- [ ] `FTP_SERVER_DIR` - Server path (e.g., `/home/yourusername/tenvexai-website/`)

### API Keys & Configuration
- [ ] `TWITCH_CLIENT_ID` - From your .env.local
- [ ] `TWITCH_CLIENT_SECRET` - From your .env.local
- [ ] `TWITCH_CHANNEL_ID` - From your .env.local (tenvexai)
- [ ] `YOUTUBE_API_KEY` - From your .env.local
- [ ] `YOUTUBE_CHANNEL_ID` - From your .env.local (@TenVexAI)
- [ ] `TWITTER_USERNAME` - From your .env.local (tenvexai)
- [ ] `NEXT_PUBLIC_GISCUS_REPO` - From your .env.local
- [ ] `NEXT_PUBLIC_GISCUS_REPO_ID` - From your .env.local
- [ ] `NEXT_PUBLIC_GISCUS_CATEGORY` - From your .env.local
- [ ] `NEXT_PUBLIC_GISCUS_CATEGORY_ID` - From your .env.local
- [ ] `NEXT_PUBLIC_SITE_URL` - Set to `https://tenvexai.com`

## ☐ Step 3: cPanel Node.js App Setup

1. Log into Spaceship.com cPanel
2. Navigate to: **Software** → **Setup Node.js App**
3. Click **Create Application**
4. Configure:
   - [ ] Node.js version: **20.x** (latest LTS)
   - [ ] Application mode: **Production**
   - [ ] Application root: Your server path (e.g., `/home/yourusername/tenvexai-website`)
   - [ ] Application URL: **tenvexai.com**
   - [ ] Application startup file: **server.js**
5. [ ] Click **Create**
6. [ ] Note the port number assigned (if shown)

## ☐ Step 4: Initial Deployment

1. [ ] Commit deployment files:
   ```bash
   git add .github/workflows/deploy.yml server.js DEPLOYMENT.md BLOG_GUIDE.md
   git commit -m "Add CI/CD deployment workflow"
   git push origin main
   ```

2. [ ] Monitor deployment:
   - Go to: https://github.com/TenVexAI/tenvexai-website/actions
   - Watch the "Deploy to Spaceship cPanel" workflow
   - Ensure it completes successfully (green checkmark)

3. [ ] After first deployment, in cPanel:
   - [ ] Go to **Setup Node.js App**
   - [ ] Click on your application
   - [ ] Click **Restart** to start the app
   - [ ] Verify status shows "Running"

## ☐ Step 5: Domain & SSL Configuration

1. [ ] Verify domain points to correct directory in cPanel
2. [ ] Set up SSL certificate:
   - Go to **Security** → **SSL/TLS Status**
   - [ ] Enable AutoSSL for tenvexai.com
   - [ ] Or install Let's Encrypt certificate
3. [ ] Test HTTPS: https://tenvexai.com

## ☐ Step 6: Verify Everything Works

- [ ] Visit https://tenvexai.com
- [ ] Check homepage loads
- [ ] Verify Twitch schedule appears
- [ ] Verify YouTube section (may be empty if no shorts)
- [ ] Check X/Twitter feed loads
- [ ] Navigate to /blog
- [ ] Navigate to /about
- [ ] Test a blog post page
- [ ] Verify comments section (Giscus) loads
- [ ] Test on mobile device
- [ ] Check all social links work

## ☐ Step 7: Test Blog Post Workflow

1. [ ] Create a test blog post:
   ```bash
   # Create file: src/content/blog/test-post.mdx
   # Add frontmatter and content
   git add src/content/blog/test-post.mdx
   git commit -m "Add test blog post"
   git push origin main
   ```

2. [ ] Wait for GitHub Actions to complete
3. [ ] Verify post appears on https://tenvexai.com/blog
4. [ ] Delete test post if desired

## ☐ Step 8: Monitoring & Maintenance

- [ ] Bookmark GitHub Actions page for monitoring deployments
- [ ] Set up cPanel email notifications for app errors (optional)
- [ ] Document any custom cPanel configurations
- [ ] Schedule regular dependency updates

## Troubleshooting

If deployment fails:
1. Check GitHub Actions logs for errors
2. Verify all secrets are set correctly
3. Check FTP credentials and server path
4. Review cPanel Node.js app logs
5. Ensure server has enough resources

If site doesn't load:
1. Check Node.js app status in cPanel (should be "Running")
2. Verify domain DNS settings
3. Check SSL certificate is valid
4. Review application logs in cPanel
5. Test FTP connection manually

## Quick Reference

- **GitHub Repo**: https://github.com/TenVexAI/tenvexai-website
- **GitHub Actions**: https://github.com/TenVexAI/tenvexai-website/actions
- **Live Site**: https://tenvexai.com
- **Deployment Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Blog Guide**: [BLOG_GUIDE.md](./BLOG_GUIDE.md)

## Next Steps After Setup

1. Write your first real blog post
2. Set up analytics (Google Analytics, Plausible, etc.)
3. Create sitemap.xml for SEO
4. Set up monitoring/uptime checks
5. Plan content calendar
6. Promote on social media!

---

**Questions?** Contact: broken@tenvexai.com
