/* دفتر - خدمة التشغيل بدون إنترنت. غيّر رقم النسخة عند تحديث الملفات لكي يحصل الهاتف على التحديث. */
const VERSION = "dafter-v45";
const FONTS = "dafter-fonts";
const FILES = ["./", "index.html", "privacy.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "icons/apple-touch-icon.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES).then(() => Promise.all(["icons/badge-96.png", "icons/notif-banner.png"].map((u) => c.add(u).catch(() => {}))))).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION && k !== FONTS).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const host = new URL(req.url).hostname;
  /* خط Roboto: نخزّنه عند أول تحميل ليعمل بدون إنترنت */
  if (host === "fonts.googleapis.com" || host === "fonts.gstatic.com") {
    e.respondWith(caches.open(FONTS).then((c) => c.match(req).then((hit) => {
      const net = fetch(req).then((r) => { if (r && (r.ok || r.type === "opaque")) c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    })));
    return;
  }
  if (new URL(req.url).origin !== location.origin) return;
  /* الصفحة: جرّب الشبكة أولًا (لتصل التحديثات)، وإن لم يوجد اتصال فاستخدم النسخة المخزنة */
  if (req.mode === "navigate") {
    /* الشبكة أولًا لكن بمهلة 4 ثوانٍ، وبعدها النسخة المخزنة لتعمل الصفحة عند ضعف الاتصال أو انقطاعه */
    const net = fetch(req).then((r) => { const copy = r.clone(); caches.open(VERSION).then((c) => c.put("index.html", copy)); return r; });
    const slow = new Promise((res) => setTimeout(() => res(null), 4000));
    e.respondWith(
      Promise.race([net.catch(() => null), slow]).then((r) => r || caches.match("index.html").then((hit) => hit || net))
    );
    return;
  }
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
});

/* الضغط على أي إشعار يفتح التطبيق */
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
    for (const c of list) { if ("focus" in c) return c.focus(); }
    return self.clients.openWindow("./");
  }));
});

/* تذكير تسجيل المصروفات حين يكون التطبيق مغلقًا (يشغّله النظام دوريًا، ولا يضمن توقيتًا دقيقًا) */
const SLOTS = [{ id: "m", h: 14, ar: "لم تسجّل أي مصروف اليوم. أضف ما صرفته قبل أن تنساه.", en: "You haven't logged any expense today. Add it before you forget." },
               { id: "e", h: 21, ar: "قبل أن ينتهي اليوم، سجّل مصروفاتك لتبقى ميزانيتك دقيقة.", en: "Before the day ends, log your expenses to keep your budget accurate." }];
function remDb() {
  return new Promise((res, rej) => { const r = indexedDB.open("dafter-rem", 1); r.onupgradeneeded = () => r.result.createObjectStore("s"); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
}
function remGet(db) { return new Promise((res) => { const q = db.transaction("s").objectStore("s").get("state"); q.onsuccess = () => res(q.result); q.onerror = () => res(null); }); }
function remPut(db, v) { return new Promise((res) => { const q = db.transaction("s", "readwrite").objectStore("s").put(v, "state"); q.onsuccess = () => res(); q.onerror = () => res(); }); }
async function remind() {
  const db = await remDb(); const st = await remGet(db);
  if (!st || !st.on) return;
  const d = new Date(), p = (n) => String(n).padStart(2, "0");
  const iso = d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
  const shown = st.shownDay === iso ? (st.shown || []) : [];
  const due = SLOTS.filter((x) => d.getHours() >= x.h && shown.indexOf(x.id) < 0);
  if (!due.length) return;
  due.forEach((x) => shown.push(x.id));
  await remPut(db, Object.assign({}, st, { shownDay: iso, shown }));
  if ((st.days || []).indexOf(iso) >= 0) return;
  const ar = st.lang !== "en", x = due[due.length - 1];
  await self.registration.showNotification(ar ? "سجّل مصروفات اليوم" : "Log today's expenses", {
    body: ar ? x.ar : x.en, icon: "icons/icon-192.png", badge: "icons/badge-96.png", image: "icons/notif-banner.png", tag: "dafter-day", lang: ar ? "ar" : "en", dir: ar ? "rtl" : "ltr"
  });
}
self.addEventListener("periodicsync", (e) => { if (e.tag === "dafter-remind") e.waitUntil(remind().catch(() => {})); });
