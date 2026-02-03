import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const WS_URL = import.meta.env.VITE_WS_URL || 'http://localhost:5000';

export const useSocket = (namespace = '', autoConnect = true) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!autoConnect) return;

    const token = localStorage.getItem('token');

    if (!token) {
      setError('No authentication token found');
      return;
    }

    const url = namespace ? `${WS_URL}${namespace}` : WS_URL;

    const socketInstance = io(url, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    socketInstance.on('connect', () => {
      console.log(`✅ Connected to ${namespace || 'main'} namespace`);
      setConnected(true);
      setError(null);
    });

    socketInstance.on('disconnect', (reason) => {
      console.log(`❌ Disconnected from ${namespace || 'main'} namespace:`, reason);
      setConnected(false);
    });

    socketInstance.on('error', (err) => {
      console.error(`WebSocket error (${namespace || 'main'}):`, err);
      setError(err.message);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.close();
    };
  }, [namespace, autoConnect]);

  return { socket, connected, error };
};

export default useSocket;
