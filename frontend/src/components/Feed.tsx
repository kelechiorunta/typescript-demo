import React from 'react';
import { Card, Image, Nav } from 'react-bootstrap';
import { FaHeart, FaComment } from 'react-icons/fa';

const FaHeartIcon = FaHeart as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const FaCommentIcon = FaComment as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

const Feed: React.FC = () => {
    return (
      <div style={{color: ' #a303a0', height: 'auto', overflow: 'scroll'}}>
            {/* Tabs */}
    <Card style={{color: ' #a303a0'}} className="mb-3 shadow-sm">
      <Nav style={{color: ' #a303a0'}} variant="tabs" defaultActiveKey="posts" className="mb-3">
        <Nav.Item >
          <Nav.Link style={{color: ' #a303a0'}} eventKey="followers" className="fw-semibold">
            Followers
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link style={{color: ' #a303a0'}} eventKey="following" className="fw-semibold">
            Following
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="posts" className="fw-semibold" style={{ position: 'relative', color: ' #a303a0' }}>
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
    
    <Card.Body className='d-flex flex-column gap-4'>
    <div >
        <div className="d-flex align-items-center mb-3">
          <Image
            src="https://randomuser.me/api/portraits/men/1.jpg"
            roundedCircle
            width={50}
            height={50}
            className="me-3"
          />
          <div>
            <strong>Charles Deo</strong>
            <div className="text-muted" style={{ fontSize: '0.85rem' }}>15 mins ago</div>
          </div>
        </div>

        <Card.Img
          src={'./background.png'}
        //src="https://images.unsplash.com/photo-1520975918108-7c8e9316c362"
          alt="Post"
          className="rounded"
          height={150}
        />

        <Card.Text className="mt-2">
          <strong>Charles Deo</strong> New Blazer out here... $500!!!!
        </Card.Text>

        <div className="d-flex justify-content-between text-muted">
          <span><FaHeartIcon className="me-2 text-danger" />1,498</span>
          <span><FaCommentIcon className="me-2 text-primary" />3,000</span>
        </div>                
    </div>
                    
    <div >
        <div className="d-flex align-items-center mb-3">
          <Image
            src="https://randomuser.me/api/portraits/men/2.jpg"
            roundedCircle
            width={50}
            height={50}
            className="me-3"
          />
          <div>
            <strong>Shanice Deo</strong>
            <div className="text-muted" style={{ fontSize: '0.85rem' }}>15 mins ago</div>
          </div>
        </div>

        <Card.Img
          src={'./background.jpg'}
        //src="https://images.unsplash.com/photo-1520975918108-7c8e9316c362"
          alt="Post"
          className="rounded"
          height={150}
        />

        <Card.Text className="mt-2">
          <strong>Shanice Deo</strong> New Blazer out here... $500!!!!
        </Card.Text>

        <div className="d-flex justify-content-between text-muted">
          <span><FaHeartIcon className="me-2 text-danger" />1,098</span>
          <span><FaCommentIcon className="me-2 text-primary" />2,000</span>
        </div>                
    </div>
        
      </Card.Body>
    </Card>
    </div>
   
  );
};

export default Feed;
