import { io } from 'socket.io-client';

const WS_URL = import.meta.env.VITE_WS_URL || 'http://localhost:5000';

class SocketService {
  constructor() {
    this.socket = null;
    this.interviewSocket = null;
    this.feedbackSocket = null;
  }

  // Connect to Socket.IO with authentication
  connect() {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No authentication token found');
      return false;
    }

    this.socket = io(WS_URL, {
      auth: {
        token,
      },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    this.socket.on('connect', () => {
      console.log('✅ Connected to WebSocket server');
    });

    this.socket.on('disconnect', (reason) => {
      console.log('❌ Disconnected from WebSocket server:', reason);
    });

    this.socket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    return true;
  }

  // Connect to interview namespace
  connectToInterview() {
    const token = localStorage.getItem('token');

    this.interviewSocket = io(`${WS_URL}/interview`, {
      auth: { token },
      transports: ['websocket', 'polling'],
    });

    this.interviewSocket.on('connect', () => {
      console.log('✅ Connected to interview namespace');
    });

    return this.interviewSocket;
  }

  // Connect to feedback namespace
  connectToFeedback() {
    const token = localStorage.getItem('token');

    this.feedbackSocket = io(`${WS_URL}/feedback`, {
      auth: { token },
      transports: ['websocket', 'polling'],
    });

    this.feedbackSocket.on('connect', () => {
      console.log('✅ Connected to feedback namespace');
    });

    return this.feedbackSocket;
  }

  // Disconnect all sockets
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    if (this.interviewSocket) {
      this.interviewSocket.disconnect();
      this.interviewSocket = null;
    }
    if (this.feedbackSocket) {
      this.feedbackSocket.disconnect();
      this.feedbackSocket = null;
    }
  }

  // Get main socket instance
  getSocket() {
    return this.socket;
  }

  // Get interview socket instance
  getInterviewSocket() {
    return this.interviewSocket;
  }

  // Get feedback socket instance
  getFeedbackSocket() {
    return this.feedbackSocket;
  }
}

// Singleton instance
const socketService = new SocketService();

export default socketService;
