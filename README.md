# Panitikan Quest — Reading Comprehension Research Tool (Web)

A gamified reading comprehension assessment and practice app built for the study
**"The Effects of a Gamified Reading Comprehension App on the Academic Performance
of Grade 12 Students at Gonzalo Aler National High School."**

## How the flow works

```
Open app  →  IGN entry (no personal info collected)
          →  PRE-TEST  (3 passages, 30 questions, 15 min/passage, 1 hr overall)
          →  PLACEMENT (score determines tier)
          →  PRACTICE  (3 passages in your assigned tier, unlocked in order)
          →  POST-TEST (same 30 questions, jumbled)
          →  GROWTH REPORT (pre vs post, skill recommendations)
```

## Placement bands (from the curriculum document)

| Pre-test score | Tier | Difficulty |
|---|---|---|
| 1–6 / 30 | Novice | Very Easy |
| 7–12 / 30 | Intermediate | Easy |
| 13–18 / 30 | Advanced | Normal |
| 19–24 / 30 | Proficient | Hard |
| 25–30 / 30 | Expert | Extreme |

## Comprehension bands

| Percent | Level |
|---|---|
| 80–100% | Independent |
| 59–79% | Instructional |
| ≤58% | Frustration |

## Timing

- **Pre/Post-test:** 15 minutes reading per passage, 1 hour overall session cap.
- **Practice:** 1 hour reading cap per passage.
- **Every question:** 1 minute. Running out marks it incorrect and reveals the answer.

## Content

18 passages, 175 questions total — 30 in the pre/post-test and 145 across the five
tiers. Every answer key entry was transcribed from the source curriculum document and
then **programmatically verified against the document's own answer key** (0 mismatches).

### Two known defects in the SOURCE document (not the app)

1. **Proficient B, Q4** ("why would AI cause education inequalities?") is missing its
   **C** option in the original PDF. It ships as a 3-choice item rather than with an
   invented distractor. The question notes this to the student.
2. **Proficient B, Q3 and Q5** each had an option's letter label dropped by a PDF
   formatting glitch. Both were reconstructed from the visible text and verified
   against the answer key.

Worth flagging to your adviser before the instrument is used for real scoring.

## Game layer

Hearts (practice only — never during a test), coins, a shop with five power-ups,
daily streaks, achievements with tap-to-expand instructions and unlock celebrations,
and a per-device Hall of Legends. Answer choices are shuffled on every render, and
the correct answer is always revealed after each question so students can learn from
misses.

## Privacy

No name, age, or account is ever collected — only a self-chosen IGN, which doubles as
a local save-slot key. All data lives in the browser's `localStorage`; nothing is sent
anywhere. There is no network code in this app.

## Running it

Open the folder in VS Code, install the **Live Server** extension, then right-click
`index.html` → *Open with Live Server*. No build step, no dependencies.

## Adding more passages

Append to `NOVICE_PASSAGES`, `INTERMEDIATE_PASSAGES`, `ADVANCED_PASSAGES`,
`PROFICIENT_PASSAGES`, or `EXPERT_PASSAGES` in `script.js`. Each question needs
`q`, `choices`, `correct` (0-based index), and `skill`
(`literal` | `inference` | `vocabulary` | `main_idea` | `argument`). No code changes needed.
