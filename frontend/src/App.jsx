import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./pages/Dashboard";
import Modules from "./pages/Modules";
import ModuleDetail from "./pages/ModuleDetail";
import Quiz from "./pages/Quiz";
import Playground from "./pages/Playground";
import Games from "./pages/Games";
import Simulations from "./pages/Simulations";
import Leaderboard from "./pages/Leaderboard";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Community from "./pages/Community";
import Blog from "./pages/Blog";
import Docs from "./pages/Docs";
import PublicLayout from "./components/layout/PublicLayout";
import { Menu, Brain } from "lucide-react";

import TutorBot from "./components/common/TutorBot";

import "./styles/global.css";
import "./App.css";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="loading-screen">
      <div className="spinner" />
      <p style={{ color: "var(--text-secondary)", marginTop: 12 }}>Loading LearNova...</p>
    </div>
  );
  return user ? children : <Navigate to="/login" replace />;
}

function MobileHeader({ onMenuOpen }) {
  return (
    <header className="mobile-header">
      <div className="mobile-header-logo">
        <div className="mobile-logo-icon">
          <Brain size={16} />
        </div>
        <span>LearNova</span>
      </div>
      <button className="mobile-menu-toggle" onClick={onMenuOpen}>
        <Menu size={24} />
      </button>
    </header>
  );
}

function AuthenticatedLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="page-layout">
      <MobileHeader onMenuOpen={() => setMobileMenuOpen(true)} />
      <Navbar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <main className="main-content">{children}</main>
      <TutorBot />
    </div>
  );
}

function AppRoutes() {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-screen"><div className="spinner" /></div>;

  return (
    <Routes>
      {/* Static Pages wrapped in PublicLayout */}
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <PublicLayout><Home /></PublicLayout>} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <AuthenticatedLayout><Dashboard /></AuthenticatedLayout>
        </ProtectedRoute>
      } />
      <Route path="/modules" element={
        <ProtectedRoute>
          <AuthenticatedLayout><Modules /></AuthenticatedLayout>
        </ProtectedRoute>
      } />
      <Route path="/modules/:moduleId" element={
        <ProtectedRoute>
          <AuthenticatedLayout><ModuleDetail /></AuthenticatedLayout>
        </ProtectedRoute>
      } />
      <Route path="/quiz" element={
        <ProtectedRoute>
          <AuthenticatedLayout><Quiz /></AuthenticatedLayout>
        </ProtectedRoute>
      } />
      <Route path="/quiz/:moduleId" element={
        <ProtectedRoute>
          <AuthenticatedLayout><Quiz /></AuthenticatedLayout>
        </ProtectedRoute>
      } />
      <Route path="/playground" element={
        <ProtectedRoute>
          <AuthenticatedLayout><Playground /></AuthenticatedLayout>
        </ProtectedRoute>
      } />
      <Route path="/games" element={
        <ProtectedRoute>
          <AuthenticatedLayout><Games /></AuthenticatedLayout>
        </ProtectedRoute>
      } />
      <Route path="/simulations" element={
        <ProtectedRoute>
          <AuthenticatedLayout><Simulations /></AuthenticatedLayout>
        </ProtectedRoute>
      } />
      <Route path="/leaderboard" element={
        <ProtectedRoute>
          <AuthenticatedLayout><Leaderboard /></AuthenticatedLayout>
        </ProtectedRoute>
      } />

      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/careers" element={<PublicLayout><Careers /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path="/community" element={<PublicLayout><Community /></PublicLayout>} />
      <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
      <Route path="/docs" element={<PublicLayout><Docs /></PublicLayout>} />


      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
