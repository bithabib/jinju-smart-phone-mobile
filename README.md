# Jinju Smart Phone Mobile · 진주중고폰

A clean, bilingual (한국어 / English) website for **Jinju Smart Phone Mobile**, built with **React + Vite** and **Firebase**.

## ✨ What's included

| Feature | Where |
|---|---|
| Bilingual UI (Korean ⇄ English toggle, top-right) | every page |
| Home — hero, **3–4 featured offers**, social channels, contact + map | `/` |
| Owner-editable offers (add / edit / delete, 3–4 products) | `/admin` |
| Digital **Sell Entry Sheet** (the paper form, digitized) + CSV export | `/sell` |
| **Link hub** — all social media in one place (the QR points here) | `/links` |
| **Single QR code** generator — print one QR for all links | `/qr` |
| Live data via Firebase, with automatic offline/demo fallback | — |

Social channels wired in: Facebook (page + profile), Instagram, TikTok, WhatsApp, KakaoTalk, and a call button.

---

## 🚀 Run it locally

```bash
npm install
npm run dev
```

Open the URL it prints (usually <http://localhost:5173>).

> Out of the box the site runs in **demo mode** — offers and sell entries are saved
> in your browser (localStorage), so you can try everything immediately without any setup.

To build for hosting:

```bash
npm run build      # output goes to /dist
npm run preview    # preview the production build
```

---

## 🔥 Connect Firebase (so data syncs across all devices)

Demo mode only stores data in one browser. To make offers and the sell sheet shared
and permanent, connect a free Firebase project (5 minutes):

1. Go to <https://console.firebase.google.com> → **Add project**.
2. Inside the project, click **Build → Firestore Database → Create database** (Start in *production* mode, pick a region near Korea, e.g. `asia-northeast3`).
3. Click the **⚙ → Project settings**, scroll to **Your apps**, click the **Web `</>`** icon, register the app, and copy the `firebaseConfig` values.
4. Paste them into **`src/firebase.js`**, replacing every `"REPLACE_ME"`:

   ```js
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "1234567890",
     appId: "1:1234567890:web:abc123",
   };
   ```

5. In Firestore → **Rules**, paste the rules below and **Publish**:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Anyone can READ the featured offers (so visitors see them).
       match /offers/{id} {
         allow read: if true;
         allow write: if true;   // ⚠ see the security note below
       }
       // Sell sheet is private business data.
       match /sales/{id} {
         allow read, write: if true;  // ⚠ see the security note below
       }
     }
   }
   ```

That's it — restart `npm run dev` and data now lives in the cloud.

### 🔒 Security note (important for the sell sheet)

The rules above allow public writes, which is fine to get started but means anyone who
knows your project could write data. The site already protects the **/admin** and **/sell**
pages with a passcode (see below), but for real protection of the private sell sheet you
should enable **Firebase Authentication → Email/Password**, create one owner account, and
change the rules to `allow read, write: if request.auth != null;`. Ask your developer to
wire `signInWithEmailAndPassword` into `src/components/Gate.jsx` when you're ready.

---

## 🔑 Owner passcode

The **Admin** (manage offers) and **Sell Sheet** pages are protected by a passcode.

- Default passcode: **`jinju1434`**
- Change it in **`src/config.js`** → `ADMIN_PASSCODE`.

---

## ✏️ Changing common things

| I want to… | Edit |
|---|---|
| Change phone / address / email / bank / Kakao ID | `src/config.js` → `BUSINESS` |
| Change a social media link | `src/config.js` → `LINKS` |
| Change the owner passcode | `src/config.js` → `ADMIN_PASSCODE` |
| Add / edit / remove featured offers | log in at **/admin** in the live site |
| Translate or reword any text | `src/i18n.jsx` |
| Swap images | replace files in `public/img/` |

---

## 🏷️ The single QR code

1. Deploy the site (below) so it has a public web address.
2. Open the **`/qr`** page on the live site.
3. Click **Download QR (PNG)** (or **Print**).
4. Print and display that one QR in the shop. When anyone scans it, they land on the
   **Link hub** (`/links`) with buttons for Facebook, Instagram, TikTok, WhatsApp,
   KakaoTalk and a call button — they tap whichever they want.

> The QR encodes your live `/links` URL, so generate it **after** deploying (or paste your
> final URL into the box on the `/qr` page before downloading).

---

## ☁️ Deploy (free) with Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting     # choose your project, set public dir to "dist", SPA = Yes
npm run build
firebase deploy
```

You'll get a public URL like `https://your-project.web.app`. (Netlify or Vercel also work —
just build and drop the `dist` folder; the app uses hash routing so no extra config is needed.)

---

## 🗂️ Project structure

```
src/
  config.js            business info, links, passcode, default offers
  i18n.jsx             Korean/English strings + language toggle
  firebase.js          data layer (Firestore + localStorage fallback)
  App.jsx, main.jsx    app shell & routes
  components/          Navbar, Footer, Icons, Gate (passcode)
  pages/               Home, Links, QR, Admin, Sell
public/img/            shop images (business card, Kakao QR, etc.)
```

Built for Muhammad Nadeem · Jinju Smart Phone Mobile.
