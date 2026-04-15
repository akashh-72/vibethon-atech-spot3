import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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

function AuthenticatedLayout({ children }) {
  return (
    <div className="page-layout">
      <Navbar />
      <main className="main-content">{children}</main>
    </div>
  );
}

function AppRoutes() {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-screen"><div className="spinner" /></div>;

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Home />} />
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
