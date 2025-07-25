import React from 'react';
import { GameRoom } from '../../types';

interface TextDisplayProps {
  gameRoom: GameRoom;
  typedText: string;
  targetText: string;
  currentIndex: number;
}

const TextDisplay: React.FC<TextDisplayProps> = ({ 
  gameRoom, 
  typedText, 
  targetText, 
  currentIndex 
}) => {
  const renderText = () => {
    return targetText.split('').map((char, index) => {
      let className = 'char';
      
      if (index < typedText.length) {
        if (typedText[index] === char) {
          className += ' correct';
        } else {
          className += ' incorrect';
        }
      } else if (index === currentIndex) {
        className += ' current';
      }

      return (
        <span key={index} className={className}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  };

  return (
    <div className="text-display">
      <div className="card">
        <h3 className="card-title">
          {gameRoom.textSource === 'default' ? 'Default Text' : gameRoom.textSource}
          {gameRoom.fileType !== 'txt' && ` (${gameRoom.fileType.toUpperCase()})`}
        </h3>
        <div className="text-container">
          <div className="text-content">
            {renderText()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextDisplay;
