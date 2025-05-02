import React from 'react';
// import { useGame } from '../contexts/GameContext'; // adjust path
import { useGame } from '../../contexts/GameContext';

const XpDisplay = () => {
  const { xp } = useGame();

  return (
    <div style={styles.container}>
      <span style={styles.text}>XP: {xp}</span>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    top: '10px',
    right: '20px',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: '8px 14px',
    borderRadius: '8px',
    fontWeight: 'bold',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    zIndex: 1000,
  },
  text: {
    fontSize: '16px',
  },
};

export default XpDisplay;