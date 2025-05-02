import { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { Check, X, HelpCircle, Award } from 'lucide-react';
import './PuzzleCard.css';

function PuzzleCard({ puzzle }) {
  const { solvePuzzle, solvedPuzzles } = useGame();
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [correct, setCorrect] = useState(false);
  
  const isSolved = solvedPuzzles.includes(puzzle.id);
  
  const handleOptionSelect = (optionIndex) => {
    if (isSolved || attempted) return;
    setSelectedOption(optionIndex);
  };
  
  const handleSubmit = () => {
    if (selectedOption === null || isSolved) return;
    
    setAttempted(true);
    
    if (selectedOption === puzzle.answer) {
      setCorrect(true);
      solvePuzzle(puzzle.id);
    }
  };
  
  const getDifficultyColor = () => {
    switch (puzzle.difficulty) {
      case 'easy': return '#56efff';
      case 'medium': return '#ff9f45';
      case 'hard': return '#ff2a6d';
      default: return '#56efff';
    }
  };
  
  const difficultyColor = getDifficultyColor();
  
  return (
    <div className={`puzzle-card ${isSolved ? 'solved' : ''} ${attempted && !correct ? 'incorrect' : ''}`}>
      <div 
        className="difficulty-badge"
        style={{ backgroundColor: difficultyColor }}
      >
        {puzzle.difficulty}
      </div>
      
      <h3 className="puzzle-title">{puzzle.title}</h3>
      
      <div className="puzzle-question">
        <p>{puzzle.question}</p>
      </div>
      
      <div className="puzzle-options">
        {puzzle.options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${selectedOption === index ? 'selected' : ''} ${
              attempted && index === puzzle.answer ? 'correct' : ''
            } ${attempted && selectedOption === index && index !== puzzle.answer ? 'wrong' : ''}`}
            onClick={() => handleOptionSelect(index)}
            disabled={isSolved || attempted}
          >
            <span className="option-text">{option}</span>
            {attempted && index === puzzle.answer && (
              <Check className="option-icon correct" />
            )}
            {attempted && selectedOption === index && index !== puzzle.answer && (
              <X className="option-icon wrong" />
            )}
          </button>
        ))}
      </div>
      
      <div className="puzzle-actions">
        {!isSolved && !attempted && (
          <button 
            className="submit-button"
            onClick={handleSubmit}
            disabled={selectedOption === null}
          >
            Submit Answer
          </button>
        )}
        
        {(isSolved || attempted) && (
          <button 
            className="explanation-button"
            onClick={() => setShowExplanation(!showExplanation)}
          >
            {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
            <HelpCircle size={16} />
          </button>
        )}
      </div>
      
      {showExplanation && (
        <div className="explanation-box">
          <p>{puzzle.explanation}</p>
        </div>
      )}
      
      {isSolved && (
        <div className="solved-badge">
          <Award />
          <span>Solved</span>
        </div>
      )}
    </div>
  );
}

export default PuzzleCard;