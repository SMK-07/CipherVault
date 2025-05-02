import { useEffect, useState } from 'react';
import { DollarSign, ChevronRight } from 'lucide-react';
import './Vault.css';

function Vault({ isOpen, reward, onContinue }) {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showReward, setShowReward] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      // Start the reward animation after the vault opens
      const timer = setTimeout(() => {
        setShowReward(true);
      }, 1200); // Slightly after the vault opens
      
      return () => clearTimeout(timer);
    } else {
      // Reset states when vault closes
      setAnimationComplete(false);
      setShowReward(false);
    }
  }, [isOpen]);
  
  if (!isOpen) return null;

  return (
    <div className="vault-container">
      <div className="vault-overlay" onClick={animationComplete ? onContinue : null}>
        <div className={`vault ${isOpen ? 'open' : ''}`} 
          onAnimationEnd={() => setAnimationComplete(true)}>
          <div className="vault-door left"></div>
          <div className="vault-door right"></div>
          
          {showReward && (
            <div className="vault-reward">
              <DollarSign className="reward-icon" />
              <div className="reward-text">
                <span className="reward-title">XP REWARDED</span>
                <span className="reward-amount">+{reward}</span>
              </div>
            </div>
          )}
        </div>
        
        {animationComplete && (
          <button className="continue-button" onClick={onContinue}>
            Continue <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Vault;