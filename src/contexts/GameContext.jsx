import { createContext, useContext, useState, useEffect } from 'react';
import { puzzles } from '../data/puzzles';

const GameContext = createContext();

export function useGame() {
  return useContext(GameContext);
}

export function GameProvider({ children }) {
  const [xp, setXp] = useState(0);
  const [currentPuzzles, setCurrentPuzzles] = useState([]);
  const [solvedPuzzles, setSolvedPuzzles] = useState([]);
  const [vaultOpen, setVaultOpen] = useState(false);
  const [vaultReward, setVaultReward] = useState(0);

  // Load saved game state
  useEffect(() => {
    const savedXp = localStorage.getItem('cipherVaultXp');
    if (savedXp) setXp(parseInt(savedXp));
    
    // Do NOT load solvedPuzzles from localStorage anymore
    setSolvedPuzzles([]); // Always reset to empty on page reload
  
    selectRandomPuzzles();
  }, []);

  // Save game state when it changes
  // useEffect(() => {
  //   localStorage.setItem('cipherVaultXp', xp);
  //   localStorage.setItem('cipherVaultSolvedPuzzles', JSON.stringify(solvedPuzzles));
  // }, [xp, solvedPuzzles]);

  // Check if all puzzles are solved to open vault
  useEffect(() => {
    if (
      currentPuzzles.length > 0 && 
      currentPuzzles.every(puzzle => 
        solvedPuzzles.includes(puzzle.id)
      )
    ) {
      const reward = calculateVaultReward();h
      setVaultReward(reward);
      setTimeout(() => {
        setVaultOpen(true);
        addXp(reward);
      }, 1000);
    }
  }, [currentPuzzles, solvedPuzzles]);

  const selectRandomPuzzles = () => {
    const easy = puzzles.filter(p => p.difficulty === 'easy');
    const medium = puzzles.filter(p => p.difficulty === 'medium');
    const hard = puzzles.filter(p => p.difficulty === 'hard');
    
    const getRandomItems = (array, count) => {
      const shuffled = [...array].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };
    
    const selectedPuzzles = [
      ...getRandomItems(easy, 2),
      ...getRandomItems(medium, 2),
      ...getRandomItems(hard, 1)
    ].sort(() => 0.5 - Math.random());
    
    setCurrentPuzzles(selectedPuzzles);
    setVaultOpen(false);
  };

  const solvePuzzle = (puzzleId) => {
    if (!solvedPuzzles.includes(puzzleId)) {
      const puzzle = puzzles.find(p => p.id === puzzleId);
      const puzzleXp = calculatePuzzleXp(puzzle.difficulty);
      addXp(puzzleXp);
      setSolvedPuzzles([...solvedPuzzles, puzzleId]);
    }
  };

  const calculatePuzzleXp = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 5;
      case 'medium': return 10;
      case 'hard': return 20;
      default: return 5;
    }
  };

  const calculateVaultReward = () => {
    return Math.floor(50 + Math.random() * 50);
  };

  const addXp = (amount) => {
    setXp(prevXp => prevXp + amount);
  };

  const getNextPuzzles = () => {
    selectRandomPuzzles();
  };

  const value = {
    xp,
    currentPuzzles,
    solvedPuzzles,
    vaultOpen,
    vaultReward,
    solvePuzzle,
    getNextPuzzles,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}