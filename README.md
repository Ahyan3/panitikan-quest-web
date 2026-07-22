# 🌐 Panitikan Quest - Web App

**A gamified reading comprehension app for Grade 12 research at Gonzalo Aler National High School.**

![Platform](https://img.shields.io/badge/platform-Web-blue)
![Status](https://img.shields.io/badge/status-production-green)
![Offline](https://img.shields.io/badge/offline-first-brightgreen)

---

## 📖 Overview

Panitikan Quest Web is a browser-based implementation of a gamified reading comprehension tool. Students read short literary passages, answer comprehension questions, and progress through levels while earning coins, achievements, and streaks.

**This is a research tool** — no personal data is collected. Students choose a self-chosen in-game name (IGN) and play entirely offline.

---

## ✨ Features

### Core Gameplay
- **50-60 progressive levels** (engine supports expansion)
- **10-30 questions per level** (scales with difficulty)
- **3 hearts system** — Hard chapters cost 2 hearts per wrong answer
- **Daily streaks** — Track consecutive days with bonus rewards
- **Reset button** — Only works after ALL levels completed

### Gamification
- 🪙 **Coins** — Earn from correct answers, levels, streaks, achievements
- 🏪 **Shop** — Magnifying Glass, Hint Scroll, Revive Charm, Skip Token, Double XP Elixir
- 🏅 **Achievements** — Click to view instructions, celebration animation on unlock
- 🔥 **Daily Streaks** — Bonus coins and "On Fire" badge

### Social & Competitive
- 🏛️ **Hall of Legends** — Local leaderboard, empty on first launch
- **Per-username profiles** — Each IGN has its own save slot

### Privacy & Offline
- **No personal data collected** — Only self-chosen IGN
- **100% offline** — All data stored in browser localStorage
- **No internet permission required**

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/panitikan-quest-web.git

# Navigate to the folder
cd panitikan-quest-web

# Open index.html with Live Server or any static server
# No build step, no dependencies!
```

### Deployment
Deploy to **Vercel**, **Netlify**, or any static hosting service:

```bash
# Deploy to Vercel
vercel --prod

# Or simply drag the folder to Netlify Drop
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Structure |
| CSS3 | Styling (custom properties, animations) |
| Vanilla JavaScript | Game logic, localStorage, DOM manipulation |
| localStorage | Offline data persistence |

---

## 📁 Project Structure

```
panitikan-quest-web/
├── index.html          # Main entry
├── style.css           # All styles
├── script.js           # Game logic
└── README.md           # This file
```

---

## 🎓 Research Context

Built for **"The Effects of a Gamified Reading Comprehension App on the Academic Performance of Grade 12 Students at Gonzalo Aler National High School."**

All data is stored locally per device, making it ideal for classroom environments with limited or unreliable internet connectivity.

---

## 🙏 Acknowledgments

Built for Gonzalo Aler National High School's Grade 12 reading intervention research.

---