import { useGame } from '../../contexts/GameContext';
import PuzzleCard from './PuzzleCard';
import Vault from './Vault';
import './Dashboard.css';

function Dashboard() {
  const { currentPuzzles, getNextPuzzles, vaultOpen, vaultReward } = useGame();

  return (
    <div className="dashboard">
      <div className="dashboard-intro">
        <h2>Welcome to the <span className="highlight">CipherVault</span></h2>
        <p>Solve all five puzzles to unlock the vault and earn XP rewards!</p>
      </div>
      
      <div className="puzzles-grid">
        {currentPuzzles.map(puzzle => (
          <PuzzleCard key={puzzle.id} puzzle={puzzle} />
        ))}
      </div>
      
      <Vault isOpen={vaultOpen} reward={vaultReward} onContinue={getNextPuzzles} />
    </div>
  );
}

export default Dashboard;