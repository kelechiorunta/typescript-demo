import React from 'react';
import { Card, ListGroup, Badge, Image } from 'react-bootstrap';

import { AuthContextType } from './VisitorClient';

const users = [
    { name: 'Shelby Goode', status: 'Online', color: 'success' },
    { name: 'Robert Bacins', status: 'Busy', color: 'danger' },
    { name: 'John Carilo', status: 'Offline', color: 'secondary' },
    { name: 'Adriene Watson', status: 'Online', color: 'success' },
  ];

interface ActiveUsersProps {
    clients: AuthContextType[];
    onlineUsers: any;
}

const ActiveUsers: React.FC<ActiveUsersProps> = ({onlineUsers, clients}) => {
  return (
    <Card>
      <Card.Body style={{height: '60vh'}}>
        <Card.Title className="mb-3">Active</Card.Title>
        <ListGroup style={{height: '50vh', overflow: 'hidden'}} variant="flush">
          {(clients.length > 0) && clients.map((user, index) => (
            <ListGroup.Item key={index} className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <Image src={user?.picture || './profile.png'} roundedCircle width={40} height={40} className="me-3" />
                {/* <Image src={`https://randomuser.me/api/portraits/women/${index + 10}.jpg`} roundedCircle width={40} className="me-3" /> */}
                <span>{user?.username}</span>
              </div>
                  {onlineUsers?.has(user._id) ? <Badge bg={'success'}>Online</Badge> : <Badge bg={'warning'}>Offline</Badge> }
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default ActiveUsers;
