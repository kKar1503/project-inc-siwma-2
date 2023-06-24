// ** React Imports **
import { useEffect, useState } from 'react';

// ** Event Listeners Imports **
import listeners from '@/chat/listeners';

// ** Types Imports **
import type { Socket } from 'socket.io-client';
import type { Acknowlegement, LoadingState } from '@inc/types';
import type { UseChatParams } from '@/types/useChatTypes';

const useChat = (socket: Socket, params: UseChatParams) => {
  // ** State **
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [loading, setLoading] = useState<LoadingState>('idle');

  // ** Effects **
  useEffect(() => {
    function onConnect() {
      // First, set the isConnected to true
      setIsConnected(true);
      console.log('Chat server connected.');

      // Set loading to 'iam'
      setLoading('iam');

      // Second, we want to listener to the 'disconnect' event
      socket.on('disconnect', onDisconnect);

      // Third, we want to emit to server the 'iam' event
      // to let the server know who we are
      socket.emit('iam', params.userId, (ack: Acknowlegement) => {
        if (ack.success) {
          // Set loading back to 'idle'
          setLoading('idle');

          // The server ack success, we can start listening to the events
          let eventsAttached: [eventName: string, callback: (...args: any[]) => any][] = [];

          // Iterating over the listeners and attaching them to the socket
          for (const listener of Object.values(listeners)) {
            const { callback, eventName, type } = listener(socket, params, setLoading);

            socket[type](eventName, callback);

            eventsAttached.push([eventName, callback]);
          }

          console.log(
            `Chat event listeners attached (${eventsAttached.length}): ${eventsAttached
              .map((e) => e[0])
              .join(', ')}`
          );
        } else {
          // Set loading back to 'idle'
          setLoading('idle');

          // The server ack failed, we can disconnect
          socket.disconnect();
        }
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      console.log('Chat server disconnected.');
    }

    if (socket !== undefined) {
      // Attaching the listener for the 'connect' event
      socket.on('connect', onConnect);
    }

    // Cleanup
    return () => {
      if (socket !== undefined) {
        // Disconnecting the socket on unmount
        socket.disconnect();

        // Cleaning up the event listeners
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
      }
    };
  }, []);

  return { isConnected, loading };
};

export default useChat;
