import React from 'react';
import { Card, ListGroup, Image } from 'react-bootstrap';

const suggested = [
  { name: 'Eddie Lobanovskiy', email: 'lobanovskiy@gmail.com', img: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { name: 'Alexey Stave', email: 'alexeyst@gmail.com', img: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { name: 'Anton Tkacheve', email: 'tkacheveanton@gmail.com', img: 'https://randomuser.me/api/portraits/men/4.jpg' },
];

const YouMightKnow: React.FC = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title className="mb-3">You might know</Card.Title>
        <ListGroup variant="flush">
          {suggested.map((user, index) => (
            <ListGroup.Item key={index} className="d-flex align-items-center">
              <Image src={user.img} roundedCircle width={40} className="me-3" />
              <div>
                <strong>{user.name}</strong>
                <div className="text-muted" style={{ fontSize: '0.85rem' }}>{user.email}</div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default YouMightKnow;
