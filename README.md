<div align="center">

# دفتر · Dftr

**A personal budget app that works in Arabic and English, right from your phone's home screen.**
**تطبيق ميزانية شخصية بالعربي والإنجليزي، يشتغل من شاشة موبايلك الرئيسية.**

[**Live demo →**](https://0xjjohn.github.io/dafter/DafteR/)

![Platform](https://img.shields.io/badge/platform-PWA-000000)
![Stack](https://img.shields.io/badge/stack-HTML%20%C2%B7%20CSS%20%C2%B7%20JS-000000)
![Dependencies](https://img.shields.io/badge/dependencies-none-000000)
![Offline](https://img.shields.io/badge/offline-supported-000000)

</div>

---

## Overview

**DafteR** ("دفتر", Arabic for *notebook*) helps you see where your salary goes. Enter your income, add the bills and subscriptions you pay every month, log what you spend day to day, and the app shows what is left, what is coming due, and where most of your money goes.

It is a single static page with **no backend, no account, and no dependencies**. Your data stays on your device.

## Features

| Area | What you get |
| --- | --- |
| **Home** | Remaining balance for the month, upcoming payments, and a quick summary of income vs. spending. |
| **Bills & subscriptions** | One list for fixed commitments, with due days, paid/unpaid status, and weekly/monthly/yearly subscription cycles. |
| **Spending** | Fast expense entry: pick from ready-made expense types, or write each item by hand. |
| **Insights** | Cumulative spending chart against your expected pace, a 6-month history, and a card showing what you spend the most on, either a single item with its category or a whole category, with its share of the month. |
| **Plan** | Monthly salary and extra income, plus your own categories with an allowed limit for each. |
| **Reminders** | Before-due and due-day reminders for bills and subscriptions, with one-tap Google Calendar links. |

**Also**

- Arabic and English with full right-to-left layout
- Light and dark themes, following your device by default
- Installable on iPhone and Android, and works offline
- Black-and-white interface with green money figures for quick scanning
- Accessible charts: tooltips, keyboard support, and a table view

## Install on your phone

1. Open the live demo in **Safari** (iPhone) or **Chrome** (Android).
2. **iPhone:** tap Share → **Add to Home Screen**.
   **Android:** tap ⋮ → **Install app**.
3. Launch **دفتر** from your home screen.

## Run locally

No build step is needed.

```bash
git clone https://github.com/0xjjohn/dafter.git
cd dafter/DafteR
python3 -m http.server 8000
```

Then open <http://localhost:8000>. A local server is needed (instead of opening the file directly) so the service worker can register.

## Project structure

```text
DafteR/
├── index.html              # The whole app: markup, styles, and logic
├── manifest.webmanifest    # PWA metadata: name, icons, display mode
├── sw.js                   # Service worker for offline use
└── icons/                  # App icons (192, 512, maskable, Apple touch)
```

## Data and privacy

- All data is stored in your browser's `localStorage`, on your device only.
- Nothing is sent to a server, and there is no tracking.
- Clearing your browser data erases your budget. Data is not synced between devices.

## Updating the app

After changing `index.html`, bump the `VERSION` constant at the top of `sw.js` (for example `dafter-v2`) so installed copies pick up the update.

## Roadmap

- [ ] Export and import data (backup)
- [ ] Native iOS and Android apps
- [ ] Optional bank and SMS linking

## License

All rights reserved © 2026. The source is published for viewing. Please do not copy, modify, or redistribute it without permission.

---

<div dir="rtl">

## نبذة بالعربي

**دفتر** تطبيق بسيط يوريك راتبك رايح فين. سجّل دخلك، وضيف فواتيرك واشتراكاتك الشهرية، وسجّل مصروفاتك اليومية، وهو هيعرفك المتبقي معاك، وإيه اللي قرب ميعاده، وأكتر حاجة بتصرف فيها.

- شغال بالعربي والإنجليزي، فاتح وداكن
- بيتثبّت على الموبايل ويشتغل من غير إنترنت
- بياناتك بتفضل على جهازك ومش بتترفع في أي مكان

</div>
