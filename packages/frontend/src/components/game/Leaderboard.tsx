import React from 'react';
import { GameRoom, GameParticipant } from '../../types';

interface LeaderboardProps {
  gameRoom: GameRoom;
  currentUser: GameParticipant;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ gameRoom, currentUser }) => {
  const sortedParticipants = [...gameRoom.participants].sort((a, b) => b.progress - a.progress);

  return (
    <div className="leaderboard">
      <div className="card">
        <h3 className="card-title">Live Rankings</h3>
        <div className="participants-list">
          {sortedParticipants.map((participant, index) => (
            <div 
              key={participant.id}
              className={`participant-item ${participant.id === currentUser.id ? 'current-user' : ''} ${participant.finished ? 'finished' : ''}`}
            >
              <div className="rank">#{index + 1}</div>
              <div className="participant-details">
                <div className="username">
                  {participant.username}
                  {participant.id === currentUser.id && ' (You)'}
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${participant.progress}%` }}
                  ></div>
                </div>
                <div className="stats">
                  {participant.wpm} WPM | {participant.accuracy}%
                </div>
              </div>
              {participant.finished && <div className="finished-badge">✓</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
