import React, { useState } from 'react';
import {TextField, Button} from '@bcgov/design-system-react-components';
import { containsImproperWord } from '../utils/usernameValidation';
import './JoinGame.css';

interface JoinGameProps {
  onSuccess: (roomCode: string) => void;
}

// Helper function to validate room code
const isRoomCodeValid = (code: string) => {
  return /^[A-Z0-9]{6}$/.test(code);
};

const JoinGame: React.FC<JoinGameProps> = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }
    
    if (!roomCode.trim()) {
      setError('Please enter a room code');
      return;
    }

    if (!isRoomCodeValid(roomCode.trim().toUpperCase())) {
      setError('Room code must be 6 characters (letters and numbers only)');
      return;
    }

    if (containsImproperWord(username)) {
      setError('Inappropriate username!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Store username in localStorage for the game page
      localStorage.setItem('username', username.trim());
      
      // Navigate to game page - the socket connection will be handled there
      onSuccess(roomCode.trim().toUpperCase());
    } catch (err) {
      setError('Failed to join game. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3 className="card-title">Join a Game</h3>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <TextField
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(input) => setUsername(input)}
            placeholder="Enter your username"
            isInvalid={containsImproperWord(username)} 
            errorMessage="Naughty! Inappropriate username!"
            maxLength={20}
            isDisabled={loading}
            {...({} as any)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="roomCode">Room Code</label>
          <TextField
            type="text"
            id="roomCode"
            className="form-control"
            value={roomCode}
            onChange={(input) => setRoomCode(input.toUpperCase())}
            placeholder="Enter 6-character room code"
            isInvalid={roomCode.length > 0 && !isRoomCodeValid(roomCode)}
            errorMessage="Room code must be 6 characters (letters and numbers only)"
            maxLength={6}
            isDisabled={loading}
            style={{ textTransform: 'uppercase' }}
            {...({} as any)}
          />
        </div>
        
        <Button 
          type="submit" 
          className="btn btn-primary"
          isDisabled={loading || 
            !isRoomCodeValid(roomCode) || 
            containsImproperWord(username) ||
            !username.trim() || 
            !roomCode.trim()}
        >
          {loading ? 'Joining...' : 'Join Game'}
        </Button>
      </form>
    </div>
  );
};

export default JoinGame;
