import React from 'react';
import {
  Card,
  ListGroup,
  Badge,
  Image,
  Placeholder,
  Spinner,
} from 'react-bootstrap';

import { AuthContextType } from './VisitorClient';

interface ActiveUsersProps {
  clients: AuthContextType[];
  onlineUsers: any;
  data: any;
  loading: boolean;
}

const ActiveUsers: React.FC<ActiveUsersProps> = ({
  data,
  loading,
  onlineUsers,
  clients,
}) => {
  return (
    <Card style={{ color: '#a303a0' }}>
      {loading ? (
        <Card.Body
          style={{
            height: '59vh',
            color: '#a303a0',
            overflow: 'hidden',
            padding: '1rem',
          }}
        >
          <Card.Title
            style={{
              width: '90%',
              textAlign: 'left',
              margin: 'auto',
              display: 'inline-block',
              backgroundColor: 'white',
              color: '#a303a0',
            }}
            className="mb-3 text-left"
          >
            <h5>Active</h5>
          </Card.Title>
          <ListGroup style={{ height: '49vh', overflowY: 'auto' }} variant="flush">
            {[...Array(5)].map((_, index) => (
              <ListGroup.Item key={index} className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <Placeholder
                    as={Image}
                    animation="glow"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      marginRight: '1rem',
                    }}
                  />
                  <div className="d-flex flex-column">
                    <Placeholder as="div" animation="glow">
                      <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as="div" animation="glow">
                      <Placeholder xs={4} />
                    </Placeholder>
                  </div>
                </div>
                <Placeholder as={Badge} animation="glow" bg="secondary" style={{ width: 60 }}>
                  &nbsp;
                </Placeholder>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      ) : (
        <Card.Body
          style={{
            height: '59vh',
            color: '#a303a0',
            overflow: 'scroll',
          }}
        >
          <Card.Title
            style={{
              width: '90%',
              textAlign: 'left',
              margin: 'auto',
              display: 'inline-block',
              backgroundColor: 'white',
              color: '#a303a0',
            }}
            className="mb-3 text-left"
          >
            <h5>Active</h5>
          </Card.Title>
          <ListGroup
            style={{ height: '49vh', overflowY: 'scroll', color: '#a303a0' }}
            variant="flush"
          >
            {clients.length > 0 &&
              clients.map((user, index) => (
                <ListGroup.Item
                  key={index}
                  className="d-flex align-items-center justify-content-between"
                >
                  <div className="d-flex align-items-center">
                    <Image
                      src={user?.picture || './profile.png'}
                      roundedCircle
                      width={40}
                      height={40}
                      className="me-3"
                    />
                    <div
                      style={{ color: '#a303a0' }}
                      className="d-flex flex-column align-items-start"
                    >
                      <strong>{user?.username}</strong>
                      <span
                        className="text-muted"
                        style={{ fontSize: '0.85rem' }}
                      >
                        {user?.email}
                      </span>
                    </div>
                  </div>
                  {onlineUsers?.has(user._id) ? (
                    <Badge bg={'success'}>Online</Badge>
                  ) : (
                    <Badge bg={'warning'}>Offline</Badge>
                  )}
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Card.Body>
      )}
    </Card>
  );
};

export default ActiveUsers;
