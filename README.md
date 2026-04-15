# 🚀 LearNova — Interactive AI/ML Learning Platform

> **VIBETHON 2025** rapid prototype — built with React, Node.js, and Firebase.

LearNova is a full-stack interactive web platform that makes learning **Artificial Intelligence and Machine Learning** engaging, practical, and accessible through structured modules, quizzes, mini-games, simulations, and gamification.

---

## 📸 Features

| Feature | Description |
|---|---|
| 🔐 **Authentication** | Firebase email/password login & registration |
| 📚 **Learning Modules** | 4 structured modules: Beginner → Advanced (AI Intro, Supervised Learning, Neural Networks, NLP) |
| 🧪 **Quiz System** | 5 MCQs per module with instant feedback, explanations & XP scoring |
| 💻 **Code Playground** | Monaco editor with in-browser Python-style code execution |
| 🎮 **Mini-Games** | Decision Tree Builder, Neural Network Visualizer, Classification Challenge |
| 🔬 **Simulations** | Spam Detection (keyword-based) + Iris Classification (Decision Tree) |
| ⚡ **Progress Dashboard** | XP, level, streak, badges, completed modules |
| 🏆 **Leaderboard** | Live rankings with podium, badges, and sort options |
| 📱 **Responsive Design** | Mobile, tablet, and desktop support |

---

## 🗂️ Project Structure

```
LearNova/
├── frontend/               # React + Vite app
│   ├── src/
│   │   ├── components/     # auth/, layout/, common/, dashboard/
│   │   ├── pages/          # All page components
│   │   ├── services/       # firebase.js, auth.js, api.js
│   │   ├── context/        # AuthContext.jsx
│   │   ├── data/           # modules.js, quizData.js
│   │   └── styles/         # global.css
│   └── package.json
│
├── backend/                # Node.js + Express API
│   ├── src/
│   │   ├── config/         # Firebase Admin SDK setup
│   │   ├── controllers/    # Business logic handlers
│   │   ├── middlewares/    # Auth verification, Error handling
│   │   └── routes/         # Express route definitions
│   └── package.json
│
└── README.md
```

---

## ⚙️ Setup Instructions

### Prerequisites
- **Node.js** v18+ and npm
- A Firebase project (already configured — credentials in `frontend/src/services/firebase.js`)

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/your-username/learnova.git
cd learnova
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at → **http://localhost:5173**

### 3. Backend Setup

```bash
cd backend
npm install

# Install nodemon for development hot-reload
npm install -g nodemon

npm run dev
```

Backend API runs at → **http://localhost:5000**

---

## 🔥 Firebase Configuration

Firebase is already configured with the provided credentials. The frontend uses the **Firebase Client SDK** directly for:
- Auth (email/password)
- Realtime Database (user profiles, progress, leaderboard)

The backend uses **Firebase Admin SDK** for server-side token verification. To enable it:
1. Go to Firebase Console → Project Settings → Service Accounts
2. Generate a new private key (JSON)
3. Add it to `backend/.env` as `FIREBASE_SERVICE_ACCOUNT`

> **Note:** The platform works fully without the backend — all core features use the Firebase client SDK directly from the frontend.

---

## 🎮 Platform Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Landing page with features overview |
| `/register` | Register | Create account |
| `/login` | Login | Sign in |
| `/dashboard` | Dashboard | XP, stats, badges, leaderboard preview |
| `/modules` | Modules | Browse all learning modules |
| `/modules/:id` | Module Detail | Read lessons + code examples |
| `/quiz` | Quiz Selector | Pick a module quiz |
| `/quiz/:id` | Quiz Runner | Take the quiz with instant feedback |
| `/playground` | Playground | Write & run Python-style code |
| `/games` | Games | Three interactive mini-games |
| `/simulations` | Simulations | Spam detection + Iris classification |
| `/leaderboard` | Leaderboard | Rankings with podium and badges |

---

## 🧪 Demo Credentials

```
Email:    demo@learnova.ai
Password: demo123
```
> Create this account via the Register page to use as a demo.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 18 + Vite |
| Routing | React Router DOM v6 |
| Styling | Vanilla CSS (custom design system) |
| Code Editor | Monaco Editor (`@monaco-editor/react`) |
| Authentication | Firebase Auth |
| Database | Firebase Realtime Database |
| Backend | Node.js + Express |
| Backend Auth | Firebase Admin SDK |
| Middleware | Helmet, CORS, Morgan |

---

## 📈 Gamification System

- **XP** — Earned by completing modules and quizzes
- **Levels** — Every 200 XP = 1 Level up
- **Badges** — First Login, Beginner, Intermediate, Advanced, Quiz Master, 3-Day Streak
- **Leaderboard** — Live ranking by XP, Level, or Modules completed
- **Streaks** — Daily login tracking

---

## 📌 VIBETHON Checklist

- [x] Working prototype
- [x] User Authentication (Firebase email/password)
- [x] Structured Learning Modules (4 modules, Beginner → Advanced)
- [x] Interactive Quiz System (MCQs with instant feedback)
- [x] Code Playground (Monaco editor + in-browser runner)
- [x] Mini-Games (3 games)
- [x] Real-World Simulations (Spam detection + Iris classification)
- [x] Progress Dashboard
- [x] Leaderboard & Gamification
- [x] Responsive Design (mobile + tablet + desktop)
- [x] GitHub Repository with clean structure

---

## 📄 License

MIT © LearNova Team — VIBETHON 2025
