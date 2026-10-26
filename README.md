<div align="center">

<img src="icons/icon-192.png" alt="cashbook logo" width="96" height="96">

# cashbook

**A personal salary and household budget app — Arabic-first, offline-ready, installable.**

[![PWA](https://img.shields.io/badge/PWA-installable-000000?style=flat-square)](#install)
[![Offline](https://img.shields.io/badge/offline-supported-4ADE80?style=flat-square&labelColor=000000)](#offline-and-sync)
[![Languages](https://img.shields.io/badge/languages-العربية%20%7C%20English-000000?style=flat-square)](#features)
[![Stack](https://img.shields.io/badge/stack-vanilla%20JS%20%7C%20Firebase-000000?style=flat-square)](#tech-stack)

[**Open the app**](https://0xjjohn.github.io/dafter/DafteR/) · [Features](#features) · [Install](#install) · [Deploy](#deployment) · [العربية](#العربية)

</div>

---

## Overview

cashbook turns your monthly salary into a clear plan. Enter your income, add your bills, subscriptions and daily expenses, and the app shows what is left for the month and how much you can safely spend each day.

It is a single-page web app with no build step: one `index.html`, one service worker and a handful of icons. It runs in any modern browser and installs to the home screen as a standalone app.

## Features

| Area | What you get |
| --- | --- |
| **Income** | Monthly salary plus extra income entries, added from the menu on any page. |
| **Bills and subscriptions** | Upcoming bills with due dates, overdue warnings, and recurring subscriptions. |
| **Expenses** | Quick daily expense entry and a running total against your budget. |
| **Home** | Remaining balance for the month, a daily spending estimate, and what needs attention. |
| **Analysis** | A breakdown of where the money goes, month by month. |
| **Accounts** | Email and Google sign-in, with your data synced to your account. |
| **Offline** | Keep recording without a connection; changes sync automatically when you are back online. |
| **Languages** | Arabic (RTL) and English (LTR), switchable at any time. |
| **Themes** | Light and dark, with the same green accent used for money throughout. |
| **Profile** | Optional photo and name, with an in-app viewer to change or remove the photo. |
| **Privacy** | A built-in privacy and terms page, account deletion, and a full data reset. |

### Design principles

- **Arabic-first.** Layout, numerals and typography are designed for RTL, and mirrored cleanly for English.
- **Icon-only navigation.** A five-item bottom bar: Home, Commitments, Expenses, Analysis, Account.
- **One accent color.** Green is reserved for money, so figures are easy to find at a glance.
- **Calm by default.** No notifications and no nagging reminders.

## Install

cashbook is a Progressive Web App.

**Android (Chrome)**
1. Open the app link.
2. Open the browser menu and choose **Add to Home screen** or **Install app**.

**iPhone (Safari)**
1. Open the app link.
2. Tap **Share**, then **Add to Home Screen**.

> If you renamed the app or changed its icon, remove the old shortcut from the home screen and add it again. Phones keep the name and icon from install time.

## Offline and sync

- The app shell is cached by a service worker, so it opens instantly and works with no connection.
- Entries made offline are stored on the device and marked as pending.
- When the connection returns, pending changes are pushed to your account automatically.
- Signed-out users can use the app as a guest; data then stays on the device only.

## Tech stack

- **Frontend:** a single HTML file with vanilla JavaScript and CSS. No framework and no bundler.
- **Internationalization:** an in-file `I18N` dictionary (`ar`, `en`) with RTL/LTR switching.
- **Auth and sync:** Firebase Authentication (REST for email, SDK for Google) and Cloud Firestore.
- **PWA:** Web App Manifest and a service worker (`sw.js`) with versioned caches.
- **Hosting:** GitHub Pages.

## Project structure

```text
.
├── index.html              # the whole app: markup, styles, scripts, translations
├── sw.js                   # service worker: offline cache and update strategy
├── manifest.webmanifest    # PWA name, colors and icons
├── privacy.html            # privacy policy and terms
├── README.md
└── icons/
    ├── icon-192.png
    ├── icon-512.png
    ├── icon-1024.png
    ├── maskable-512.png
    ├── maskable-1024.png
    └── apple-touch-icon.png
```

## Deployment

The app is static, so any static host works. With GitHub Pages:

1. Upload the files above to the repository, keeping the `icons/` folder.
2. In **Settings → Pages**, publish from the branch that holds the files.
3. Open the published URL.

### Releasing an update

Installed copies are served from a cache, so every release must change the cache version:

1. Edit `index.html` (or any other file).
2. In `sw.js`, bump `VERSION` (for example `dafter-v65` → `dafter-v66`).
3. Upload `index.html` and `sw.js` together.
4. Open the app once to download the update in the background; the new version appears on the next launch.

### Changing icons or the app name

- The name lives in `manifest.webmanifest` (`name`, `short_name`) and in the `<title>` of `index.html`.
- Icon URLs carry a version query (`?v=3`) in `manifest.webmanifest`, `index.html` and `sw.js`. Increase it whenever the icon images change, so phones fetch the new files.
- The Android splash screen shown while the app opens is drawn by the operating system from the manifest icon and background color. It cannot be customized from the web app.

## Browser support

Current versions of Chrome, Edge, Firefox and Safari. Installation as an app is supported on Android (Chrome) and iOS (Safari).

## Privacy

Data is stored on your device and, when you sign in, in your own account. The full policy is available in the app under **Account → Terms and privacy**, and in [`privacy.html`](privacy.html). Before publishing the app to others, fill in the operator name, contact email and date placeholders in that file.

---

## العربية

<div dir="rtl">

### نظرة عامة

**cashbook** تطبيق شخصي لتنظيم المرتب وميزانية البيت. تدخل مرتبك، وتضيف الفواتير والاشتراكات والمصروفات اليومية، فيعرض لك التطبيق المتبقي من الشهر وكم تقدر تصرف كل يوم بأمان.

التطبيق صفحة واحدة بدون أي خطوة بناء: ملف `index.html` وملف خدمة التشغيل `sw.js` وأيقونات. يعمل على أي متصفح حديث ويُثبَّت على الشاشة الرئيسية كتطبيق مستقل.

### المميزات

- **الدخل:** مرتب شهري ودخل إضافي، يُضافان من قائمة الثلاث نقاط في أي صفحة.
- **الالتزامات:** فواتير بمواعيد استحقاق وتنبيه بالمتأخر، واشتراكات متكررة.
- **المصروفات:** تسجيل سريع للمصروف اليومي ومقارنته بالميزانية.
- **الرئيسية:** المتبقي من الشهر وتقدير الصرف اليومي وما يحتاج انتباهك.
- **التحليل:** أين يذهب مالك شهرًا بشهر.
- **الحساب:** دخول بالبريد الإلكتروني أو Google ومزامنة بياناتك مع حسابك.
- **بدون إنترنت:** سجّل بدون اتصال وتتم المزامنة تلقائيًا عند عودته.
- **اللغتان والمظهران:** عربي (من اليمين لليسار) وإنجليزي، فاتح وداكن.
- **الملف الشخصي:** صورة واسم اختياريان.
- **الخصوصية:** صفحة شروط وخصوصية داخل التطبيق، وحذف الحساب ومسح كل البيانات.

### التثبيت

- **أندرويد (Chrome):** افتح الرابط، ثم من القائمة اختر **إضافة إلى الشاشة الرئيسية** أو **تثبيت التطبيق**.
- **آيفون (Safari):** افتح الرابط، اضغط **مشاركة** ثم **إضافة إلى الشاشة الرئيسية**.

> لو غيّرت اسم التطبيق أو أيقونته، امسح الاختصار القديم من الشاشة الرئيسية وأضفه من جديد. الهاتف يحتفظ بالاسم والأيقونة وقت التثبيت.

### النشر والتحديث

1. ارفع الملفات إلى المستودع مع الحفاظ على فولدر `icons`.
2. فعّل **GitHub Pages** من **Settings → Pages**.
3. عند كل تحديث: عدّل الملفات، ثم **ارفع رقم `VERSION` في `sw.js`**، وارفع `index.html` و`sw.js` معًا.
4. افتح التطبيق مرة لتنزيل التحديث في الخلفية، وسيظهر في الفتحة التالية.

### ملاحظات

- شاشة الفتح الأولى (أيقونة التطبيق على خلفية سوداء) يرسمها نظام أندرويد نفسه من أيقونة الـ manifest، ولا يمكن تخصيصها من داخل الموقع.
- عند تغيير صور الأيقونات، ارفع رقم `?v=` في `manifest.webmanifest` و`index.html` و`sw.js` لتصل الأيقونات الجديدة للهواتف.

</div>

---

<div align="center">

Made with care for people who want to know where their salary goes.

</div>
