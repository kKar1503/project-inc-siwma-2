// ** Events Imports **
import { EVENTS } from '@inc/events';

// ** Types Imports **
import { Socket } from 'socket.io-client';
import { Acknowlegement, ClientCreateRoom, ClientSendMessage } from '@inc/types';

// ** Room Events **
export function joinRoom(socket: Socket, roomId: string, ack: (ack: Acknowlegement) => void) {
  socket.emit(EVENTS.CLIENT.ROOM.JOIN, roomId, ack);
}

export function partRoom(socket: Socket, roomId: string, ack: (ack: Acknowlegement) => void) {
  socket.emit(EVENTS.CLIENT.ROOM.PART, roomId, ack);
}

export function createRoom(
  socket: Socket,
  roomData: ClientCreateRoom,
  ack: (ack: Acknowlegement) => void
) {
  socket.emit(EVENTS.CLIENT.ROOM.CREATE, roomData, ack);
}

export function deleteRoom(socket: Socket, roomId: string, ack: (ack: Acknowlegement) => void) {
  socket.emit(EVENTS.CLIENT.ROOM.DELETE, roomId, ack);
}

// ** Message Events **
export function sendMessage(
  socket: Socket,
  message: ClientSendMessage,
  ack: (ack: Acknowlegement) => void
) {
  socket.emit(EVENTS.CLIENT.MESSAGE.SEND, message, ack);
}

export function deleteMessage(
  socket: Socket,
  messageId: string,
  ack: (ack: Acknowlegement) => void
) {
  socket.emit(EVENTS.CLIENT.MESSAGE.DELETE, messageId, ack);
}

export function readMessage(socket: Socket, roomId: string, ack: (ack: Acknowlegement) => void) {
  socket.emit(EVENTS.CLIENT.MESSAGE.READ, roomId, ack);
}

export function syncMessage(socket: Socket, messageId: string, ack: (ack: Acknowlegement) => void) {
  socket.emit(EVENTS.CLIENT.MESSAGE.SYNC, messageId, ack);
}

// ** Typing Events **
export function typingStart(socket: Socket, roomId: string) {
  socket.emit(EVENTS.CLIENT.TYPING.START, roomId);
}

export function typingStop(socket: Socket, roomId: string) {
  socket.emit(EVENTS.CLIENT.TYPING.STOP, roomId);
}
