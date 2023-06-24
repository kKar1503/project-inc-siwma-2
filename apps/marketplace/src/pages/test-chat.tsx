import { io } from 'socket.io-client';
import useChat from '@/hooks/useChat';
import type { Messages } from '@inc/types';
import { sendMessage, joinRoom, partRoom, syncMessage } from '@/chat/emitters';
import { useEffect, useRef, useState } from 'react';

const socket = io('http://localhost:4000');

const TestChatPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<Messages[]>([]);
  const [progress, setProgress] = useState(0);

  const { isConnected, loading } = useChat(socket, {
    userId: 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26',
    currentRoom: '',
    chatMessagesProgressCallback: (progress) => setProgress(progress),
    messageSyncCallback: (messageSync) => {
      switch (messageSync.status) {
        case 'success': {
          console.log('Sync success');
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
          setMessages((curr) => [...curr, messageSync.message]);
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
    setMessages([]);
    syncMessage(socket, 0, (ack) => {
      if (ack.success) {
        console.log(ack.data);
      } else {
        console.log(ack.err);
      }
    });
  };

  const join = () => {
    joinRoom(socket, '4633cfa1-5a90-4ac4-9bae-5ce3ef14dbf5', (ack) => console.log(ack));
  };

  const part = () => {
    partRoom(socket, '4633cfa1-5a90-4ac4-9bae-5ce3ef14dbf5', (ack) => console.log(ack));
  };

  const emit = () =>
    sendMessage(
      socket,
      {
        roomId: '4633cfa1-5a90-4ac4-9bae-5ce3ef14dbf5',
        message: inputRef.current!.value,
        time: new Date(),
      },
      (ack) => console.log(ack)
    );

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
      <button id="join-btn" onClick={join}>
        Join
      </button>
      <br />
      <button id="part-btn" onClick={part}>
        Part
      </button>
      <br />
      <button id="sync-btn" onClick={sync}>
        Sync
      </button>
      {messages.map((message) => {
        return <p>{message.content}</p>;
      })}
    </>
  );
};

export default TestChatPage;
