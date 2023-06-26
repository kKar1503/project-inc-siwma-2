import { io } from 'socket.io-client';
import useChat from '@/hooks/useChat';
import type { Messages } from '@inc/types';
import { sendMessage, joinRoom, partRoom, syncMessage } from '@/chat/emitters';
import { useEffect, useRef, useState } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import { syncLocalStorage, syncLastMessage, syncLastMessages } from '@/utils/syncLocalStorage';
import useReadLocalStorage from '@/hooks/useReadLocalStorage';
import { useSession } from 'next-auth/react';

const TEST_USER_ID = 'd44b8403-aa90-4d92-a4c6-d0a1e2fad0af';

const TestChatPage = () => {
  const socket = useRef(
    io(process.env.NEXT_PUBLIC_CHAT_SERVER_URL, { transports: ['websocket'], autoConnect: false })
  ); // d
  const messageInputRef = useRef<HTMLInputElement>(null);
  const { data } = useSession(); // d
  const userId = data?.user?.id ?? TEST_USER_ID; // d
  const lastMessageIdKey = `${userId}-lastMessageId`; // d
  const roomKey = `${userId}-rooms`; // d
  const [progress, setProgress] = useState(0); // d
  const [roomId, setRoomId] = useState(''); // d
  const [localStorageMessages, setLocalStorageMessages] = useLocalStorage<Messages[]>(roomId, []); // d
  const lastMessageId = useReadLocalStorage<number>(lastMessageIdKey); // d
  const lastMessagesCache = useRef<Map<string, string>>(new Map()); // d
  const [rooms, setRooms] = useLocalStorage<string[]>(roomKey, []); // d
  const [domLoaded, setDomLoaded] = useState(false); // d
  const [connect, setConnect] = useState(false); // d

  const { isConnected, loading } = useChat(socket.current, connect, {
    userId,
    currentRoom: roomId,
    chatMessagesProgressCallback: (progress) => setProgress(progress),
    messageCallback: (message) => {
      syncLastMessage(userId, message);
    },
    messageSyncCallback: (messageSync) => {
      switch (messageSync.status) {
        case 'success': {
          console.log('Sync success');
          syncLastMessages(userId, lastMessagesCache.current);
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
          syncLocalStorage(userId, messageSync.message, lastMessagesCache.current);
          break;
        }
        default: {
          break;
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

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const sync = () => {
    syncMessage(socket.current, lastMessageId === null ? 0 : lastMessageId, (ack) => {
      if (ack.success) {
        console.log(ack.data);
      } else {
        console.log(ack.err);
      }
    });
  };

  const join = (newRoomId: string) => {
    setRoomId(newRoomId);
    joinRoom(socket.current, newRoomId, (ack) => console.log(ack));
  };

  const part = () => {
    partRoom(socket.current, roomId, (ack) => console.log(ack));
    setRoomId('');
  };

  const emit = () => {
    if (roomId === '') {
      alert('not in room');
      return;
    }
    sendMessage(
      socket.current,
      {
        roomId,
        message: messageInputRef.current!.value,
        time: new Date(),
      },
      (ack) => {
        if (ack.success) {
          console.log(ack.data);
          syncLastMessage(userId, ack.data as Messages);
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
      <p id="user-id">User ID: {userId}</p>
      <p id="room-id">Room ID: {roomId}</p>
      {domLoaded && <p id="is-connected">Is Connected: {isConnected.toString()}</p>}
      {domLoaded && <p id="last-message-id">Last Message ID: {lastMessageId}</p>}
      <span>Message</span>
      <input id="message" ref={messageInputRef} />
      <button id="emit-btn" onClick={emit}>
        Emit
      </button>
      <br />
      <button id="connect-btn" onClick={() => setConnect(true)}>
        Connect
      </button>
      <br />
      {domLoaded &&
        rooms.map((room) => (
          <>
            <span>{room}</span>
            <button disabled={roomId !== ''} onClick={() => join(room)}>
              🚪
            </button>
            <button disabled={roomId !== room || roomId === ''} onClick={() => part()}>
              👋
            </button>
            <br />
          </>
        ))}
      <button id="sync-btn" onClick={sync}>
        Sync
      </button>
      {domLoaded && localStorageMessages.map((message) => <p>{message.content}</p>)}
    </>
  );
};

export default TestChatPage;
