import React from 'react';
import { GameResult, GameParticipant } from '../../types';
import CelebrationHeader from './CelebrationHeader';
import PersonalStats from './PersonalStats';
import FinalLeaderboard from './FinalLeaderboard';
import { Button } from '@bcgov/design-system-react-components';
import './GameResults.css';

interface GameResultsProps {
  results: GameResult[];
  currentUser: GameParticipant;
  onPlayAgain: () => void;
  onLeaveGame: () => void;
}

const GameResults: React.FC<GameResultsProps> = ({ 
  results, 
  currentUser, 
  onPlayAgain, 
  onLeaveGame 
}) => {
  const currentUserResult = results.find(r => r.username === currentUser.username);

  return (
    <div className="game-results">
      <CelebrationHeader currentUserResult={currentUserResult} />
      
      <div className="results-content">
        <PersonalStats currentUserResult={currentUserResult} />
        <FinalLeaderboard results={results} currentUser={currentUser} />
      </div>

      <div className="results-actions">
        <Button className="btn btn-primary btn-large" onClick={onPlayAgain}>
          Play Again
        </Button>
        <Button className="btn btn-secondary" onClick={onLeaveGame}>
          Leave Game
        </Button>
      </div>
    </div>
  );
};

export default GameResults;
