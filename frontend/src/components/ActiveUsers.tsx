import React from 'react';
import { Card, ListGroup, Badge, Image } from 'react-bootstrap';

const users = [
  { name: 'Shelby Goode', status: 'Online', color: 'success' },
  { name: 'Robert Bacins', status: 'Busy', color: 'danger' },
  { name: 'John Carilo', status: 'Offline', color: 'secondary' },
  { name: 'Adriene Watson', status: 'Online', color: 'success' },
];

const ActiveUsers: React.FC = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title className="mb-3">Active</Card.Title>
        <ListGroup variant="flush">
          {users.map((user, index) => (
            <ListGroup.Item key={index} className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <Image src={`https://randomuser.me/api/portraits/women/${index + 10}.jpg`} roundedCircle width={40} className="me-3" />
                <span>{user.name}</span>
              </div>
              <Badge bg={user.color}>{user.status}</Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default ActiveUsers;
