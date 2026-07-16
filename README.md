# Panitikan Quest — Gamified Reading Comprehension App (Prototype)

A working sample for your study: **"The Effects of a Gamified Reading Comprehension App
on the Academic Performance of Grade 12 Students at Gonzalo Aler National High School."**

This is a runnable prototype, not a finished production app — it's meant to give you and
your cousin something concrete to test, screenshot for your paper, and adapt.

## What it already implements (from your notes)

| Requirement from your data | Where it lives |
|---|---|
| No personal info collected (no name/age) | `screen-ign` — only accepts an IGN (letters/numbers/underscore, 2–16 chars) |
| IGN addresses the user throughout | Hub header chip, results screen |
| Literature/text passages with story framing | `QUESTS` array in `script.js` — 3 short original passages ("chapters") |
| Assessment after each passage | `screen-assessment` — 5 multiple-choice comprehension questions per passage |
| Leaderboard, top 10, on main interface | `screen-hub` right panel, "Hall of Legends" |
| Offline mode | App detects `navigator.onLine`; if offline, quiz results are queued locally |
| Progress recorded once back online | `pending-list` panel + `syncPending()` — auto-fires on the browser's `online` event |

## Running it in VS Code

1. Open the `reading-quest` folder in VS Code.
2. Install the **Live Server** extension (by Ritwick Dey) if you don't have it.
3. Right-click `index.html` → **Open with Live Server**.
4. To test the offline behavior: open Chrome DevTools (F12) → **Network tab** → set
   throttling to **Offline**, finish a quest, then switch back to **Online** and watch
   the "Sync Status" panel clear itself.

No build step, no npm install — plain HTML/CSS/JS so it's easy to hand off, screenshot,
or extend for your defense.

## Where the "real" data would plug in later

Right now the leaderboard and progress are stored in the browser's `localStorage`, which
is why it's per-device rather than school-wide. For an actual deployment across the
school's computers you'd eventually want:

- A small backend (even a free tier like Firebase or Supabase) to hold the *shared*
  leaderboard, so IGNs from different devices all show up together.
- A teacher-facing export (CSV) of comprehension scores per IGN, so scores can be
  cross-referenced against LAT results or grades — without ever storing a student's name
  inside the app itself, if you want to keep that anonymity guarantee.

## Ideas for what to actually test (positive *and* negative effects)

Since your research question asks about both, here's what this prototype is built to let
you measure or observe:

**Possible positive effects to test for**
- Comprehension score change (pre-test vs. LAT-style post-test) after regular use
- Time-on-task / voluntary engagement (does the leaderboard increase attempts per week?)
- Persistence on harder passages (do students retry after a "Keep Practicing" result?)

**Possible negative effects to watch for**
- Leaderboard anxiety — some students may disengage entirely if they never crack the
  top 10; worth asking about this directly in your survey/interview instrument
- Score-chasing over comprehension — students memorizing answer patterns rather than
  reading, especially if the same 3 passages are reused too long
- Over-reliance on multiple choice — MCQ assessment doesn't test recall or writing, only
  recognition, which your discussion section may want to flag as a limitation
- Offline/connectivity frustration — if a school's Wi-Fi is unreliable, repeated "syncing"
  messages could feel discouraging rather than reassuring

You can adapt the wording in `resultNote` / `resultHeadline` in `script.js` if your
instrument needs specific phrasing for "encouraging" vs. "neutral" feedback conditions,
in case you want to A/B test tone as part of the study design.

## Extending the content

All passages and questions live in the `QUESTS` array at the top of `script.js`. Add a
new object to the array (same shape) to add a chapter — quests unlock in order, so a new
quest appended at the end will unlock once the previous one has been attempted at least
once.
