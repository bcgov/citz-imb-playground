// Game Room Types
export interface GameRoom {
  id: string;
  roomCode: string;
  hostUsername: string;
  textContent: string;
  textSource: string;
  fileType: string;
  status: 'waiting' | 'countdown' | 'active' | 'finished';
  maxPlayers: number;
  createdAt: Date;
  participants: GameParticipant[];
}

// Game Participant Types
export interface GameParticipant {
  id: string;
  username: string;
  socketId: string;
  progress: number;
  wpm: number;
  accuracy: number;
  finished: boolean;
  finishTime?: Date;
  isHost: boolean;
}

// Typing Progress Types
export interface TypingProgress {
  roomCode: string;
  progress: number;
  wpm: number;
  accuracy: number;
  finished: boolean;
}

// Game Result Types
export interface GameResult {
  participantId: string;
  username: string;
  wpm: number;
  accuracy: number;
  finishTime: Date;
  rank: number;
}

// Socket Event Types
export interface ClientToServerEvents {
  'join-room': (data: { roomCode: string; username: string }) => void;
  'leave-room': (roomCode: string) => void;
  'start-game': (roomCode: string) => void;
  'typing-progress': (data: TypingProgress) => void;
  'game-finished': (data: { roomCode: string; result: GameResult }) => void;
}

export interface ServerToClientEvents {
  'room-joined': (roomData: GameRoom) => void;
  'room-error': (error: string) => void;
  'player-joined': (player: GameParticipant) => void;
  'player-left': (playerId: string) => void;
  'game-started': () => void;
  'game-countdown': (seconds: number) => void;
  'player-progress': (progress: { playerId: string; progress: number; wpm: number; accuracy: number }) => void;
  'game-ended': (results: GameResult[]) => void;
}

// File Upload Types
export interface FileUploadResponse {
  success: boolean;
  filename?: string;
  content?: string;
  fileType?: string;
  error?: string;
}

// Supported File Types
export const SUPPORTED_FILE_TYPES: Record<string, string> = {
  '.txt': 'Plain Text',
  '.md': 'Markdown',
  '.ts': 'TypeScript',
  '.js': 'JavaScript',
  '.jsx': 'React JSX',
  '.tsx': 'React TSX',
  '.py': 'Python',
  '.java': 'Java',
  '.cpp': 'C++',
  '.c': 'C',
  '.cs': 'C#',
  '.php': 'PHP',
  '.rb': 'Ruby',
  '.go': 'Go',
  '.rs': 'Rust',
  '.swift': 'Swift',
  '.kt': 'Kotlin',
  '.scala': 'Scala',
  '.html': 'HTML',
  '.css': 'CSS',
  '.scss': 'SCSS',
  '.json': 'JSON',
  '.xml': 'XML',
  '.yaml': 'YAML',
  '.yml': 'YAML',
  '.sql': 'SQL'
};
