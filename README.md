# Cadence

Keep yourself and others accountable in your regular Bible reading!

## v1 Roadmap

- [ ] Create new Reading Plan
- [ ] Share your progress via unique link
- [ ] Build onboarding flow to ask some questions to gather key feedback such as intention of using the app, etc.
- [ ] Build landing page

### Notes

#### Scheduling Reading Entries

In the case of `monthly` frequency, say a Reading Plan has 25 days per month to read, all of those Reading Entries will have their `scheduledDate` set as the last day of the month for now. Need to think more about whether there is a better way to track progress here.

#### References

- https://www.reddit.com/r/sveltejs/comments/1d43d8p/svelte_5_runes_with_localstorage_thanks_to_joy_of/
- https://github.com/Rich-Harris/local-storage-test/blob/main/src/lib/storage.svelte.ts
- https://www.captaincodeman.com/securing-your-sveltekit-app
- 


# SvelteKit PWA Setup with @vite-pwa/sveltekit

## 1. Project Initialization
```bash
# Create new SvelteKit project
npm create svelte@latest my-pwa-project
cd my-pwa-project

# Install PWA plugin
npm install @vite-pwa/sveltekit -D
```

## 2. Vite Configuration (vite.config.js)
```javascript
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        sveltekit(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'Your App Name',
                short_name: 'App',
                description: 'App description',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: 'pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable'
                    }
                ]
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,svg,png,ico,txt}'],
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/api\.example\.com\/.*/i,
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'api-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 24 * 60 * 60
                            }
                        }
                    }
                ]
            },
            devOptions: {
                enabled: true
            }
        })
    ]
});
```

## 3. Service Worker (src/service-worker.js)
```javascript
/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

const CACHE_NAME = `my-pwa-cache-v1`;

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                '/',
                '/offline'  // Optional offline fallback page
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).then((fetchResponse) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, fetchResponse.clone());
                    return fetchResponse;
                });
            });
        })
    );
});
```

## 4. Client-Side Registration (src/hooks.client.js)
```javascript
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
    onNeedRefresh() {
        if (confirm('New content available. Reload?')) {
            updateSW(true);
        }
    },
    onOfflineReady() {
        console.log('App is offline ready');
    },
});
```

## 5. HTML Setup (app.html)
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <link rel="icon" href="%sveltekit.assets%/favicon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        %sveltekit.head%
    </head>
    <body data-sveltekit-preload-data="hover">
        <div style="display: contents">%sveltekit.body%</div>
    </body>
</html>
```

## 6. Create Icon Assets
- Generate 192x192 and 512x512 PNG icons
- Place in `static/` directory

## 7. Optional Offline Page (src/routes/offline/+page.svelte)
```svelte
<h1>You are currently offline</h1>
<p>Please check your internet connection</p>
```

## Recommended Additional Steps
- Test PWA functionality in Chrome DevTools
- Verify service worker registration
- Test offline capabilities
```

## Verification Commands
```bash
npm run dev
# Open browser, check Application tab in DevTools
```

# Execution Plan

Here's a **detailed execution plan** to roll out your Bible Reading Accountability App **fast and iteratively**, focusing on learning from real users early, shipping core value quickly, and scaling wisely.

---

## 🗺️ Phase 0: Foundation (Week 0)

**Goal:** Prepare for focused execution.

### ✅ Deliverables

* Finalize **app name**, mission, and 1-sentence pitch.
* Draft **value proposition** for 2 personas:

  * Individual Christians (personal growth)
  * Small group leaders / pastors (group discipleship)
* Set up core tools:

  * GitHub repo
  * Linear or Notion for task tracking
  * Slack/Telegram for internal chat

---

## 📊 Phase 1: Market Research & Pre-Validation (Week 1–2)

### 🎯 Objectives

* Validate problem/desire: Do people *want* this?
* Understand what “accountability” looks like to users

### 🧪 Actions

* Run short surveys via Typeform or Tally.so:

  * Have you followed a Bible reading plan before?
  * What made you stop?
  * Would a small group dashboard help you stick to it?
  * Would you use something that tracks your progress but doesn’t contain the Bible text?

* 5–10 customer interviews:

  * Christian friends, pastors, small group leaders

### 📌 Output

