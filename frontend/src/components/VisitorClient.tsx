// components/VisitorClient.tsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';
import { io } from 'socket.io-client';

import Sidebar from './Sidebar';
import UserContent from './UserContent';
import socket from '../socket-client/socket-client';

// Define the expected type
export type AuthContextType = {
  username: string;
  email: string;
  picture: string;
  phone: string;
  gender: string;
  backgroundImage: string;
  // add more based on your `data.auth` structure
};

const VisitorClient: React.FC = () => {

    const authUser = useOutletContext<AuthContextType>();
    const storedCurrentUser = authUser
    const [currentUser, setCurrentUser] = useState<AuthContextType>(() => ({ ...authUser }));

    useEffect(() => {
        const host = window.location.hostname;
        const socketServerURL = 'http://localhost:3700'
        const socket = io(socketServerURL, {
            transports: ['websocket'],
            extraHeaders: {
              'Authorization': 'Bearer YOUR_TOKEN_HERE',
              'Content-Type': 'application/json'
            },
            withCredentials: true,
          });
        socket.on('connect', () => {
            console.log("Connected to socket.io server")
        })
        socket.on('newMessage', (user) => {
          console.log('Received new user:', user?.username);
        });
      
        return () => {
            socket.disconnect()
        }
        // return () => {
            
        //   socket.off('newMessage');
        // };
      }, []);

  return (
    <Container fluid className="gx-0 " style={{backgroundColor: 'rgba(250,122,82,0.2)'}}>
      <Row className="gx-0" style={{gap: 0,}}>
        <Col xs={12} md={3} lg={2}>
          <Sidebar />
        </Col>
        <Col xs={12} md={9} lg={10}>
          <UserContent storedUser={storedCurrentUser} authUser={currentUser} currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </Col>
      </Row>
    </Container>
  );
};

export default VisitorClient;
