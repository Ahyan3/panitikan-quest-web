# 📖 Panitikan Quest

**A gamified reading comprehension app, built as a research prototype for a Grade 12 reading intervention study at Gonzalo Aler National High School.**

![Platform](https://img.shields.io/badge/platform-Web%20%7C%20Android-blue)
![Status](https://img.shields.io/badge/status-prototype-yellow)
![License](https://img.shields.io/badge/license-MIT-green)
![Made with](https://img.shields.io/badge/made%20with-Kotlin%20%26%20JavaScript-orange)

Panitikan Quest turns short literary passages into "quests": students read a story,
face a comprehension "trial" (a graded multiple-choice quiz), and earn XP toward a
level, while a class-wide leaderboard ("Hall of Legends") drives friendly competition.
No student name, age, or personal information is ever collected — only a self-chosen
in-game name (IGN).

This repo contains **two parallel implementations** of the same app, built to be
directly comparable for research purposes:

| | Web App | Android App |
|---|---|---|
| **Stack** | HTML / CSS / vanilla JS | Kotlin + Jetpack Compose |
| **Storage** | Browser `localStorage` | `SharedPreferences` |
| **Best for** | Quick classroom testing, no install needed, deployable to Vercel | Native performance, offline-first use on student phones |
| **Folder** | [`/web`](./web) | [`/android`](./android) |

---

## ✨ Features

- **Privacy by design** — the only identifier collected is a self-chosen IGN (2–16
  characters). No names, ages, or accounts.
- **Story-driven passages** — three original short stories, each tuned to a different
  comprehension skill: literal recall → inference → main idea & vocabulary.
- **Graded assessments** — a 5-question comprehension check follows every passage,
  with instant right/wrong feedback.
- **XP & leveling** — comprehension scores convert into experience points and a
  5-tier level progression (Apprentice Reader → Master Chronicler).
- **Hall of Legends leaderboard** — top 10 readers, always visible on the main hub.
- **Offline-first** — if there's no connection, quiz results are queued locally and
  automatically synced to the leaderboard the moment connectivity returns.
- **Consistent design language** — both apps share the same "night-sky and parchment"
  visual identity, so the experience is the same regardless of platform.

## 📸 Screenshots

> _Add screenshots or a screen recording here once you've run the app — this section
> is one of the first things people look at on a GitHub repo._

## 🚀 Getting started

### Web app
```bash
cd web
# then open index.html with the VS Code "Live Server" extension,
# or any static file server
```
No build step, no dependencies. See [`web/README.md`](./web/README.md) for offline-mode
testing instructions and a deployment guide for Vercel.

### Android app
```bash
cd android
# open the folder in Android Studio once, to auto-generate the Gradle wrapper
./gradlew installDebug   # with a device connected / emulator running
```
See [`android/README.md`](./android/README.md) for the full VS Code + Android Studio
workflow, including building an installable APK.

## 🗂️ Project structure

```
panitikan-quest/
├── web/                  # HTML/CSS/JS implementation
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── README.md
└── android/               # Kotlin + Jetpack Compose implementation
    ├── app/src/main/java/com/ganhs/panitikanquest/
    │   ├── MainActivity.kt
    │   ├── data/           # models, quest content, local storage, connectivity
    │   └── ui/             # theme, shared components, screens
    └── README.md
```

## 🎓 Research context

This prototype was built to support the study **"The Effects of a Gamified Reading
Comprehension App on the Academic Performance of Grade 12 Students at Gonzalo Aler
National High School."** It's designed to make it easy to observe both intended
benefits (engagement, retry behavior, comprehension gains) and possible drawbacks
(leaderboard anxiety, score-chasing over genuine comprehension, over-reliance on
multiple-choice recognition) — see each platform's README for a fuller discussion.

Both leaderboards currently live in local, on-device storage rather than a shared
backend, so scores don't yet sync across different students' devices. A small backend
(e.g. Firebase or Supabase) would be the natural next step for a school-wide deployment.

## 🛠️ Tech stack

| | |
|---|---|
| Web | HTML5, CSS3 (custom properties, no framework), vanilla JavaScript |
| Android | Kotlin, Jetpack Compose, Material 3, SharedPreferences, ConnectivityManager |
| Design | Shared color palette & typography across both platforms |

## 🤝 Contributing

This is a research prototype built for a specific thesis project, but suggestions and
pull requests are welcome — particularly around accessibility, additional passages, or
a shared backend for the leaderboard.

## 📄 License

MIT — free to use, modify, and adapt for your own research or classroom use. Attribution
appreciated but not required.

## 🙏 Acknowledgments

Built for Gonzalo Aler National High School's Grade 12 reading intervention research.
