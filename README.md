<div align="center">

# 📖 Panitikan Quest

### 🎮 A Gamified Reading Comprehension Assessment Tool

*Isang Kwento, Isang Pakikipagsapalaran.*

![Platform](https://img.shields.io/badge/platform-Web-6c5ce7)
![Stack](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JS-f39c12)
![Dependencies](https://img.shields.io/badge/dependencies-none-00a86b)
![Status](https://img.shields.io/badge/status-research%20prototype-e17055)
![Offline](https://img.shields.io/badge/works-100%25%20offline-0984e3)

</div>

---

## 🎯 About

A gamified reading comprehension assessment and practice app built for the study
**"The Effects of a Gamified Reading Comprehension App on the Academic Performance of
Grade 12 Students at Gonzalo Aler National High School."**

It's a complete assessment cycle, not just a quiz game: students take a pre-test, get
automatically placed into a difficulty tier, practise at that level, then take a
post-test so their growth can actually be measured. 📈

---

## 🔄 How It Works

```
📝 Open app     →  IGN entry (no personal info collected)
🧪 PRE-TEST     →  3 passages · 30 questions · 15 min/passage · 1 hr cap
🧭 PLACEMENT    →  score automatically assigns a difficulty tier
📚 PRACTICE     →  3 passages in your tier, unlocked in order
🔁 POST-TEST    →  same 30 questions, jumbled
📈 GROWTH REPORT → pre vs post + personalised reading recommendations
```

---

## 🏅 Placement Tiers

Your pre-test score decides where you practise:

| 🎯 Score | 🏆 Tier | ⚡ Difficulty |
|---|---|---|
| 1–6 / 30 | 🌱 **Novice** | Very Easy |
| 7–12 / 30 | 🌿 **Intermediate** | Easy |
| 13–18 / 30 | 🌾 **Advanced** | Normal |
| 19–24 / 30 | 🌻 **Proficient** | Hard |
| 25–30 / 30 | 🌳 **Expert** | Extreme |

## 📊 Comprehension Bands

| 📈 Percent | 🎓 Level | What it means |
|---|---|---|
| 80–100% | ✅ **Independent** | Reads comfortably without support |
| 59–79% | 📘 **Instructional** | Reads well with some teacher guidance |
| ≤ 58% | ⚠️ **Frustration** | Text is too difficult without significant support |

---

## ⏱️ Timing Rules

| Context | Limit |
|---|---|
| 🧪 Pre/Post-test reading | **15 minutes** per passage |
| ⏳ Whole test session | **1 hour** overall cap |
| 📚 Practice reading | **1 hour** per passage |
| ❓ Every question | **1 minute** — running out marks it wrong and reveals the answer |

---

## 📚 Content

**18 passages · 175 questions** — 30 in the pre/post-test, 145 across the five tiers.

Passages range from Maya Angelou's *Still I Rise* and Robert Frost's *The Road Not
Taken* to Filipino selections on jeepneys, the Butuan archaeological sites, and
Greek mythology. 🇵🇭

> ✅ **Verified:** every answer was transcribed from the curriculum document, then
> **programmatically checked against that document's own answer key** — 0 mismatches
> out of 175. The check caught and fixed 6 transcription errors before release.

### ⚠️ Two known defects in the SOURCE document (not the app)

1. **Proficient B, Q4** is missing its **C** option in the original PDF. It ships as a
   3-choice item rather than with an invented distractor, and says so to the student.
2. **Proficient B, Q3 and Q5** each had an option's letter label dropped by a PDF
   formatting glitch. Both were reconstructed from the visible text and verified.

🔔 Worth flagging to your adviser before the instrument is used for real scoring.

---

## 🎮 Game Layer

| Feature | Details |
|---|---|
| ❤️ **Hearts** | 3 per practice attempt — **never applied during a test** |
| 🪙 **Coins** | Earned from correct answers, completing passages, streaks, achievements |
| 🪪 **Shop** | 🔍 Magnifying Glass · 📜 Scroll of Insight · ⏭️ Skip Token · ❤️ Revive Charm · ✨ Double XP Elixir |
| 🔥 **Daily streaks** | Consecutive days tracked, with a scaling coin bonus |
| 🎖️ **Achievements** | 7 badges — tap any badge to see how to earn it, with an unlock celebration |
| 🏆 **Hall of Legends** | Starts genuinely empty, fills only as real students log in on the device |
| 🎲 **Shuffled answers** | Choices re-shuffle on every single render |
| 👁️ **Answer visibility** | The correct answer is always revealed after each question |
| 🔒 **Reset lock** | Reset stays locked until the post-test is done, so nobody farms easy passages |

🎵 **All audio is generated at runtime** with the Web Audio API — no audio files are
bundled. That includes the sound effects and an original 8-bit adventure music loop
with an on/off toggle.

---

## 🔐 Privacy

> 🛡️ **No name, age, or account is ever collected.**

The only identifier is a self-chosen **IGN** (in-game name), which doubles as the local
save-slot key. All data lives in the browser's `localStorage` — nothing is transmitted
anywhere. **There is no network code in this app at all.**

---

## 📺 A Note on Ads

The "watch ad" button is a **simulated** reward — a short delay, then the payout. No
real ad SDK or ad network is integrated.

Real advertising requires compliance review for a study involving minors (COPPA-style
rules, the Philippines' Data Privacy Act, and your school's own policy), so that
decision belongs to you and your adviser rather than to a prototype. ⚖️

---

## 🚀 Running It

**No build step. No dependencies. No install.**

1. 📂 Open the folder in VS Code
2. 🔌 Install the **Live Server** extension
3. 🖱️ Right-click `index.html` → *Open with Live Server*

Or just double-click `index.html` to open it straight in a browser. 🌐

---

## 🗂️ Project Structure

```
panitikan-quest-web/
├── 📄 index.html    # all 11 screens (login, test intro, placement, hub, shop,
│                    #   reading, quiz, hearts, result, review, growth report)
├── ⚙️ script.js     # question bank + engine (profiles, timers, placement, scoring)
├── 🎨 style.css     # night-sky / parchment design system + responsive layout
└── 📖 README.md
```

Inside `script.js`: the question bank sits at the top (`PRETEST_PASSAGES` plus the five
tier arrays), followed by the sound manager, profile storage, and the screen flow.

---

## ➕ Adding More Passages

Append to `NOVICE_PASSAGES`, `INTERMEDIATE_PASSAGES`, `ADVANCED_PASSAGES`,
`PROFICIENT_PASSAGES`, or `EXPERT_PASSAGES` in `script.js`. **No code changes needed** —
it's pure data. ✨

```js
{
  id: 'novice-d',
  title: 'Your Passage Title',
  author: 'Author Name',   // or null
  kind: 'essay',
  text: `Your passage text here...`,
  questions: [
    {
      q: 'Your question?',
      choices: ['Option A', 'Option B', 'Option C', 'Option D'],
      correct: 1,           // 0-based index
      skill: 'inference'    // literal | inference | vocabulary | main_idea | argument
    }
  ]
}
```

---

## 📱 Also Available

There's a **native Android version** built with Kotlin + Jetpack Compose, with the same
passages, the same verified answer key, and the same flow. 🤖

---

<div align="center">

**🏫 Gonzalo Aler National High School · Grade 12 Reading Research Tool**

*Built as a research prototype for classroom testing — not a commercial product.* 🔬

</div>
