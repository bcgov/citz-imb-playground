import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JoinGame from '../components/home/JoinGame';
import HostGame from '../components/home/HostGame';
import { Button } from '@bcgov/design-system-react-components';

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'join' | 'host'>('join');
  const navigate = useNavigate();

  const handleJoinSuccess = (roomCode: string) => {
    navigate(`/game/${roomCode}`);
  };

  const handleHostSuccess = (roomCode: string) => {
    navigate(`/game/${roomCode}`);
  };

  return (
    <div className="home-page">
      <div className="welcome-section">
        <h2>Welcome to TypeRacer!</h2>
        <p>Compete with others in real-time typing competitions</p>
      </div>

      <div className="tabs">
        <Button 
          className={`tab-button ${activeTab === 'join' ? 'active' : ''}`}
          onClick={() => setActiveTab('join')}
        >
          Join Game
        </Button>
        <Button 
          className={`tab-button ${activeTab === 'host' ? 'active' : ''}`}
          onClick={() => setActiveTab('host')}
        >
          Host Game
        </Button>
      </div>

      <div className="tab-content">
        {activeTab === 'join' ? (
          <JoinGame onSuccess={handleJoinSuccess} />
        ) : (
          <HostGame onSuccess={handleHostSuccess} />
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .home-page {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }

        .welcome-section {
          text-align: center;
          margin-bottom: 40px;
        }

        .welcome-section h2 {
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 10px;
        }

        .welcome-section p {
          font-size: 1.2rem;
          color: #666;
        }

        .tabs {
          display: flex;
          margin-bottom: 30px;
          border-bottom: 2px solid #ddd;
        }

        .tab-button {
          flex: 1;
          padding: 15px 20px;
          border: none;
          background: none;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border-bottom: 3px solid transparent;
        }

        .tab-button:hover {
          background-color: #f8f9fa;
        }

        .tab-button.active {
          color: #007bff;
          border-bottom-color: #007bff;
        }

        .tab-content {
          min-height: 400px;
        }

        @media (max-width: 768px) {
          .home-page {
            padding: 10px;
          }

          .welcome-section h2 {
            font-size: 2rem;
          }

          .welcome-section p {
            font-size: 1rem;
          }
        }
        `
      }} />
    </div>
  );
};

export default HomePage;
