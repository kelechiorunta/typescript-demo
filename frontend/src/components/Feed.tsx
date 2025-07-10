import React from 'react';
import { Card, Nav, Placeholder } from 'react-bootstrap';
import Post from './Post';
import { AuthContextType } from './VisitorClient';

interface FeedProps {
  clients: AuthContextType[];
  data: any;
  loading: boolean;
}

const Feed: React.FC<FeedProps> = ({ clients, data, loading }) => {
  return (
    <div style={{ color: '#a303a0', maxHeight: '700px', overflow: 'scroll' }}>
      {/* Tabs */}
      <Card className="mb-3 shadow-sm">
        <Nav variant="tabs" defaultActiveKey="posts" className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="followers" className="fw-semibold" style={{ color: '#a303a0' }}>
              Followers
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="following" className="fw-semibold" style={{ color: '#a303a0' }}>
              Following
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="posts" className="fw-semibold" style={{ position: 'relative', color: '#a303a0' }}>
              Posts
              <div
                style={{
                  height: '3px',
                  backgroundColor: '#d63384',
                  width: '100%',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  borderRadius: 2,
                }}
              />
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Card.Body className="d-flex flex-column gap-4">
          {loading ? (
            // 🟣 Placeholder skeleton while loading
            Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx}>
                <div className="d-flex align-items-center mb-3">
                  <Placeholder as="div" animation="wave" className="me-3" style={{ width: 50, height: 50, borderRadius: '50%' }} />
                  <div>
                    <Placeholder as="div" animation="wave" style={{ width: 100, height: 10, marginBottom: 5 }} />
                    <Placeholder as="div" animation="wave" style={{ width: 60, height: 8 }} />
                  </div>
                </div>
                <Placeholder as="div" animation="wave" className="rounded mb-2" style={{ height: 150, width: '100%' }} />
                <Placeholder as="div" animation="wave" style={{ width: '80%', height: 12, marginBottom: 10 }} />
                <div className="d-flex justify-content-between">
                  <Placeholder as="div" animation="wave" style={{ width: 60, height: 10 }} />
                  <Placeholder as="div" animation="wave" style={{ width: 60, height: 10 }} />
                </div>
              </div>
            ))
          ) : (
            clients.map((user, idx) => (
              <Post
                key={idx}
                author={user?.username ?? 'Anonymous'}
                timestamp={'Just now'}
                avatarUrl={user?.picture ?? './profile.png'}
                imageUrl={user?.backgroundImage ?? './background.png'}
                caption={'No caption'}
                likes={1000}
                comments={100}
                email={user?.email}
                client={user}
              />
            ))
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Feed;

