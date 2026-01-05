# Google OAuth Setup Guide - Complete Walkthrough

This guide will walk you through setting up Google OAuth for EazyGO, from localhost testing to production deployment.

## 📋 Table of Contents
1. [Part 1: Google Cloud Console Setup](#part-1-google-cloud-console-setup)
2. [Part 2: Localhost Configuration](#part-2-localhost-configuration)
3. [Part 3: Vercel Deployment](#part-3-vercel-deployment)
4. [Part 4: Custom Domain (Hostinger/Namecheap)](#part-4-custom-domain-hostingernamecheap)
5. [Troubleshooting](#troubleshooting)

---

## Part 1: Google Cloud Console Setup

### Step 1: Create a Google Cloud Project

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create a New Project**
   - Click the project dropdown at the top (next to "Google Cloud")
   - Click "NEW PROJECT"
   - Project name: `EazyGO` (or any name you prefer)
   - Organization: Leave as default (No organization)
   - Click "CREATE"
   - Wait for the project to be created (takes ~30 seconds)

3. **Select Your Project**
   - Click the project dropdown again
   - Select "EazyGO" from t\he list

### Step 2: Enable Google+ API

1. **Go to APIs & Services**
   - In the left sidebar, click "APIs & Services" → "Enabled APIs & Services"
   - Or search for "APIs & Services" in the top search bar

2. **Enable Required APIs**
   - Click "+ ENABLE APIS AND SERVICES" at the top
   - Search for "Google+ API"
   - Click on "Google+ API"
   - Click "ENABLE"
   - Wait for it to enable (~10 seconds)

### Step 3: Configure OAuth Consent Screen

1. **Go to OAuth Consent Screen**
   - Left sidebar: "APIs & Services" → "OAuth consent screen"

2. **Choose User Type**
   - Select "External" (allows anyone with a Google account to sign in)
   - Click "CREATE"

3. **Fill in App Information**

   **App information:**
   - App name: `EazyGO`
   - User support email: Your email address (select from dropdown)
   - App logo: (Optional - skip for now)

   **App domain (Optional for testing):**
   - Skip for now (you can add later when you have a domain)

   **Developer contact information:**
   - Email addresses: Your email address

   - Click "SAVE AND CONTINUE"

4. **Scopes**
   - Click "ADD OR REMOVE SCOPES"
   - Select these scopes:
     - `userinfo.email`
     - `userinfo.profile`
     - `openid`
   - Click "UPDATE"
   - Click "SAVE AND CONTINUE"

5. **Test Users** (Important for development!)
   - Click "ADD USERS"
   - Add your email address and any other emails you want to test with
   - Click "ADD"
   - Click "SAVE AND CONTINUE"

6. **Summary**
   - Review your settings
   - Click "BACK TO DASHBOARD"

### Step 4: Create OAuth 2.0 Credentials

1. **Go to Credentials**
   - Left sidebar: "APIs & Services" → "Credentials"

2. **Create Credentials**
   - Click "+ CREATE CREDENTIALS" at the top
   - Select "OAuth client ID"

3. **Configure OAuth Client**

   **Application type:**
   - Select "Web application"

   **Name:**
   - Name: `EazyGO Web Client` (or any name)

   **Authorized JavaScript origins:**
   - Click "ADD URI"
   - Add: `http://localhost:3000`
   - (We'll add more URLs later for production)

   **Authorized redirect URIs:**
   - Click "ADD URI"
   - Add: `http://localhost:3000/api/auth/callback/google`
   - ⚠️ **Important:** Make sure this is EXACT - no trailing slash!

   - Click "CREATE"

4. **Copy Your Credentials**
   - A popup will show your credentials
   - **Client ID**: Copy this (looks like: `123456789-abc123.apps.googleusercontent.com`)
   - **Client Secret**: Copy this (looks like: `GOCSPX-abc123xyz`)
   - Click "OK"

   - 💡 **Tip:** You can always access these later by clicking on your OAuth client in the Credentials page

---

## Part 2: Localhost Configuration

### Step 1: Update Environment Variables

1. **Open your `.env.local` file**
   ```bash
   # In your EazyGO project folder
   code .env.local
   ```

2. **Replace the Google OAuth placeholders**
   ```env
   # Database - Supabase PostgreSQL (Session Pooler)
   DATABASE_URL="postgresql://postgres.mjxwcrhwvgwqnayrhdym:EazyGoPassword30%24@aws-1-eu-west-1.pooler.supabase.com:5432/postgres"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="HjIzbP2qWSaB1seZCyJxI2CEFLKdNmUNTuZPu+sMVjg="

   # Google OAuth - REPLACE THESE WITH YOUR ACTUAL VALUES!
   GOOGLE_CLIENT_ID="YOUR-ACTUAL-CLIENT-ID-HERE.apps.googleusercontent.com"
   GOOGLE_CLIENT_SECRET="YOUR-ACTUAL-CLIENT-SECRET-HERE"
   ```

3. **Save the file**

### Step 2: Test Google OAuth on Localhost

1. **Restart your development server**
   ```bash
   # Stop the current server (Ctrl+C)
   # Start it again
   npm run dev
   ```

2. **Test the Google Sign-In**

   **For Login:**
   - Go to: http://localhost:3000/auth/login
   - Click "Sign in with Google"
   - You should see the Google sign-in popup
   - Select your account
   - You'll be redirected back and logged in!

   **For Registration:**
   - Go to: http://localhost:3000/auth/register/client
   - Click "Sign up with Google"
   - Same process as above

3. **Verify it worked**
   - You should be redirected to the dashboard
   - Check your database - a new user should be created
   - The user should have your Google email and name

### Troubleshooting Localhost

**Error: "redirect_uri_mismatch"**
- ✅ Check that the redirect URI in Google Console is EXACTLY: `http://localhost:3000/api/auth/callback/google`
- ✅ No trailing slash, no extra characters
- ✅ Make sure you're using `http://` not `https://`

**Error: "Access blocked: This app's request is invalid"**
- ✅ Make sure you added your email as a test user in OAuth consent screen
- ✅ The app is in "Testing" mode - only test users can sign in

**Error: "Google+ API has not been used"**
- ✅ Go back and enable the Google+ API (Step 2 above)

---

## Part 3: Vercel Deployment

### Step 1: Prepare for Deployment

1. **Make sure all code is committed**
   ```bash
   git add .
   git commit -m "Complete Phase 1 with Google OAuth"
   git push origin main
   ```

2. **Create a Vercel account**
   - Go to: https://vercel.com/signup
   - Sign up with GitHub (recommended)

### Step 2: Deploy to Vercel

1. **Import Your Project**
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (default)

2. **Configure Environment Variables**
   - Before deploying, click "Environment Variables"
   - Add each variable from your `.env.local`:

   ```
   DATABASE_URL = your-database-url
   NEXTAUTH_URL = https://your-app.vercel.app (Vercel will tell you this URL)
   NEXTAUTH_SECRET = your-secret
   GOOGLE_CLIENT_ID = your-google-client-id
   GOOGLE_CLIENT_SECRET = your-google-client-secret
   ```

   - ⚠️ **Important:** Change `NEXTAUTH_URL` to your Vercel URL!

3. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - You'll get a URL like: `https://eazygo.vercel.app`

### Step 3: Update Google OAuth for Vercel

1. **Go back to Google Cloud Console**
   - Navigate to: Credentials → Your OAuth Client

2. **Add Vercel URLs**

   **Authorized JavaScript origins:**
   - Click "ADD URI"
   - Add: `https://your-app.vercel.app` (replace with your actual Vercel URL)

   **Authorized redirect URIs:**
   - Click "ADD URI"
   - Add: `https://your-app.vercel.app/api/auth/callback/google`

   - Click "SAVE"

3. **Update Vercel Environment Variables**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Update `NEXTAUTH_URL` to: `https://your-app.vercel.app`
   - Redeploy: Deployments → Click "..." → Redeploy

4. **Test on Vercel**
   - Visit: `https://your-app.vercel.app`
   - Try signing in with Google
   - Should work perfectly!

---

## Part 4: Custom Domain (Hostinger/Namecheap)

### Prerequisites
- A domain name purchased (e.g., `eazygo.com` from Namecheap/Hostinger)
- Vercel project already deployed

### Option A: Using Vercel with Custom Domain

This is the **recommended** approach - host on Vercel with your custom domain.

#### Step 1: Add Domain to Vercel

1. **In Vercel Dashboard**
   - Go to your project → Settings → Domains
   - Click "Add"
   - Enter your domain: `eazygo.com`
   - Click "Add"

2. **Configure DNS**
   - Vercel will show you DNS records to add
   - Copy the A record or CNAME record

3. **Update DNS in Namecheap/Hostinger**

   **For Namecheap:**
   - Go to: Domain List → Manage → Advanced DNS
   - Add the A record or CNAME as shown by Vercel

   **For Hostinger:**
   - Go to: Domains → DNS / Name Servers
   - Add the A record or CNAME as shown by Vercel

4. **Wait for DNS propagation** (can take up to 48 hours, usually ~1 hour)

5. **Verify Domain**
   - Back in Vercel, click "Verify"
   - Once verified, you can access your app at `https://eazygo.com`

#### Step 2: Update Google OAuth for Custom Domain

1. **Add Custom Domain to Google Console**

   **Authorized JavaScript origins:**
   - Add: `https://eazygo.com`

   **Authorized redirect URIs:**
   - Add: `https://eazygo.com/api/auth/callback/google`

   - Click "SAVE"

2. **Update Vercel Environment Variables**
   - Change `NEXTAUTH_URL` to: `https://eazygo.com`
   - Redeploy

3. **Test Your Custom Domain**
   - Visit: `https://eazygo.com`
   - Test Google sign-in
   - 🎉 Everything should work!

### Option B: Self-Hosting on Hostinger/Namecheap

If you want to host the Next.js app directly on Hostinger/Namecheap:

⚠️ **Note:** This is more complex and requires:
- VPS or dedicated server (shared hosting won't work for Next.js)
- Node.js installed
- PM2 or similar process manager
- Nginx as reverse proxy
- SSL certificate setup

**Recommended Reading:**
- [Deploying Next.js to a VPS](https://nextjs.org/docs/deployment)
- Most developers use Vercel for Next.js apps - it's easier!

---

## Summary: Your Complete Setup Journey

### 1. Local Development (Now)
```
✅ Google Cloud Console setup
✅ OAuth credentials created
✅ .env.local configured
✅ localhost:3000 working with Google OAuth
```

### 2. Vercel Staging (Next)
```
□ Deploy to Vercel
□ Add Vercel URL to Google OAuth
□ Update NEXTAUTH_URL
□ Test on vercel.app domain
```

### 3. Production with Custom Domain (Final)
```
□ Add custom domain to Vercel
□ Configure DNS records
□ Add custom domain to Google OAuth
□ Update NEXTAUTH_URL
□ Test on your domain
```

---

## Quick Reference: All URLs You'll Need

### Google OAuth Redirect URIs
```
# Development
http://localhost:3000/api/auth/callback/google

# Vercel
https://eazygo.vercel.app/api/auth/callback/google

# Custom Domain
https://eazygo.com/api/auth/callback/google
```

### NEXTAUTH_URL Values
```
# Development
NEXTAUTH_URL="http://localhost:3000"

# Vercel
NEXTAUTH_URL="https://eazygo.vercel.app"

# Custom Domain
NEXTAUTH_URL="https://eazygo.com"
```

---

## Important Security Notes

1. **Never commit `.env.local` to Git** - It's already in `.gitignore`
2. **Use different `NEXTAUTH_SECRET` for production** - Generate a new one with:
   ```bash
   openssl rand -base64 32
   ```
3. **Keep your Google Client Secret secure** - Don't share it
4. **Verify redirect URIs** - Only add URIs you control

---

## Need Help?

If you run into issues:
1. Check the [Troubleshooting](#troubleshooting) section
2. Verify all URLs are EXACT (no typos, trailing slashes, etc.)
3. Make sure you added yourself as a test user
4. Check Vercel deployment logs for errors
5. Verify environment variables are set correctly

---

## Next Steps

1. ✅ Complete Part 1 & 2 (Localhost setup)
2. Test thoroughly on localhost
3. Move to Part 3 when ready to deploy
4. Set up custom domain when you're ready to go live

Good luck! 🚀
