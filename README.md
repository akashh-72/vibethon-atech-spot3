# 🚀 LearNova — Interactive AI/ML Learning Platform

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-purple.svg)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth/DB-orange.svg)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **VIBETHON 2025 Submission** — Transform complex AI concepts into interactive, playable experiences.

LearNova is a state-of-the-art, full-stack educational platform designed to make **Artificial Intelligence and Machine Learning** accessible to everyone. From absolute beginners to advanced learners, LearNova provides a structured, gamified path involving interactive lessons, real-world simulations, and a fully-featured code playground.

---

## 🌟 Key Features

| Feature | Description |
|:---|:---|
| 🔐 **Premium Auth** | Secure Firebase-powered authentication with **Google OAuth** and automated streak tracking. |
| 📚 **Expert Curriculum** | Structured modules enriched with curated expert-led external resources and visual aids. |
| 🦾 **AI TutorBot** | A dedicated floating AI assistant providing real-time explanations for complex AIML topics. |
| 🧪 **Code Quizzes** | Test your knowledge with MCQs and **interactive coding challenges** for practical validation. |
| 💻 **ML Playground** | An in-browser IDE (Monaco) with a custom Python-style execution engine for AI logic. |
| 🏎️ **Vision AI Sim** | High-fidelity Image Classification demo featuring CNN-based feature extraction visualizations. |
| 🏆 **Advanced Gamification** | Automated badge-awarding engine, daily streaks, XP progression, and live global leaderboards. |
| 🎮 **AI Mini-Games** | Learn by doing: Build decision trees or visualize neural network activations in real-time. |
| 📱 **LeetCode-Aesthetic UI** | Modern, professional design inspired by top-tier technical platforms like Agora.io and LeetCode. |

---

## ⚙️ Setup & Installation Guide

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**
- **Firebase Account** (Auth & Realtime Database enabled)

### 📦 Installation Steps

#### 1. Clone the Repository
```bash
git clone https://github.com/akashh-72/vibethon-atech-spot3.git
cd LearNova
```

#### 2. Environment Configuration
- **Backend**: Create a `.env` in `backend/` with `FIREBASE_SERVICE_ACCOUNT` (JSON format).
- **Frontend**: Configuration is pre-set in `frontend/src/services/firebase.js`. Ensure Google Auth is enabled in your Firebase project.

#### 3. Run Locally
```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd ../backend
npm install
npm run dev
```

---

## 🛡️ Gamification Engine

LearNova now features a sophisticated automated gamification engine:
- **Daily Streaks**: Track your learning consistency; streaks reset if inactive for 24+ hours.
- **Badge System**: Unlocks 6 unique achievements (e.g., "Scholar", "Quiz Master", "3-Day Streak") automatically once criteria are met.
- **XP & Levels**: Earn XP through lessons and quizzes; every 200 XP advances your global rank.

---

## 🚀 Technical Architecture

- **Frontend**: React 19, Framer Motion (Animations), Lucide (Icons), Monaco Editor.
- **Backend**: Node.js, Express, Firebase Admin SDK.
- **Logic**: Custom Python-to-JS transpiler for the in-browser sandbox.
- **Style**: Pure Vanilla CSS following a high-fidelity Design System.

---

## 🏆 VIBETHON 2025 Checklist

- [x] **Working Prototype** - Fully functional E2E.
- [x] **Mobile First** - 100% responsive across all devices.
- [x] **Real-world Value** - Practical ML simulations and playground.
- [x] **Engagement** - Advanced gamification and AI assistant.
- [x] **Clean Code** - Modular React components and structured logic.

---

## 📄 License

This project is licensed under the **MIT License**.

---

Built with ❤️ for **VIBETHON 2025** by **Akash & Team**.
