// components/VisitorClient.tsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';

import Sidebar from './Sidebar';
import UserContent from './UserContent';

// Define the expected type
export type AuthContextType = {
  username: string;
  email: string;
  picture: string;
  phone: string;
  gender: string
  // add more based on your `data.auth` structure
};

const VisitorClient: React.FC = () => {

    const authUser = useOutletContext<AuthContextType>();

  return (
    <Container fluid className="gx-0 " style={{backgroundColor: 'rgba(250,122,82,0.2)'}}>
      <Row className="gx-0" style={{gap: 0,}}>
        <Col xs={12} md={3} lg={2}>
          <Sidebar />
        </Col>
        <Col xs={12} md={9} lg={10}>
          <UserContent authUser={authUser} />
        </Col>
      </Row>
    </Container>
  );
};

export default VisitorClient;
