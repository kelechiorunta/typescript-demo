import React from 'react';
import { Card, ListGroup, Badge, Image, Placeholder, Spinner  } from 'react-bootstrap';

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
    data: any;
    loading: boolean;
}

const ActiveUsers: React.FC<ActiveUsersProps> = ({data, loading, onlineUsers, clients}) => {
  return (
      <Card style={{color: ' #a303a0'}}>
          {loading ? (
              <div className="p-4">
                  <Placeholder as="p" animation="glow">
                      <Placeholder xs={8} />
                  </Placeholder>
                  <Placeholder as="p" animation="glow">
                      <Placeholder xs={6} /> <Placeholder xs={4} />
                  </Placeholder>
                  <Placeholder as="p" animation="glow">
                      <Placeholder xs={12} />
                  </Placeholder>
                  <div className="d-flex justify-content-center mt-4">
                      <Spinner animation="border" variant="warning" />
                  </div>
              </div>
          ) :
              (<Card.Body style={{ height: '59vh', color: ' #a303a0', overflow:'scroll'}}>
                  <Card.Title style={{ width: '90%', textAlign: 'left', margin: 'auto', display: 'inline-block', backgroundColor: 'white', color: ' #a303a0' }} className="mb-3 text-left">
                      <h5>Active</h5>
                  </Card.Title>
                  <ListGroup style={{ height: '49vh', overflow: 'scroll', color: ' #a303a0' }} variant="flush">
                      {(clients.length > 0) && clients.map((user, index) => (
                          <ListGroup.Item key={index} className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center">
                                  <Image src={user?.picture || './profile.png'} roundedCircle width={40} height={40} className="me-3" />
                                  {/* <Image src={`https://randomuser.me/api/portraits/women/${index + 10}.jpg`} roundedCircle width={40} className="me-3" /> */}
                                  <div style={{color: ' #a303a0' } } className="d-flex flex-column align-items-start">
                                    <strong>{user?.username}</strong>
                                    <span className="text-muted" style={{ fontSize: '0.85rem' }}>{user?.email}</span>
                                </div>
                              </div>
                              {onlineUsers?.has(user._id) ? <Badge bg={'success'}>Online</Badge> : <Badge bg={'warning'}>Offline</Badge>}
                          </ListGroup.Item>
                      ))}
                  </ListGroup>
              </Card.Body>
              )}
    </Card>
  );
};

export default ActiveUsers;
