# 📖 Panitikan Quest

**A gamified reading comprehension app, built as a research prototype for a Grade 12 reading intervention study at Gonzalo Aler National High School.**

![Platform](https://img.shields.io/badge/platform-Web%20%7C%20Android-blue)
![Status](https://img.shields.io/badge/status-prototype-yellow)
![Made with](https://img.shields.io/badge/made%20with-Kotlin%20%26%20JavaScript-orange)
![Offline](https://img.shields.io/badge/offline-first-brightgreen)

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
| **Storage** | Browser `localStorage` | `SharedPreferences` + Room Database |
| **Best for** | Quick classroom testing, no install needed, deployable to Vercel | Native performance, offline-first use on student phones |
| **Folder** | [`/web`](./web) | [`/android`](./android) |

---

## ✨ Features

### Core Gameplay
- **Privacy by design** — the only identifier collected is a self-chosen IGN (2–16 characters). No names, ages, or accounts.
- **Story-driven passages** — three original short stories, each tuned to a different comprehension skill: literal recall → inference → main idea & vocabulary.
- **Progressive difficulty** — questions increase in difficulty and quantity with each chapter, scaling up to a total of **30 questions** across all chapters.
- **Graded assessments** — comprehension checks follow every passage, with instant right/wrong feedback and **visible correct answers** for learning reinforcement.
- **Chapter lock/unlock system** — chapters unlock sequentially; completed chapters cannot be replayed unless the entire game is reset, encouraging forward progress.
- **XP & leveling** — comprehension scores convert into experience points and a 5-tier level progression (Apprentice Reader → Master Chronicler).

### Gamification & Engagement
- **🏅 Achievements system** — unlock badges for milestones (First Blood, Bookworm, Scholar, Perfectionist, Speedster, Graduate, and more). Hover or click to view achievement details.
- **🎉 Achievement celebrations** — confetti, fireworks, and sparkle animations play when an achievement is unlocked.
- **🔊 Sound effects** — positive and negative audio feedback for answers, level completion sounds, and optional background music (toggle on/off).

### Social & Competitive
- **🏛️ Hall of Legends** — local leaderboard that stores top scores for every username that plays. Each new login creates a fresh entry.
- **Fully offline-first** — all data is stored locally (no internet required, no sync, no cloud). Perfect for classrooms with unreliable connectivity.

### Research Context
- **📚 Post-game recommendations** — after completing the game, students receive personalized reading suggestions based on their performance, encouraging further learning.

---

## 📸 Screenshots

> _Screenshots added will show here._

---

## 🚀 Getting started

### Web app
```bash
cd web
# then open index.html with the VS Code "Live Server" extension,
# or any static file server
```
No build step, no dependencies. See [`web/README.md`](./web/README.md) for deployment details.

### Android app
```bash
cd android
# open the folder in Android Studio once, to auto-generate the Gradle wrapper
./gradlew installDebug   # with a device connected / emulator running
```
See [`android/README.md`](./android/README.md) for the full VS Code + Android Studio workflow, including building an installable APK.

---

## 🗂️ Project structure

```
panitikan-quest/
├── web/                  # HTML/CSS/JS implementation
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── README.md
└── android/              # Kotlin + Jetpack Compose implementation
    ├── app/src/main/java/com/ganhs/panitikanquest/
    │   ├── MainActivity.kt
    │   ├── data/         # models, quest content, local storage (Room)
    │   ├── ui/           # theme, shared components, screens
    │   └── achievements/ # achievement logic and animations
    └── README.md
```

---

## 🎓 Research context

This prototype was built to support the study **"The Effects of a Gamified Reading Comprehension App on the Academic Performance of Grade 12 Students at Gonzalo Aler National High School."** It's designed to make it easy to observe both intended benefits (engagement, retry behavior, comprehension gains) and possible drawbacks (leaderboard anxiety, score-chasing over genuine comprehension, over-reliance on multiple-choice recognition).

The app is now **fully offline-first** — all data lives locally on the device, making it suitable for classroom environments with limited or no internet access. The **Hall of Legends** stores scores per device, and each new player creates a fresh entry, allowing researchers to track individual progress.

### New Features in v2
- **Progressive difficulty** with up to 30 questions across chapters
- **Sound effects** for engaging feedback
- **Achievements** with celebration animations
- **Post-game recommendations** for further learning
- **Chapter lock/unlock** progression system
- **Removed all online/sync functionality** for true offline use
- **Replaced "Thesis" references** with "Research" throughout

---

## 🛠️ Tech stack

| | |
|---|---|
| Web | HTML5, CSS3 (custom properties, no framework), vanilla JavaScript |
| Android | Kotlin, Jetpack Compose, Material 3, Room Database, SharedPreferences |
| Design | Shared color palette & typography across both platforms |

---

## 🤝 Contributing

This is a research prototype built for a specific project, but suggestions and pull requests are welcome — particularly around accessibility, additional passages, or new achievement ideas.

---

## 🙏 Acknowledgments

Built for Gonzalo Aler National High School's Grade 12 reading intervention research. Special thanks to the students and teachers who provided feedback during development.
