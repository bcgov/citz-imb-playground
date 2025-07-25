import React, { useState } from 'react';
import axios from 'axios';
import FileUpload from '../host/FileUpload';
import {TextField, Button, Radio, RadioGroup} from '@bcgov/design-system-react-components';
import { containsImproperWord } from '../utils/usernameValidation';

interface HostGameProps {
  onSuccess: (roomCode: string) => void;
}

const HostGame: React.FC<HostGameProps> = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [textContent, setTextContent] = useState('');
  const [textSource, setTextSource] = useState('default');
  const [fileType, setFileType] = useState('txt');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    if (containsImproperWord(username)) {
      setError('Inappropriate username!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/games/create', {
        hostUsername: username.trim(),
        textContent: textContent || undefined,
        textSource,
        fileType
      });

      if (response.data.success) {
        // Store username in localStorage for the game page
        localStorage.setItem('username', username.trim());
        onSuccess(response.data.roomCode);
      } else {
        setError('Failed to create room');
      }
    } catch (err) {
      setError('Failed to create room. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (content: string, filename: string, type: string) => {
    setTextContent(content);
    setTextSource(filename);
    setFileType(type);
  };

  return (
    <div className="card">
      <h3 className="card-title">Host a Game</h3>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="hostUsername">Username</label>
          <TextField
            type="text"
            id="hostUsername"
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
          <label>Text Source</label>
          <RadioGroup
            orientation="vertical"
            value={textSource === 'default' ? 'default' : 'upload'}
            onChange={(val) => {
              if (val === 'default') {
                setTextContent('');
                setTextSource('default');
                setFileType('txt');
              } else {
                setTextSource('upload');
              }
            }}
          >
            <Radio
              id="default-text"
              value="default"
              isDisabled={loading}
            >Use default text</Radio>
            <Radio
              id="upload-file"
              value="upload"
              isDisabled={loading}
            >Upload file</Radio>
          </RadioGroup>
        </div>

        {textSource !== 'default' && (
          <div className="form-group">
            <FileUpload onUpload={handleFileUpload} />
            {textContent && (
              <div className="file-preview">
                <h4>Preview ({textSource}):</h4>
                <pre className="preview-content">
                  {textContent.substring(0, 200)}
                  {textContent.length > 200 && '...'}
                </pre>
              </div>
            )}
          </div>
        )}
        
        <Button 
          type="submit" 
          className="btn btn-primary"
          isDisabled={loading || 
            !username.trim() || 
            containsImproperWord(username) ||
            (textSource === 'upload' && !textContent.trim())}
        >
          {loading ? 'Creating...' : 'Create Room'}
        </Button>
      </form>
    </div>
  );
};

export default HostGame;
