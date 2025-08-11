import { GameRoom, GameParticipant } from '../types';
import { v4 as uuidv4 } from 'uuid';

class GameService {
  private rooms: Map<string, GameRoom> = new Map();
  private participants: Map<string, GameParticipant> = new Map();

  // Generate a unique 6-character room code
  generateRoomCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Ensure uniqueness
    if (this.rooms.has(result)) {
      return this.generateRoomCode();
    }
    
    return result;
  }

  // Create a new game room
  createRoom(hostUsername: string, textContent: string = '', textSource: string = 'default', fileType: string = 'txt'): GameRoom {
    const roomCode = this.generateRoomCode();
    const room: GameRoom = {
      id: uuidv4(),
      roomCode,
      hostUsername,
      textContent: textContent || this.getDefaultText(),
      textSource,
      fileType,
      status: 'waiting',
      maxPlayers: 10,
      createdAt: new Date(),
      participants: []
    };

    this.rooms.set(roomCode, room);
    return room;
  }

  // Get room by code
  getRoom(roomCode: string): GameRoom | undefined {
    return this.rooms.get(roomCode);
  }

  // Add participant to room
  addParticipant(roomCode: string, username: string, socketId: string): GameParticipant | null {
    const room = this.rooms.get(roomCode);
    if (!room || room.status !== 'waiting') {
      return null;
    }

    if (room.participants.length >= room.maxPlayers) {
      return null;
    }

    // Check if username already exists in room
    if (room.participants.some(p => p.username === username)) {
      return null;
    }

    const participant: GameParticipant = {
      id: uuidv4(),
      username,
      socketId,
      progress: 0,
      wpm: 0,
      accuracy: 100,
      finished: false,
      isHost: username === room.hostUsername
    };

    room.participants.push(participant);
    this.participants.set(socketId, participant);
    
    return participant;
  }

  // Remove participant from room
  removeParticipant(socketId: string): { room: GameRoom | null, participant: GameParticipant | null } {
    const participant = this.participants.get(socketId);
    if (!participant) {
      return { room: null, participant: null };
    }

    // Find the room containing this participant
    let targetRoom: GameRoom | null = null;
    for (const room of this.rooms.values()) {
      const index = room.participants.findIndex(p => p.socketId === socketId);
      if (index !== -1) {
        room.participants.splice(index, 1);
        targetRoom = room;
        break;
      }
    }

    this.participants.delete(socketId);

    // If room is empty, delete it
    if (targetRoom && targetRoom.participants.length === 0) {
      this.rooms.delete(targetRoom.roomCode);
    }

    return { room: targetRoom, participant };
  }

  // Start game
  startGame(roomCode: string): boolean {
    const room = this.rooms.get(roomCode);
    if (!room || room.status !== 'waiting' || room.participants.length === 0) {
      return false;
    }

    room.status = 'countdown';
    return true;
  }

  // Set game as active
  setGameActive(roomCode: string): boolean {
    const room = this.rooms.get(roomCode);
    if (!room || room.status !== 'countdown') {
      return false;
    }

    room.status = 'active';
    return true;
  }

  // Update participant progress
  updateProgress(socketId: string, progress: number, wpm: number, accuracy: number, finished: boolean): GameParticipant | null {
    const participant = this.participants.get(socketId);
    if (!participant) {
      return null;
    }

    participant.progress = progress;
    participant.wpm = wpm;
    participant.accuracy = accuracy;
    participant.finished = finished;

    if (finished && !participant.finishTime) {
      participant.finishTime = new Date();
    }

    return participant;
  }

  // Check if game should end
  shouldEndGame(roomCode: string): boolean {
    const room = this.rooms.get(roomCode);
    if (!room || room.status !== 'active') {
      return false;
    }

    // Game ends when all participants finish or after a timeout
    return room.participants.every(p => p.finished);
  }

  // End game and calculate results
  endGame(roomCode: string): GameRoom | null {
    const room = this.rooms.get(roomCode);
    if (!room) {
      return null;
    }

    room.status = 'finished';

    // Sort participants by finish time and WPM for ranking
    const sortedParticipants = [...room.participants].sort((a, b) => {
      if (a.finished && !b.finished) return -1;
      if (!a.finished && b.finished) return 1;
      if (a.finished && b.finished) {
        if (a.finishTime && b.finishTime) {
          return a.finishTime.getTime() - b.finishTime.getTime();
        }
      }
      return b.wpm - a.wpm; // Higher WPM wins
    });

    room.participants = sortedParticipants;
    return room;
  }

  // Get participant by socket ID
  getParticipant(socketId: string): GameParticipant | undefined {
    return this.participants.get(socketId);
  }

  // Get default typing text
  private getDefaultText(): string {
    const defaultTexts = [
      "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet at least once, making it perfect for typing practice.",
      "In the world of programming, clean code is not just about making it work, but making it readable, maintainable, and elegant. Every line should tell a story.",
      "TypeScript brings static typing to JavaScript, helping developers catch errors early and write more robust applications. It's a powerful tool for modern web development."
    ];
    
    return defaultTexts[Math.floor(Math.random() * defaultTexts.length)];
  }

  // Get all rooms (for debugging)
  getAllRooms(): GameRoom[] {
    return Array.from(this.rooms.values());
  }

  // Clean up old rooms (call periodically)
  cleanupOldRooms(): void {
    const now = new Date();
    const maxAge = 2 * 60 * 60 * 1000; // 2 hours

    for (const [roomCode, room] of this.rooms.entries()) {
      if (now.getTime() - room.createdAt.getTime() > maxAge) {
        // Remove all participants from this room
        room.participants.forEach(p => {
          this.participants.delete(p.socketId);
        });
        this.rooms.delete(roomCode);
      }
    }
  }
}

export const gameService = new GameService();