* Short user quote bank
* Clear list of pain points
* Decision: Move forward with MVP scope ✅

---

## ⚒️ Phase 2: MVP Development (Weeks 2–6)

### 🧱 Stack Setup (Week 2)

* Neon Postgres DB
* Drizzle ORM schema
* SvelteKit + Tailwind v4 + `shadcn-svelte`
* Clerk.dev for auth
* Deploy to Vercel or Netlify

---

### 👷 Core MVP Features (Weeks 3–6)

> Develop iteratively with weekly internal demos.

#### Week 3:

* Auth (sign in/up)
* Reading plan selection (static plans, hardcoded JSON for now)
* User progress tracker
* Daily check-in UI
* Drizzle + Neon integration

#### Week 4:

* Group creation & joining via invite code
* Group dashboard view
* Day-by-day group progress tracking
* Internal testing with 2–3 test users

#### Week 5:

* Group comments per day
* Member “nudge” feature
* Group stats/streak logic
* Add subtle gamification (streak counters, stars)

#### Week 6:

* Mobile UI polish (SvelteKit + Tailwind responsive tweaks)
* First analytics hooks (e.g., Posthog or Simple Analytics)
* Beta waitlist page or direct beta link

---

## 🚀 Phase 3: Alpha/Beta Launch (Weeks 7–9)

### 🎯 Target:

* Test with **2–5 groups** (\~15–30 users)
* Collect qualitative + quantitative feedback

### 🧪 Actions:

* Setup onboarding flow via email/invite
* Provide early users:

  * Quick Loom video or Notion doc on how to use
  * Feedback form (e.g., “What’s missing?”, “Was this helpful?”)

### 📈 Key Metrics:

* % of users completing 3+ days in a row
* Comments sent
* Groups created per week
* Streak average per user

---

## 🔁 Phase 4: Iterate & Polish (Weeks 10–12)

### 🔧 Fixes & Features Based on Feedback

* Bug fixes
* Better calendar navigation or week summary
* Notifications (email or in-browser push)
* Optional: simple journaling space

---

## 🎉 Phase 5: Public Launch (Week 12+)

### ✅ Launch Checklist

* Landing page (intro, benefits, call-to-action)
* App Store/Play Store submission (if wrapping with Capacitor or Tauri — optional)
* Email campaign to early users & churches
* Post on Reddit (`r/TrueChristian`, `r/SideProject`, etc.)
* Twitter + IndieHackers + LinkedIn share

---

## 💰 Optional Monetization Path (Post-launch)

### Free Forever Plan:

* Access to core: 1 plan, 1 group

### “Supporter” Plan (\~\$3–5/mo):

* Unlimited groups
* Group stats export
* Custom reading plans
* Email digests / reporting for group leaders

---

## 📦 Tech + Ops Summary

| Component     | Tool              | Notes                       |
| ------------- | ----------------- | --------------------------- |
| Frontend      | SvelteKit         | SPA + SSR ready             |
| Styling       | Tailwind v4       | Modern, performant          |
| UI Components | shadcn-svelte     | Rapid UI building           |
| Auth          | Clerk.dev         | Easy user management        |
| DB            | Neon Postgres     | Serverless, scalable        |
| ORM           | Drizzle ORM       | Type-safe Postgres access   |
| Hosting       | Vercel / Netlify  | Fast CI/CD                  |
| Analytics     | Posthog / Simple  | Anonymous behavior tracking |
| Payments      | Stripe (optional) | When monetizing             |

---

## 🧭 Timeline Overview (12 Weeks)

| Week  | Milestone                          |
| ----- | ---------------------------------- |
| 0     | Planning + tool setup              |
| 1–2   | Market research & interviews       |
| 3–6   | MVP build (core features + groups) |
| 7–9   | Alpha/beta with invited users      |
| 10–11 | Iteration based on feedback        |
| 12    | Public launch                      |

---

## ✅ What You’ll Have at Launch:

* Working app for tracking reading plan progress
* Real users grouped and interacting
* Strong value prop for churches/small groups
* Tight, well-scoped codebase with growth potential

---

Would you like this in a Notion template, Gantt chart, or PDF format? Or want to start on a specific part next (e.g., onboarding UI or Drizzle schema)?
