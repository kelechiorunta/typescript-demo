import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';


import Sidebar from './Sidebar';
interface VisitorProps {
    isOnline: boolean;
}

const VisitorClient: React.FC<VisitorProps> = (
    {
      isOnline,
    }
) => {

  return (
    <Container fluid className="gx-0" style={{ backgroundColor: 'rgba(250,122,82,0.2)' }}>
      <Row className="gx-0">
        
        <Col xs={12} md={3} lg={2}>
            <Sidebar active={isOnline} />
        </Col>
                
        <Col xs={12} md={9} lg={10}>
            <Outlet /> 
        </Col>
      </Row>
    </Container>
  );
};

export default VisitorClient;
