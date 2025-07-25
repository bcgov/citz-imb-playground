import React from 'react';
import { GameResult, GameParticipant } from '../../types';

interface FinalLeaderboardProps {
  results: GameResult[];
  currentUser: GameParticipant;
}

const FinalLeaderboard: React.FC<FinalLeaderboardProps> = ({ results, currentUser }) => {
  const getRankColor = (rank: number) => {
    if (rank === 1) return '#ffd700'; // Gold
    if (rank === 2) return '#c0c0c0'; // Silver
    if (rank === 3) return '#cd7f32'; // Bronze
    return '#666';
  };

  return (
    <div className="leaderboard-final">
      <div className="card">
        <h3 className="card-title">Final Rankings</h3>
        <div className="results-list">
          {results.map((result) => (
            <div 
              key={result.participantId}
              className={`result-item ${result.username === currentUser.username ? 'current-user' : ''}`}
            >
              <div className="rank-display">
                <div 
                  className="rank-number"
                  style={{ backgroundColor: getRankColor(result.rank) }}
                >
                  {result.rank}
                </div>
                {result.rank <= 3 && (
                  <div className="medal">
                    {result.rank === 1 && '🥇'}
                    {result.rank === 2 && '🥈'}
                    {result.rank === 3 && '🥉'}
                  </div>
                )}
              </div>
              
              <div className="player-info">
                <div className="username">
                  {result.username}
                  {result.username === currentUser.username && ' (You)'}
                </div>
                <div className="performance">
                  <span className="wpm">{result.wpm} WPM</span>
                  <span className="accuracy">{result.accuracy}% accuracy</span>
                </div>
              </div>
              
              <div className="finish-time">
                {new Date(result.finishTime).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinalLeaderboard;
