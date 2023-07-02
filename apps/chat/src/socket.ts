import { Server } from 'socket.io';
import eventLogHelper, { logger } from './utils/logger';
import { EventFile } from '@inc/types';
import { EVENTS } from '@inc/events';
import * as eventModules from './events';
import SocketUserStore from './store/SocketUserStore';

const events: Record<string, EventFile> = Object(eventModules);

export default (io: Server) => {
  logger.trace(`Attaching Socket.io 'connect' event listener...`);
  io.on(EVENTS.CONNECTION.CONNECT, (socket) => {
    const connectEventLog = eventLogHelper(EVENTS.CONNECTION.CONNECT, socket);

    // Attaching disconnect event listener
    connectEventLog('trace', `Attaching Socket.io 'disconnect' event listener...`);
    socket.once(EVENTS.CONNECTION.DISCONNECT, (reason) => {
      const disconnectEventLog = eventLogHelper(EVENTS.CONNECTION.DISCONNECT, socket);

      // Detaching event listeners
      disconnectEventLog('trace', `Removing all listeners from socket...`);
      socket.removeAllListeners();

      // Removing socketId userId pair from cache
      disconnectEventLog('trace', `Removing socketId userId pair from cache...`);
      const isSocketUserPairRemoved = SocketUserStore.removeSocketUserBySocketId(socket.id);

      if (!isSocketUserPairRemoved) {
        disconnectEventLog('error', `SocketId userId pair not removed from cache.`);
      } else {
        disconnectEventLog('debug', `SocketId userId pair removed from cache.`);
      }

      disconnectEventLog('info', `Socket is disconnected. Reason: ${reason}.`);
    });

    let eventsAttached: string[] = [];

    // Attaching an 'iam' event listener
    connectEventLog('trace', `Attaching 'iam' event listener to socket...`);
    socket.once(EVENTS.CONNECTION.IAM, (userId, ack) => {
      const iamEventLog = eventLogHelper(EVENTS.CONNECTION.IAM, socket);
      iamEventLog('debug', `UserId is ${userId}.`);

      // TODO: Add auth here

      iamEventLog('trace', `Attempting to add socketId userId pair to cache...`);
      const socketUserIndex = SocketUserStore.addSocketUser(socket.id, userId);

      if (socketUserIndex === -1) {
        iamEventLog('error', `SocketId userId pair not added to cache...`);

        iamEventLog('trace', `Acknowledging 'iam' event...`);
        if (typeof ack === 'function') ack({ success: false });

        iamEventLog('error', `Disconnecting socket... Reason: Failed to add to cache.`);
        socket.disconnect(true);
        return;
      }

      iamEventLog('trace', `Acknowledging 'iam' event...`);
      if (typeof ack === 'function') ack({ success: true });

      iamEventLog('trace', `SocketId userId pair added to cache.`);

      // Attaching custom event listeners
      iamEventLog('trace', `Attaching custom event listeners to socket...`);
      for (const event of Object.values(events)) {
        const { callback, eventName, type } = event(io, socket);

        iamEventLog('trace', `Attaching ${event} event listener to socket...`);
        socket[type](eventName, callback);

        eventsAttached.push(eventName);
      }
      iamEventLog(
        'info',
        `Attached ${eventsAttached.length} events. ${
          Object.entries(events).length - eventsAttached.length
        } failed.`
      );
      iamEventLog('debug', `Attached events: ${eventsAttached}.`);
    });
  });
};
