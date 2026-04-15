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
| 🔐 **Smart Auth** | Secure Firebase-powered authentication with custom user profile generation. |
| 📚 **Progressive Modules** | 4-tier curriculum: Intro to AI → Supervised Learning → Neural Networks → NLP. |
| 🧪 **Integrated Quizzes** | Test your knowledge with instant feedback, deep-dive explanations, and XP rewards. |
| 💻 **ML Playground** | An in-browser IDE (Monaco) with a custom Python-style execution engine for AI logic. |
| 🎮 **AI Mini-Games** | Learn by doing: Build decision trees or visualize neural network activations in real-time. |
| 🔬 **Real-World Simulators** | Practical applications like Spam Detection and Iris Classification species prediction. |
| 🏆 **Leaderboard** | Compete globally with a live ranking system based on XP, levels, and badges. |
| 📱 **High-Fidelity UI** | Fully responsive, mobile-first design with a modern "Agora.io" dark-themed aesthetic. |

---

## ⚙️ Setup & Installation Guide

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**
- **Git**

### 📦 Installation Steps

#### 1. Clone the Repository
```bash
git clone https://github.com/akashh-72/vibethon-atech-spot3.git
cd LearNova
```

#### 2. Backend Setup
```bash
cd backend
npm install
# Note: Ensure you have your Firebase Admin credentials configured for token verification
npm run dev
```
*Backend runs on: `http://localhost:5000`*

#### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
*Frontend runs on: `http://localhost:5173`*

---

## 🛡️ Firebase Configuration

LearNova uses **Firebase** for Authentication and Real-time Database.

1.  **Frontend**: The configuration is pre-set in `frontend/src/services/firebase.js`.
2.  **Backend**: To enable secure API requests, add your service account key:
    - Create a `.env` file in the `backend/` directory.
    - Add: `FIREBASE_SERVICE_ACCOUNT={"your":"json_key_here"}`
    - Or provide the path: `GOOGLE_APPLICATION_CREDENTIALS=path/to/key.json`

---

## 🚀 How to Use LearNova

### 1. Registration & Onboarding
- Navigate to the **Register** page.
- Sign up with your email and password.
- Upon first login, you will automatically receive the **"First Step"** badge and 50 XP to jumpstart your journey.

### 2. The Learning Path
- **Modules**: Start with "Introduction to AI". Each lesson contains detailed prose and code snippets.
- **Quizzes**: After every module, take the quiz. Scoring well yields high XP and unlocks specialized badges.
- **Playground**: Experiment with the code snippets you learn in the dedicated Playground.

### 3. Gamification Mechanics
- **XP (Experience Points)**: Earned through quizzes and module completion.
- **Levels**: Your level increases automatically for every **200 XP** earned.
- **Badges**: Unlock 6 unique badges based on your achievements (e.g., "Beginner", "Intermediate", "Quiz Master").

---

## 💻 Technical Architecture

### Tech Stack
- **Frontend**: React 19, react-router-dom, framer-motion, lucide-react.
- **Editor**: `@monaco-editor/react` (VS Code engine).
- **Backend**: Node.js, Express, Firebase Admin SDK.
- **Styling**: Vanilla CSS (Custom Design System with dynamic theming).

### Responsive Design
LearNova uses a custom-built responsive engine:
- **Desktop**: Fixed sidebar for efficient navigation.
- **Mobile/Tablet**: Transforms into a sliding drawer system for maximum content real-estate.
- **Breakpoints**: 1024px (Drawer toggle), 768px (Grid reflow), 480px (Mobile optimizations).

---

## 🏆 VIBETHON 2025 Checklist

- [x] **Working Prototype** - Fully functional E2E.
- [x] **Mobile First** - 100% responsive across all devices.
- [x] **Real-world Value** - Practical ML simulations and playground.
- [x] **Engagement** - Advanced gamification and leaderboard.
- [x] **Clean Code** - Modular React components and structured backend.

---

## 📄 License

This project is licensed under the **MIT License**.

---

Built with ❤️ for **VIBETHON 2025** by **Akash & Team**.
