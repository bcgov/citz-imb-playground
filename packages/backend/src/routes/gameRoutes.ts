import express from 'express';
import { gameService } from '../services/GameService';

const router = express.Router();

// Create a new game room
router.post('/create', (req: any, res: any) => {
  try {
    const { hostUsername, textContent, textSource, fileType } = req.body;
    
    if (!hostUsername) {
      return res.status(400).json({ error: 'Host username is required' });
    }

    const room = gameService.createRoom(hostUsername, textContent, textSource, fileType);
    res.json({ 
      success: true, 
      roomCode: room.roomCode,
      room 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create room' });
  }
});

// Get room information
router.get('/:roomCode', (req: any, res: any) => {
  try {
    const { roomCode } = req.params;
    const room = gameService.getRoom(roomCode);
    
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json({ room });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get room' });
  }
});

// Get all rooms (for debugging)
router.get('/', (req: any, res: any) => {
  try {
    const rooms = gameService.getAllRooms();
    res.json({ rooms });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get rooms' });
  }
});

export default router;
