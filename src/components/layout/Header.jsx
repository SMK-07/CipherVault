import { useAuth } from '../../contexts/AuthContext';
import { useGame } from '../../contexts/GameContext';
import { Brain, LogOut } from 'lucide-react';
import './Header.css';

function Header() {
  const { user, logout } = useAuth();
  const { xp } = useGame();

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Brain className="logo-icon" />
          <h1>CipherVault</h1>
        </div>

        {user && (
          <div className="user-section">
            <div className="xp-display">
              <span className="xp-label">XP</span>
              <span className="xp-value">{xp}</span>
            </div>
            <div className="user-info">
              <span className="username">{user.name}</span>
              <button className="logout-btn" onClick={logout}>
                <LogOut size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;