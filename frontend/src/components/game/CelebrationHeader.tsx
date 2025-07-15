import React from 'react';
import { GameResult, GameParticipant } from '../../types';

interface CelebrationHeaderProps {
  currentUserResult: GameResult | undefined;
}

const CelebrationHeader: React.FC<CelebrationHeaderProps> = ({ currentUserResult }) => {
  const isWinner = currentUserResult?.rank === 1;
  
  const getRankSuffix = (rank: number) => {
    if (rank === 1) return 'st';
    if (rank === 2) return 'nd';
    if (rank === 3) return 'rd';
    return 'th';
  };

  return (
    <div className="results-header">
      <div className="celebration">
        {isWinner ? (
          <>
            <div className="trophy">🏆</div>
            <h2>Congratulations!</h2>
            <p>You won the race!</p>
          </>
        ) : (
          <>
            <div className="trophy">🏁</div>
            <h2>Race Complete!</h2>
            <p>
              You finished {currentUserResult?.rank}
              {currentUserResult?.rank && getRankSuffix(currentUserResult.rank)} place
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CelebrationHeader;
