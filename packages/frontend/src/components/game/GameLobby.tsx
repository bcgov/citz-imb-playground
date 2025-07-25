import React from 'react';
import { GameRoom, GameParticipant } from '../../types';
import { Button } from '@bcgov/design-system-react-components';
import './GameLobby.css';

interface GameLobbyProps {
  gameRoom: GameRoom;
  currentUser: GameParticipant;
  onStartGame: () => void;
}

const GameLobby: React.FC<GameLobbyProps> = ({ gameRoom, currentUser, onStartGame }) => {
  return (
    <div className="game-lobby">
      <div className="lobby-content">
        <div className="room-info">
          <div className="card">
            <h3 className="card-title">Game Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Room Code:</label>
                <span className="room-code">{gameRoom.roomCode}</span>
              </div>
              <div className="info-item">
                <label>Host:</label>
                <span>{gameRoom.hostUsername}</span>
              </div>
              <div className="info-item">
                <label>Text Source:</label>
                <span>{gameRoom.textSource === 'default' ? 'Default Text' : gameRoom.textSource}</span>
              </div>
              <div className="info-item">
                <label>File Type:</label>
                <span>{gameRoom.fileType.toUpperCase()}</span>
              </div>
              <div className="info-item">
                <label>Players:</label>
                <span>{gameRoom.participants.length}/{gameRoom.maxPlayers}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-preview">
          <div className="card">
            <h3 className="card-title">Text Preview</h3>
            <div className="preview-content">
              <pre className="text-content">
                {gameRoom.textContent.substring(0, 300)}
                {gameRoom.textContent.length > 300 && '...'}
              </pre>
            </div>
          </div>
        </div>

        <div className="players-list">
          <div className="card">
            <h3 className="card-title">Players ({gameRoom.participants.length})</h3>
            <div className="participants">
              {gameRoom.participants.map((participant) => (
                <div 
                  key={participant.id} 
                  className={`participant ${participant.id === currentUser.id ? 'current-user' : ''}`}
                >
                  <div className="participant-info">
                    <span className="username">{participant.username}</span>
                    {participant.isHost && <span className="host-badge">HOST</span>}
                    {participant.id === currentUser.id && <span className="you-badge">YOU</span>}
                  </div>
                  <div className="participant-status">
                    <span className="status-indicator ready"></span>
                    <span>Ready</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lobby-actions">
          {currentUser.isHost ? (
            <div className="host-actions">
              <Button 
                className="btn btn-primary"
                onClick={onStartGame}
                isDisabled={gameRoom.participants.length === 0}
              >
                Start Game
              </Button>
              <p className="action-hint">
                {gameRoom.participants.length === 0 
                  ? 'Waiting for players to join...' 
                  : `Ready to start with ${gameRoom.participants.length} player${gameRoom.participants.length > 1 ? 's' : ''}`
                }
              </p>
            </div>
          ) : (
            <div className="player-actions">
              <div className="waiting-message">
                <div className="spinner"></div>
                <p>Waiting for host to start the game...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameLobby;
