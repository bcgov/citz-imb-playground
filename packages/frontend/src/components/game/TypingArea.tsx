import React from 'react';

interface TypingAreaProps {
  typedText: string;
  wpm: number;
  accuracy: number;
  currentIndex: number;
  targetTextLength: number;
  isActive: boolean;
  finished: boolean;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TypingArea: React.FC<TypingAreaProps> = ({
  typedText,
  wpm,
  accuracy,
  currentIndex,
  targetTextLength,
  isActive,
  finished,
  inputRef,
  onInputChange
}) => {
  return (
    <div className="typing-area">
      <div className="card">
        <div className="stats-bar">
          <div className="stat">
            <label>WPM:</label>
            <span className="stat-value">{wpm}</span>
          </div>
          <div className="stat">
            <label>Accuracy:</label>
            <span className="stat-value">{accuracy}%</span>
          </div>
          <div className="stat">
            <label>Progress:</label>
            <span className="stat-value">{Math.round((currentIndex / targetTextLength) * 100)}%</span>
          </div>
        </div>
        
        <textarea
          ref={inputRef}
          value={typedText}
          onChange={onInputChange}
          placeholder={isActive ? "Start typing..." : "Waiting for game to start..."}
          disabled={!isActive || finished}
          className="typing-input"
          rows={6}
        />
        
        {finished && (
          <div className="completion-message">
            <h4>🎉 Completed!</h4>
            <p>Final WPM: {wpm} | Accuracy: {accuracy}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingArea;
