import { io } from 'socket.io-client';
import useChat from '@/hooks/useChat';
import type { Messages } from '@inc/types';
import { sendMessage, joinRoom, partRoom, syncMessage } from '@/chat/emitters';
import { useEffect, useRef, useState } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import syncLocalStorage, { syncLastMessage, syncLastMessages } from '@/utils/syncLocalStorage';
import useReadLocalStorage from '@/hooks/useReadLocalStorage';

const socket = io('http://localhost:4000');

const TestChatPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const roomInputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [roomId, setRoomId] = useState('');
  const [localStorageMessages, setLocalStorageMessages] = useLocalStorage<Messages[]>(roomId, []);
  const lastMessageId = useReadLocalStorage<number>('lastMessageId');
  const lastMessagesCache = useRef<Map<string, string>>(new Map());

  const { isConnected, loading } = useChat(socket, {
    userId: 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26',
    currentRoom: roomId,
    chatMessagesProgressCallback: (progress) => setProgress(progress),
    messageCallback: (message) => {
      syncLastMessage(message);
    },
    messageSyncCallback: (messageSync) => {
      switch (messageSync.status) {
        case 'success': {
          console.log('Sync success');
          syncLastMessages(lastMessagesCache.current);
          lastMessagesCache.current.clear();
          break;
        }
        case 'error': {
          console.log(`Sync error: ${messageSync.err}`);
          break;
        }
        case 'in_progress': {
          console.log('Sync in progress');
          console.log(messageSync.progress);
          console.log(messageSync.message);
          syncLocalStorage(messageSync.message, lastMessagesCache.current);
        }
      }
    },
  });

  // useEffect(() => {
  //   if (isConnected && messages.length === 0) {
  //     syncMessage(socket, 0, (ack) => {
  //       if (ack.success) {
  //         console.log(ack.data);
  //       } else {
  //         console.log(ack.err);
  //       }
  //     });
  //   }
  // }, [isConnected]);

  const sync = () => {
    syncMessage(socket, lastMessageId === null ? 0 : lastMessageId, (ack) => {
      if (ack.success) {
        console.log(ack.data);
      } else {
        console.log(ack.err);
      }
    });
  };

  const room = () => {
    setRoomId(roomInputRef.current!.value);
    joinRoom(socket, roomInputRef.current!.value, (ack) => console.log(ack));
  };

  const part = () => {
    partRoom(socket, roomId, (ack) => console.log(ack));
    setRoomId('');
  };

  const emit = () => {
    if (roomId === '') {
      alert('not in room');
      return;
    }
    sendMessage(
      socket,
      {
        roomId: roomId,
        message: inputRef.current!.value,
        time: new Date(),
      },
      (ack) => {
        if (ack.success) {
          console.log(ack.data);
          syncLastMessage(ack.data as Messages);
        } else {
          console.log(ack.err);
        }
      }
    );
  };

  return (
    <>
      <h1 id="title">Test Chat Page</h1>
      <p id="loading">Loading: {loading}</p>
      <p id="progress">Progress: {progress}</p>
      <span>Message</span>
      <input id="message" ref={inputRef} />
      <button id="emit-btn" onClick={emit}>
        Emit
      </button>
      <br />
      <span>Room</span>
      <input id="room" ref={roomInputRef} />
      <button id="room-emit-btn" onClick={room}>
        Join Room
      </button>
      <br />
      <button id="part-btn" onClick={part}>
        Part
      </button>
      <br />
      <button id="sync-btn" onClick={sync}>
        Sync
      </button>
      {localStorageMessages.map((message) => {
        return <p>{message.content}</p>;
      })}
    </>
  );
};

export default TestChatPage;
