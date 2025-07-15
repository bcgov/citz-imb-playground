import { Server } from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents } from '../types';
import { gameService } from '../services/GameService';
import { captureGameEvent, setSentryUser } from '../config/sentry';
import * as Sentry from '@sentry/node';

export function setupSocketHandlers(io: Server<ClientToServerEvents, ServerToClientEvents>) {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle joining a room
    socket.on('join-room', ({ roomCode, username }) => {
      try {
        const room = gameService.getRoom(roomCode);
        if (!room) {
          socket.emit('room-error', 'Room not found');
          return;
        }

        if (room.status !== 'waiting') {
          socket.emit('room-error', 'Game already in progress');
          return;
        }

        const participant = gameService.addParticipant(roomCode, username, socket.id);
        if (!participant) {
          socket.emit('room-error', 'Unable to join room (room full or username taken)');
          return;
        }

        // Join the socket room
        socket.join(roomCode);

        // Set user context for Sentry
        setSentryUser(socket.id, username);

        // Send room data to the joining user
        socket.emit('room-joined', room);

        // Notify other players
        socket.to(roomCode).emit('player-joined', participant);

        // Track game event
        captureGameEvent('player_joined_room', {
          roomCode,
          username,
          playerCount: room.participants.length
        });

        console.log(`${username} joined room ${roomCode}`);
      } catch (error) {
        console.error('Error joining room:', error);
        socket.emit('room-error', 'Failed to join room');
      }
    });

    // Handle leaving a room
    socket.on('leave-room', (roomCode) => {
      handleLeaveRoom(socket, roomCode);
    });

    // Handle starting a game
    socket.on('start-game', (roomCode) => {
      try {
        const participant = gameService.getParticipant(socket.id);
        if (!participant || !participant.isHost) {
          socket.emit('room-error', 'Only the host can start the game');
          return;
        }

        const success = gameService.startGame(roomCode);
        if (!success) {
          socket.emit('room-error', 'Unable to start game');
          return;
        }

        // Start countdown
        let countdown = 3;
        const countdownInterval = setInterval(() => {
          io.to(roomCode).emit('game-countdown', countdown);
          countdown--;

          if (countdown < 0) {
            clearInterval(countdownInterval);
            gameService.setGameActive(roomCode);
            io.to(roomCode).emit('game-started');
            console.log(`Game started in room ${roomCode}`);
          }
        }, 1000);

      } catch (error) {
        console.error('Error starting game:', error);
        socket.emit('room-error', 'Failed to start game');
      }
    });

    // Handle typing progress updates
    socket.on('typing-progress', ({ roomCode, progress, wpm, accuracy, finished }) => {
      try {
        const participant = gameService.updateProgress(socket.id, progress, wpm, accuracy, finished);
        if (!participant) {
          return;
        }

        // Broadcast progress to all players in the room (including sender)
        io.to(roomCode).emit('player-progress', {
          playerId: participant.id,
          progress,
          wpm,
          accuracy
        });

        // Check if game should end
        if (gameService.shouldEndGame(roomCode)) {
          const room = gameService.endGame(roomCode);
          if (room) {
            const results = room.participants.map((p, index) => ({
              participantId: p.id,
              username: p.username,
              wpm: p.wpm,
              accuracy: p.accuracy,
              finishTime: p.finishTime || new Date(),
              rank: index + 1
            }));

            io.to(roomCode).emit('game-ended', results);
            
            // Track game completion
            captureGameEvent('game_completed', {
              roomCode,
              playerCount: results.length,
              averageWpm: results.reduce((sum, r) => sum + r.wpm, 0) / results.length,
              averageAccuracy: results.reduce((sum, r) => sum + r.accuracy, 0) / results.length
            });
            
            console.log(`Game ended in room ${roomCode}`);
          }
        }
      } catch (error) {
        console.error('Error updating progress:', error);
      }
    });

    // Handle game finished
    socket.on('game-finished', ({ roomCode, result }) => {
      try {
        const participant = gameService.updateProgress(
          socket.id,
          100,
          result.wpm,
          result.accuracy,
          true
        );

        if (participant) {
          socket.to(roomCode).emit('player-progress', {
            playerId: participant.id,
            progress: 100,
            wpm: result.wpm,
            accuracy: result.accuracy
          });
        }
      } catch (error) {
        console.error('Error finishing game:', error);
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      handleDisconnect(socket);
    });
  });
}

function handleLeaveRoom(socket: any, roomCode: string) {
  try {
    const { room, participant } = gameService.removeParticipant(socket.id);
    if (room && participant) {
      socket.leave(roomCode);
      socket.to(roomCode).emit('player-left', participant.id);
      console.log(`${participant.username} left room ${roomCode}`);
    }
  } catch (error) {
    console.error('Error leaving room:', error);
  }
}

function handleDisconnect(socket: any) {
  try {
    const { room, participant } = gameService.removeParticipant(socket.id);
    if (room && participant) {
      socket.to(room.roomCode).emit('player-left', participant.id);
      console.log(`${participant.username} disconnected from room ${room.roomCode}`);
    }
    console.log(`User disconnected: ${socket.id}`);
  } catch (error) {
    console.error('Error handling disconnect:', error);
  }
}
