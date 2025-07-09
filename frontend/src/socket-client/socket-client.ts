import { io } from 'socket.io-client';

const socket = io('http://localhost:3700', {
    transports: ['websocket'],
    extraHeaders: {
      'Authorization': 'Bearer YOUR_TOKEN_HERE',
      'Content-Type': 'application/json'
    },
    withCredentials: true,
  });

export default socket