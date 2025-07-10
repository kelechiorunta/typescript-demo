import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Placeholder, Spinner } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';
import { io } from 'socket.io-client';

import Sidebar from './Sidebar';
import UserContent from './UserContent';
import { GET_OTHER_CLIENTS } from '../graphqlClient/queries';
import { useQuery } from '@apollo/client';

// Define the expected type
export type AuthContextType = {
  _id: any;
  username: string;
  email: string;
  picture: string;
  phone: string;
  gender: string;
  backgroundImage: string;
  isOnline: boolean;
  videoId: any
};

const VisitorClient: React.FC = () => {
  const authUser = useOutletContext<AuthContextType>();
  const storedCurrentUser = authUser;
  const [currentUser, setCurrentUser] = useState<AuthContextType>(() => ({ ...authUser }));
  const { data, loading, error } = useQuery(GET_OTHER_CLIENTS);

  const [socket, setSocket] = useState<any>(null);
  const [onlineUsers, setOnlineUsers] = useState<any>(new Set());
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const clients = data?.otherClients ?? [];

  useEffect(() => {
    const socketServerURL = 'http://localhost:3700';
    const socketInstance = io(socketServerURL, {
      transports: ['websocket'],
      extraHeaders: {
        Authorization: 'Bearer YOUR_TOKEN_HERE',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      console.log('Connected to socket.io server');
    });

    socketInstance.on('newMessage', (user) => {
      console.log('Received new user:', user?.username);
    });

    return () => {
      socketInstance.off('newMessage');
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket || !currentUser) return;

    socket.emit('authenticated', { userId: storedCurrentUser?._id });

    socket.on('userOnline', ({ userId, online }: { userId: any; online: boolean }) => {
      setOnlineUsers((prev: any) => new Set(prev).add(userId));
      setIsOnline(online);
    });

    socket.on('usersOnline', ({ userIds, online }: { userIds: any; online: boolean }) => {
      setOnlineUsers(new Set(userIds));
      setIsOnline(online);
    });
      
    socket.on('userOffline', ({ userId }: {userId: any}) => {
        setOnlineUsers((prev: any) => {
          const updated = new Set(prev);
          updated.delete(userId);
          return updated;
        });
      });
  }, [socket]);

  return (
    <Container fluid className="gx-0" style={{ backgroundColor: 'rgba(250,122,82,0.2)' }}>
      <Row className="gx-0">
        <Col xs={12} md={3} lg={2}>
          <Sidebar active={isOnline} />
        </Col>

        <Col xs={12} md={9} lg={10}>
            <UserContent
              storedUser={storedCurrentUser}
              authUser={currentUser}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              onlineUsers={onlineUsers}
              clients={clients}
              data={data}
              loading={loading}
            />
        </Col>
      </Row>
    </Container>
  );
};

export default VisitorClient;
