import { io } from 'socket.io-client';
import useChat from '@/hooks/useChat';
import { EVENTS } from '@inc/events';

const socket = io('http://localhost:4000');

const TestChatPage = () => {
  const { isConnected, loading } = useChat(socket, {
    userId: 'c9f22ccc-0e8e-42bd-9388-7f18a5520c26',
    currentRoom: '',
  });

  const emit = () =>
    socket.emit(
      EVENTS.CLIENT.MESSAGE.SEND,
      {
        roomId: '4633cfa1-5a90-4ac4-9bae-5ce3ef14dbf5',
        message: 'Hello there',
        time: Date,
      },
      (ack: any) => console.log(ack)
    );

  return (
    <>
      <h1 id="title">Test Chat Page</h1>
      <p id="is-connected">Is connected: {isConnected ? 'true' : 'false'}</p>
      <p id="loading">Loading: {loading}</p>
      <button id="emit-btn" onClick={emit}>
        Emit
      </button>
    </>
  );
};

export default TestChatPage;
