import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Header from './components/layout/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/game/Dashboard';
// import XpDisplay from './components/XpDisplay'; 
import XpDisplay from './components/game/Xpdisplay';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Initializing System...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <XpDisplay /> {/* ✅ XP counter shown in top-right corner */}
      <main className="main-content">
        <Routes>
          <Route 
            path="/" 
            element={<Navigate to="/login" />} 
          />
          <Route 
            path="/login" 
            element={!user ? <Login /> : <Navigate to="/" />} 
          />
          <Route 
            path="/dashboard" 
            element={<Dashboard /> } 
          />
          <Route 
            path="/register" 
            element={!user ? <Register /> : <Navigate to="/" />} 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;