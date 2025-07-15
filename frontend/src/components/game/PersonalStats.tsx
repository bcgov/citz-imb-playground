import React from 'react';
import { GameResult } from '../../types';

interface PersonalStatsProps {
  currentUserResult: GameResult | undefined;
}

const PersonalStats: React.FC<PersonalStatsProps> = ({ currentUserResult }) => {
  const getRankColor = (rank: number) => {
    if (rank === 1) return '#ffd700'; // Gold
    if (rank === 2) return '#c0c0c0'; // Silver
    if (rank === 3) return '#cd7f32'; // Bronze
    return '#666';
  };

  if (!currentUserResult) {
    return null;
  }

  return (
    <div className="personal-stats">
      <div className="card">
        <h3 className="card-title">Your Performance</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-label">Final Rank</div>
            <div className="stat-value rank-value" style={{ color: getRankColor(currentUserResult.rank) }}>
              #{currentUserResult.rank}
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Words Per Minute</div>
            <div className="stat-value">{currentUserResult.wpm}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Accuracy</div>
            <div className="stat-value">{currentUserResult.accuracy}%</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Finish Time</div>
            <div className="stat-value">
              {new Date(currentUserResult.finishTime).toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalStats;
