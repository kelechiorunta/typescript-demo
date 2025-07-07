import React from 'react'
import { Form, Button, Card, Image, Row, Col, InputGroup } from 'react-bootstrap';
import { FaSearch, FaEnvelope, FaUserPlus } from 'react-icons/fa';

import { AuthContextType } from './VisitorClient';

interface UserContextProps {
    authUser: AuthContextType;
}
const FaSearchIcon = FaSearch as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

const TopBar: React.FC<UserContextProps> = ({authUser}) => {
  return (
    <Row className="mb-4 align-items-center justify-content-between">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text><FaSearchIcon color=' #a303a0' /></InputGroup.Text>
            <Form.Control placeholder="Search..." style={{color: ' #a303a0'}} />
          </InputGroup>
        </Col>
        <Col className="text-end d-none d-md-block">
            <span style={{color: ' #a303a0'}} className="me-3 text-[  #a303a0]">{authUser?.username}</span>
            <Image
                  src={authUser?.picture}
                //src="https://randomuser.me/api/portraits/men/75.jpg"
                  roundedCircle width={40} height={40} />
        </Col>
      </Row>
  )
}

export default TopBar