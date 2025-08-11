import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { GameRoom, GameParticipant, GameResult, ClientToServerEvents, ServerToClientEvents } from '../types';
import GameLobby from '../components/game/GameLobby';
import TypingInterface from '../components/game/TypingInterface';
import GameResults from '../components/game/GameResults';
import { Button } from '@bcgov/design-system-react-components';

const GamePage: React.FC = () => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const navigate = useNavigate();
  const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
  const [gameRoom, setGameRoom] = useState<GameRoom | null>(null);
  const [currentUser, setCurrentUser] = useState<GameParticipant | null>(null);
  const [gameResults, setGameResults] = useState<GameResult[] | null>(null);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState<number | null>(null);
  const [connecting, setConnecting] = useState(true);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (!username || !roomCode) {
      navigate('/');
      return;
    }

    // Initialize socket connection
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    // Socket event listeners
    newSocket.on('connect', () => {
      console.log('Connected to server');
      newSocket.emit('join-room', { roomCode, username });
    });

    newSocket.on('room-joined', (roomData: GameRoom) => {
      console.log('Joined room:', roomData);
      setGameRoom(roomData);
      setConnecting(false);
      
      // Find current user in participants
      const user = roomData.participants.find(p => p.username === username);
      if (user) {
        setCurrentUser(user);
      }
    });

    newSocket.on('room-error', (errorMessage: string) => {
      console.error('Room error:', errorMessage);
      setError(errorMessage);
      setConnecting(false);
    });

    newSocket.on('player-joined', (player: GameParticipant) => {
      console.log('Player joined:', player);
      setGameRoom(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          participants: [...prev.participants, player]
        };
      });
    });

    newSocket.on('player-left', (playerId: string) => {
      console.log('Player left:', playerId);
      setGameRoom(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          participants: prev.participants.filter(p => p.id !== playerId)
        };
      });
    });

    newSocket.on('game-countdown', (seconds: number) => {
      console.log('Countdown:', seconds);
      setCountdown(seconds);
      setGameRoom(prev => prev ? { ...prev, status: 'countdown' } : prev);
    });

    newSocket.on('game-started', () => {
      console.log('Game started');
      setCountdown(null);
      setGameRoom(prev => prev ? { ...prev, status: 'active' } : prev);
    });

    newSocket.on('player-progress', ({ playerId, progress, wpm, accuracy }) => {
      console.log('Player progress:', playerId, progress, wpm, accuracy);
      setGameRoom(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          participants: prev.participants.map(p => 
            p.id === playerId 
              ? { ...p, progress, wpm, accuracy }
              : p
          )
        };
      });
    });

    newSocket.on('game-ended', (results: GameResult[]) => {
      console.log('Game ended:', results);
      setGameResults(results);
      setGameRoom(prev => prev ? { ...prev, status: 'finished' } : prev);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    // Cleanup on unmount
    return () => {
      newSocket.emit('leave-room', roomCode);
      newSocket.disconnect();
    };
  }, [roomCode, navigate]);

  const handleStartGame = () => {
    if (socket && roomCode) {
      socket.emit('start-game', roomCode);
    }
  };

  const handleTypingProgress = (progress: number, wpm: number, accuracy: number, finished: boolean) => {
    if (socket && roomCode) {
      socket.emit('typing-progress', {
        roomCode,
        progress,
        wpm,
        accuracy,
        finished
      });
    }
  };

  const handleLeaveGame = () => {
    if (socket && roomCode) {
      socket.emit('leave-room', roomCode);
    }
    navigate('/');
  };

  const handlePlayAgain = () => {
    navigate('/');
  };

  if (connecting) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Connecting to game...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="game-error">
        <div className="error">{error}</div>
        <Button className="btn btn-primary" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </div>
    );
  }

  if (!gameRoom || !currentUser) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading game...</p>
      </div>
    );
  }

  return (
    <div className="game-page">
      <div className="game-header">
        <h2>Room: {roomCode}</h2>
        <Button className="btn secondary" onClick={handleLeaveGame}>
          Leave Game
        </Button>
      </div>

      {countdown !== null && (
        <div className="countdown-overlay">
          <div className="countdown-number">{countdown === 0 ? 'GO!' : countdown}</div>
        </div>
      )}

      {gameRoom.status === 'waiting' && (
        <GameLobby
          gameRoom={gameRoom}
          currentUser={currentUser}
          onStartGame={handleStartGame}
        />
      )}

      {(gameRoom.status === 'countdown' || gameRoom.status === 'active') && (
        <TypingInterface
          gameRoom={gameRoom}
          currentUser={currentUser}
          onProgress={handleTypingProgress}
          isActive={gameRoom.status === 'active'}
        />
      )}

      {gameRoom.status === 'finished' && gameResults && (
        <GameResults
          results={gameResults}
          currentUser={currentUser}
          onPlayAgain={handlePlayAgain}
          onLeaveGame={handleLeaveGame}
        />
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        .game-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .game-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #ddd;
        }

        .game-header h2 {
          margin: 0;
          color: #333;
        }

        .game-error {
          text-align: center;
          padding: 40px;
        }

        .countdown-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .countdown-number {
          font-size: 8rem;
          font-weight: bold;
          color: white;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          animation: pulse 1s ease-in-out;
        }

        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        @media (max-width: 768px) {
          .game-page {
            padding: 10px;
          }

          .game-header {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }

          .countdown-number {
            font-size: 4rem;
          }
        }
        `
      }} />
    </div>
  );
};

export default GamePage;
