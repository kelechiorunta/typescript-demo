import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import TopBar from './TopBar';
import { AuthContextType } from './VisitorClient';
import ProfileHeader from './ProfileHeader';
import About from './About';
import Feed from './Feed';
import OtherClients from './OtherClients';

interface UserContentProps {
    authUser: AuthContextType;
    currentUser: AuthContextType;
    storedUser: AuthContextType;
    clients: AuthContextType[];
    onlineUsers: any;
    data: any;
    loading: boolean;
    setCurrentUser: React.Dispatch<React.SetStateAction<AuthContextType>>
}


const UserContent: React.FC<UserContentProps> = ({data, loading, onlineUsers, clients, storedUser, authUser, currentUser, setCurrentUser }) => {
//   const [currentUser, setCurrentUser] = useState(authUser);

  return (
    <div className="p-5 w-100" style={{ margin: 'auto', backgroundColor: 'rgba(248,248,248, 0.2 )' }}>
      {/* Top Bar */}
      <TopBar currentUser={currentUser} setCurrentUser={setCurrentUser} authUser={authUser} />

      {/* Profile Header */}
      <ProfileHeader storedUser={storedUser} authUser={authUser} currentUser={currentUser} setCurrentUser={setCurrentUser} />

      <Row style={{ color: '#a303a0', height: 'max-content', overflow: 'auto' }} className="gx-2">
        <Col xs={12} md={6} lg={4}>
          <About authUser={authUser} currentUser={currentUser} />
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Feed />
        </Col>
        <Col xs={12} md={12} lg={4}>
          <OtherClients data={data} loading={loading} onlineUsers={onlineUsers} clients={clients} />
        </Col>
      </Row>
    </div>
  );
};

export default UserContent;
