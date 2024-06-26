// ** Events Imports **
import { EVENTS } from '@inc/events';

// ** Types Imports **
import { Socket } from 'socket.io-client';
import type { Acknowlegement, ClientCreateRoom, ClientSendMessage, MakeOffer } from '@inc/types';

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

export function getRooms(socket: Socket, userId: string, ack: (ack: Acknowlegement) => void) {
  socket.emit(EVENTS.CLIENT.ROOM.GET, userId, ack);
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

export function syncMessage(socket: Socket, messageId: number, ack: (ack: Acknowlegement) => void) {
  socket.emit(EVENTS.CLIENT.MESSAGE.SYNC, messageId, ack);
}

export function getMessage(socket: Socket, roomId: string, ack: (ack: Acknowlegement) => void) {
  socket.emit(EVENTS.CLIENT.MESSAGE.GET, roomId, ack);
}

// ** Offers Events **
export function makeOffer(
  socket: Socket,
  offerData: MakeOffer,
  ack: (ack: Acknowlegement) => void
) {
  socket.emit(EVENTS.CLIENT.OFFER.MAKE, offerData, ack);
}

export function acceptOffer(socket: Socket, messageId: number, ack: (ack: Acknowlegement) => void) {
  socket.emit(EVENTS.CLIENT.OFFER.ACCEPT, messageId, ack);
}

export function rejectOffer(socket: Socket, messageId: number, ack: (ack: Acknowlegement) => void) {
  socket.emit(EVENTS.CLIENT.OFFER.REJECT, messageId, ack);
}

export function cancelOffer(socket: Socket, messageId: number, ack: (ack: Acknowlegement) => void) {
  socket.emit(EVENTS.CLIENT.OFFER.CANCEL, messageId, ack);
}

// ** Typing Events **
export function typingStart(socket: Socket, roomId: string) {
  socket.emit(EVENTS.CLIENT.TYPING.START, roomId);
}

export function typingStop(socket: Socket, roomId: string) {
  socket.emit(EVENTS.CLIENT.TYPING.STOP, roomId);
}
