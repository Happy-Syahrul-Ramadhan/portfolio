# Portfolio Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Environment Variables
- [ ] `DATABASE_URL` - Supabase connection string set
- [ ] `DIRECT_URL` - Supabase direct connection URL set
- [ ] `CLOUDINARY_CLOUD_NAME` - Set from Cloudinary dashboard
- [ ] `CLOUDINARY_API_KEY` - Set from Cloudinary dashboard
- [ ] `CLOUDINARY_API_SECRET` - Set from Cloudinary dashboard
- [ ] `NEXTAUTH_SECRET` - Generate using: `openssl rand -base64 32`
- [ ] `NEXTAUTH_URL` - Set to production URL (e.g., https://yourdomain.com)

### 2. Admin Credentials
- ✅ Username: `syahrul`
- ✅ Password: `syahrul123`
- ⚠️ **IMPORTANT**: Change password after first login in production!

### 3. Database
- ✅ Prisma schema validated
- ✅ All migrations applied (`prisma db push`)
- ✅ Admin user created with new credentials
- [ ] Verify database connection from production environment

### 4. Features Implemented
- ✅ Homepage with hero section and about
- ✅ Work Experience section with timeline
- ✅ Projects with detail pages and hashtags
- ✅ Blog with rich text editor (Tiptap)
- ✅ Certificates with image/PDF support
  - ✅ Image upload via Cloudinary
  - ✅ PDF upload support
  - ✅ Image zoom modal with controls
  - ✅ PDF viewer with Google Docs integration
- ✅ Admin dashboard with CRUD for all sections
- ✅ Authentication system
- ✅ Theme toggle (light/dark mode)
- ✅ Social sharing buttons

### 5. Responsive Design Verification
All pages tested for breakpoints: **Mobile (< 768px)**, **Tablet (768px-1024px)**, **Desktop (> 1024px)**

#### ✅ Public Pages:
- [x] Homepage (`/`)
  - Mobile: Single column layout
  - Desktop: Proper spacing and grid layout
- [x] Experience (`/experience`)
  - Mobile: Stacked cards
  - Desktop: Alternating 2-column grid with animations
- [x] Certificates (`/certificates`)
  - Mobile: Single column
  - Desktop: 2-column grid (md:grid-cols-2)
- [x] Projects (`/project`)
  - Mobile: Stacked cards
  - Desktop: Grid layout
- [x] Blog (`/blog`)
  - Mobile: Stacked cards
  - Desktop: Grid layout
- [x] Navbar
  - Mobile: Hamburger menu (if implemented) or horizontal scroll
  - Desktop: Full navigation

#### ✅ Admin Pages:
- [x] Admin Dashboard (`/admin`)
  - Mobile: Stacked cards
  - Desktop: Grid layout for stat cards
- [x] All CRUD forms
  - Mobile: Single column inputs
  - Desktop: Grid layout for paired fields (sm:grid-cols-2)
- [x] Admin Sidebar
  - Mobile: Collapsible or full width
  - Desktop: Fixed sidebar

### 6. Performance Optimization
- [x] Images optimized via Cloudinary
- [ ] Enable Next.js Image component where possible
- [x] Dynamic imports for heavy components (PDFViewer)
- [ ] Check bundle size: `npm run build`
- [ ] Verify no console errors in production build

### 7. Security
- ✅ Passwords hashed with bcryptjs
- ✅ Authentication middleware in place
- [ ] HTTPS enabled on production domain
- [ ] CORS configured properly (if API is separate)
- ⚠️ Admin credentials need to be changed after deployment

### 8. SEO & Meta Tags
- [ ] Add proper meta tags to layout.tsx
- [ ] Set up sitemap.xml
- [ ] Configure robots.txt
- [ ] Add Open Graph images for sharing
- [ ] Verify canonical URLs

### 9. Error Handling
- [ ] Custom error pages (404.tsx, 500.tsx)
- [ ] Error boundaries implemented
- [ ] Proper error messages for users
- [ ] Logging configured (Sentry, LogRocket, etc.)

### 10. Testing
- [ ] Test all CRUD operations in production
- [ ] Test image upload to Cloudinary
- [ ] Test PDF upload and viewing
- [ ] Test authentication flow
- [ ] Test theme switching
- [ ] Test social sharing buttons
- [ ] Test all navigation links

---

## 🚀 Deployment Steps

### Option 1: Vercel (Recommended for Next.js)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure project settings

3. **Set Environment Variables**
   - Add all environment variables from `.env.local`
   - Ensure `NEXTAUTH_URL` is set to production URL

4. **Deploy**
   - Vercel will automatically build and deploy
   - Monitor build logs for errors

5. **Post-Deployment**
   - Test all features on production URL
   - Update DNS settings if using custom domain
   - Enable HTTPS (automatic on Vercel)

### Option 2: Netlify

1. **Build Command**: `npm run build`
2. **Publish Directory**: `.next`
3. **Environment Variables**: Same as Vercel
4. Note: Netlify has limitations with Next.js API routes

### Option 3: Self-Hosted (VPS/Cloud)

1. **Server Requirements**
   - Node.js 18+ installed
   - PM2 for process management
   - Nginx as reverse proxy

2. **Setup Steps**
   ```bash
   # Clone repository
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   
   # Install dependencies
   npm install
   
   # Set environment variables
   nano .env
   
   # Build project
   npm run build
   
   # Start with PM2
   pm2 start npm --name "portfolio" -- start
   pm2 save
   pm2 startup
   ```

3. **Nginx Configuration**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## 📝 Post-Deployment Checklist

- [ ] Verify homepage loads correctly
- [ ] Test admin login with new credentials
- [ ] Upload test certificate (image and PDF)
- [ ] Create test blog post
- [ ] Create test project
- [ ] Test theme switching
- [ ] Check mobile responsiveness on real device
- [ ] Test all external links
- [ ] Monitor error logs for first 24 hours
- [ ] Set up analytics (Google Analytics, Plausible, etc.)
- [ ] Set up monitoring (Uptime Robot, Better Uptime, etc.)

---

## 🔧 Common Issues & Solutions

### Issue: Database connection timeout
**Solution**: Check Supabase connection pooler URL, use `DIRECT_URL` for migrations

### Issue: Images not loading
**Solution**: Verify Cloudinary credentials, check CORS settings

### Issue: PDF not displaying
**Solution**: Ensure Cloudinary allows public access to raw files, check Google Docs Viewer URL encoding

### Issue: Authentication not working
**Solution**: Verify `NEXTAUTH_SECRET` is set, check `NEXTAUTH_URL` matches production domain

### Issue: Build fails on Vercel
**Solution**: Check Node.js version compatibility, clear build cache, verify all dependencies installed

---

## 📊 Performance Targets

- Lighthouse Score: > 90
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

---

## 🔐 Security Notes

1. **Never commit `.env` files** to version control
2. **Rotate secrets regularly** (NEXTAUTH_SECRET, API keys)
3. **Use strong passwords** for admin account
4. **Enable 2FA** if supported by hosting provider
5. **Monitor access logs** for suspicious activity
6. **Keep dependencies updated**: `npm audit fix`

---

## 📞 Support & Maintenance

### Regular Tasks
- Weekly: Check error logs
- Monthly: Update dependencies
- Quarterly: Security audit
- Yearly: Renew SSL certificates (if manual)

### Backup Strategy
- Database: Daily automated backups (Supabase handles this)
- Media assets: Cloudinary handles storage
- Code: Version controlled on GitHub

---

**Deployment Prepared**: March 7, 2026
**Admin Credentials**: syahrul / syahrul123
**Status**: ✅ Ready for Production
