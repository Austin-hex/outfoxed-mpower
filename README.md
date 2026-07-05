# Team Outfoxed — MPOWER site

A mobile-first website for your MPOWER group: home page with session photo, team, gallery, marks/scoreboard, and an admin panel to manage everything.

## What changed
Firebase now requires a paid (Blaze) plan just to use Cloud Storage, even for tiny amounts of data. To keep this fully free, photo uploads now go through **Cloudinary** instead. Firestore (your database, for marks/team/gallery info) and Firebase Authentication (admin login) are unaffected and still free.

## Step 1 — Set up Cloudinary (free, no card required)
1. Go to https://cloudinary.com/users/register/free and sign up
2. Once in your dashboard, find your **Cloud name** at the top (e.g. `dxyz1234`)
3. Go to **Settings** (gear icon) → **Upload** tab → scroll to **Upload presets** → **Add upload preset**
4. Set **Signing Mode** to **Unsigned** → Save
5. Copy the preset name it gives you (e.g. `ml_default` or whatever you name it)
6. Open `src/cloudinary.js` in this project and fill in:
```js
export const CLOUD_NAME = 'your-cloud-name-here'
export const UPLOAD_PRESET = 'your-preset-name-here'
```

## Step 2 — Firebase setup (Firestore + Auth only)
1. Firebase console → **Firestore Database** → Create database → production mode → pick a region close to India (`asia-south1`) → Enable
2. Firestore Database → **Rules** tab → paste the contents of `firestore.rules` from this project → Publish
3. **Authentication** → Get started → Sign-in method tab → enable **Email/Password**
4. Authentication → **Users** tab → Add user → this is your admin login for `/admin`

You do NOT need to set up Firebase Storage at all — skip it entirely.

## Run it locally
```
npm install
npm run dev
```
Open the local URL it prints (usually `http://localhost:5173`).

## Deploy for free (Netlify)
1. Push this project to a GitHub repo (or run `npm run build` and drag the `dist` folder onto https://app.netlify.com/drop)
2. If using GitHub: https://app.netlify.com → **Add new site** → **Import an existing project** → pick your repo
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Netlify gives you a free URL like `outfoxed-mpower.netlify.app` — rename it under Site settings → Change site name

## Using the admin panel
1. Go to `yoursite.netlify.app/admin`
2. Log in with the email/password from Firebase Authentication → Users
3. Use the tabs to add marks, upload gallery photos, add team members, or replace the session/hero photo

## Generating the QR code
Once your site is live, paste the URL into any free QR generator (e.g. qr-code-generator.com) and download the image for your badge.
