import React, { useState, useEffect, useRef } from 'react';
import { GameRoom, GameParticipant } from '../../types';
import { captureTypingMetrics, captureGameEvent } from '../../config/sentry';
import TextDisplay from './TextDisplay';
import TypingArea from './TypingArea';
import Leaderboard from './Leaderboard';
import './TypingInterface.css';

interface TypingInterfaceProps {
  gameRoom: GameRoom;
  currentUser: GameParticipant;
  onProgress: (progress: number, wpm: number, accuracy: number, finished: boolean) => void;
  isActive: boolean;
}

const TypingInterface: React.FC<TypingInterfaceProps> = ({ 
  gameRoom, 
  currentUser, 
  onProgress, 
  isActive 
}) => {
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [finished, setFinished] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const targetText = gameRoom.textContent;

  useEffect(() => {
    if (isActive && !startTime) {
      setStartTime(new Date());
      inputRef.current?.focus();
    }
  }, [isActive, startTime]);

  useEffect(() => {
    if (!isActive || !startTime) return;

    const correctChars = typedText.split('').filter((char, index) => 
      char === targetText[index]
    ).length;

    // TODO: Refactor to a better algorithm
    const totalChars = typedText.length;
    const newAccuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
    
    const timeElapsed = (new Date().getTime() - startTime.getTime()) / 1000 / 60; // minutes
    const wordsTyped = correctChars / 5; // Standard: 5 characters = 1 word
    const newWpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;

    const progress = Math.round((correctChars / targetText.length) * 100);
    const isFinished = correctChars >= targetText.length;

    setWpm(newWpm);
    setAccuracy(newAccuracy);
    setCurrentIndex(correctChars);

    if (isFinished && !finished) {
      setFinished(true);
      
      // Capture typing performance metrics
      const duration = startTime ? (new Date().getTime() - startTime.getTime()) / 1000 : 0;
      const errors = totalChars - correctChars;
      
      captureTypingMetrics({
        wpm: newWpm,
        accuracy: newAccuracy,
        duration,
        errors
      });
      
      captureGameEvent('typing_completed', {
        roomCode: gameRoom.roomCode,
        username: currentUser.username,
        finalWpm: newWpm,
        finalAccuracy: newAccuracy,
        textLength: targetText.length,
        duration
      });
    }

    onProgress(progress, newWpm, newAccuracy, isFinished);
  }, [typedText, targetText, startTime, isActive, onProgress, finished]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isActive || finished) return;
    
    const value = e.target.value;
    
    // Prevent typing beyond the target text length
    if (value.length <= targetText.length) {
      setTypedText(value);
    }
  };

  return (
    <div className="typing-interface">
      <div className="game-content">
        <TextDisplay 
          gameRoom={gameRoom}
          typedText={typedText}
          targetText={targetText}
          currentIndex={currentIndex}
        />
        
        <TypingArea 
          typedText={typedText}
          wpm={wpm}
          accuracy={accuracy}
          currentIndex={currentIndex}
          targetTextLength={targetText.length}
          isActive={isActive}
          finished={finished}
          inputRef={inputRef}
          onInputChange={handleInputChange}
        />
        
        <Leaderboard 
          gameRoom={gameRoom}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};

export default TypingInterface;
