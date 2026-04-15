# LearNova: AI & Machine Learning Learning Platform

LearNova is a state-of-the-art, interactive learning platform designed to make Artificial Intelligence (AI) and Machine Learning (ML) accessible, engaging, and practical for learners of all levels. It combines a professional, modern UI with powerful tools like an interactive playground, real-world simulations, and a gamified learning experience.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) – Modern UI library with concurrent rendering features.
- **Build Tool**: [Vite](https://vitejs.dev/) – Next-generation frontend tooling for fast development and builds.
- **Styling**: Vanilla CSS with modern CSS variables, Flexbox, and Grid for high performance and customizability (Agora.io-inspired light theme).
- **Animations**: [Framer Motion](https://www.framer.com/motion/) – For smooth transitions, micro-interactions, and professional UI animations.
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/) – Versatile and lightweight iconography.
- **Charts**: [Recharts](https://recharts.org/) – Composited charting library for progress visualization.
- **Code Editor**: [@monaco-editor/react](https://github.com/suren-atoyan/monaco-react) – VS Code-like experience for the ML Playground.
- **Routing**: [React Router Dom v7](https://reactrouter.com/) – Client-side routing with protected routes.

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/) – Minimalist web framework for building the RESTful API.
- **Security**: 
  - [Helmet](https://helmetjs.github.io/) – Secures HTTP headers.
  - [CORS](https://github.com/expressjs/cors) – Handles Cross-Origin Resource Sharing.
- **Logging**: [Morgan](https://github.com/expressjs/morgan) – HTTP request logger for development transparency.

### Backend-as-a-Service (BaaS)
- **Firebase**:
  - **Authentication**: Secure user login, registration, and session management.
  - **Cloud Firestore**: Real-time NoSQL database for users, progress, and leaderboards.
  - **Firebase Admin SDK**: Secure backend operations with administrative privileges.

---

## 📂 Project Structure & File Details

### 🏢 Root Directory
- `.gitignore`: Specifies files and folders (like `node_modules`, `.env`) that Git should ignore.
- `README.md`: High-level overview of the project and basic setup instructions.

---

### 🔙 Backend (`/backend`)
The backend provides a secure API for user management, learning progress tracking, and leaderboard data.

#### `src/server.js`
The entry point of the backend application. Initializes Express, sets up middleware (CORS, Helmet, JSON parsing), connects routes, and starts the server.

#### `src/config/`
- **`firebase.js`**: Initializes the Firebase Admin SDK using service account credentials to interact with Firestore and Auth from the server.

#### `src/controllers/`
- **`authController.js`**: Logic for user registration, login, and profile management using Firebase.
- **`progressController.js`**: Handles saving and retrieving user progress within different ML modules.
- **`leaderboardController.js`**: Manages fetching and updating global and individual leaderboard rankings.

#### `src/middlewares/`
- **`authMiddleware.js`**: Verifies the Firebase ID token in the Authorization header to protect API routes.
- **`errorHandler.js`**: Unified error handling middleware for consistent API error responses.

#### `src/routes/`
- **`authRoutes.js`**: Defines endpoints for authentication: `/api/auth/register`, `/api/auth/login`, etc.
- **`progressRoutes.js`**: Endpoints for tracking learning: `/api/progress`, `/api/progress/:moduleId`.
- **`leaderboardRoutes.js`**: Endpoints for ranking data: `/api/leaderboard`.

---

### 🎨 Frontend (`/frontend`)
A highly optimized React application with a focus on UX/UI excellence.

#### ⚙️ Configuration
- `package.json`: Manages frontend dependencies and scripts (`dev`, `build`).
- `vite.config.js`: Configuration for Vite, including plugins and build settings.
- `eslint.config.js`: Rules for maintaining high code quality and consistency.
- `index.html`: The HTML template where the React application is mounted.

#### 🌍 Global Styles (`/frontend/src/styles`)
- **`global.css`**: The core design system including CSS variables for colors, spacing, typography, and global resets.

#### 🧠 Context & State (`/frontend/src/context`)
- **`AuthContext.jsx`**: Provides user authentication state (user object, loading status) globally across the app.

#### 📦 Components (`/frontend/src/components`)

##### Auth (`/components/auth`)
- **`Login.jsx` / `Register.jsx`**: Forms for user entry with validation and Firebase integration.
- **`Auth.css`**: Specialized styling for the authentication pages.

##### Layout (`/components/layout`)
- **`Navbar.jsx` / `Navbar.css`**: Sidebar/Sticky navigation for authenticated users.
- **`PublicNavbar.jsx` / `PublicFooter.jsx`**: Specialized navigation/footer for guest-facing pages.
- **`PublicLayout.jsx`**: Wrapper for public pages to ensure consistent branding.

##### Common (`/components/common`)
- **`Chatbot.jsx` / `Chatbot.css`**: A rule-based interactive assistant that guides users through the platform.

#### 📱 Pages (`/frontend/src/pages`)

##### Core Platform
- **`Home.jsx` / `Home.css`**: The landing page featuring hero sections, value propositions, and trust markers.
- **`Dashboard.jsx` / `Dashboard.css`**: Personalized user overview showing progress charts and recommended modules.
- **`Modules.jsx` / `Modules.css`**: The library of AI/ML courses available for study.
- **`ModuleDetail.jsx` / `ModuleDetail.css`**: In-depth content for a specific learning module.
- **`Quiz.jsx` / `Quiz.css`**: Interactive assessment system with immediate feedback.
- **`Playground.jsx` / `Playground.css`**: An integrated code editor for testing ML algorithms in real-time.
- **`Games.jsx` / `Games.css`**: Interactive learning games (e.g., Sentiment Analysis, Image Classifiers).
- **`Simulations.jsx` / `Simulations.css`**: Visualizations of ML concepts like Linear Regression or Neural Networks.
- **`Leaderboard.jsx` / `Leaderboard.css`**: Competitive ranking system showing top learners.

##### Information Pages
- **`About.jsx`**: Learn about the mission and vision of LearNova.
- **`Careers.jsx`**: Employment opportunities and company culture.
- **`Contact.jsx` / `Community.jsx`**: Ways to reach out and join the learner community.
- **`Blog.jsx` / `Docs.jsx`**: Articles and technical documentation for extended learning.

#### 🔌 Services (`/frontend/src/services`)
- **`api.js`**: Centralized Axios/Fetch configuration for making calls to the backend.
- **`auth.js`**: Logic for interacting with Firebase Authentication services.
- **`firebase.js`**: Initialization of the Firebase Client SDK.

#### 📊 Data (`/frontend/src/data`)
- **`chatbotRules.js`**: Logic and dialogue trees for the chatbot.
- **`modules.js`**: Static content and metadata for learning modules.
- **`quizData.js`**: Question sets and answers for assessments.

---

## 🚀 Key Features

1.  **Guided ML Roadmap**: Step-by-step curriculum starting from basics to advanced and deep learning.
2.  **Live ML Playground**: Write and execute Python/JS code directly in the browser to see results.
3.  **Visual Simulations**: Interactive sliders and graphs to understand how parameters affect model outcomes.
4.  **AI Chatbot Assistant**: Rule-based support system to help with platform navigation and basic concept clarification.
5.  **Gamified Progress**: Earn XP and badges, climbing the leaderboard while you learn.
6.  **Responsive Design**: Desktop-first premium design that also adapts beautifully to tablets and mobile devices.

---

## 🛠 Setup & Installation

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/akashh-72/vibethon-atech-spot3.git
    cd LearNova
    ```

2.  **Backend Setup**:
    - Navigate to `/backend`.
    - Install dependencies: `npm install`.
    - Create a `.env` file with `PORT`, `CLIENT_URL`, and Firebase service account details.
    - Run: `npm run dev`.

3.  **Frontend Setup**:
    - Navigate to `/frontend`.
    - Install dependencies: `npm install`.
    - Create a `.env` file with Firebase client config keys.
    - Run: `npm run dev`.
