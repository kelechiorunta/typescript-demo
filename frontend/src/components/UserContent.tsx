// components/UserContent.tsx
import React from 'react';
import { Form, Button, Card, Image, Row, Col, InputGroup } from 'react-bootstrap';
import { FaSearch, FaEnvelope, FaUserPlus } from 'react-icons/fa';

import TopBar from './TopBar';
import { AuthContextType } from './VisitorClient';
import ProfileHeader from './ProfileHeader';
import About from './About';
import Feed from './Feed';
import OtherClients from './OtherClients';

interface UserContextProps {
    authUser: AuthContextType
}

const FaSearchIcon = FaSearch as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const FaEnvelopeIcon = FaEnvelope as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const FaUserPlusIcon = FaUserPlus as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

const UserContent: React.FC<UserContextProps> = ({authUser}) => {
  return (
    <div className="p-5 w-100" style={{margin: 'auto', backgroundColor: 'rgba(248,248,248, 0.2 )'}}>
      {/* Top Bar */}
        <TopBar authUser={authUser} />

      {/* Profile Header */}
      
        <ProfileHeader authUser={authUser}/>

        <Row style={{color: ' #a303a0'}} className="gx-2">
            <Col xs={12} md={4} lg={4}>
                <About authUser={authUser} />
            </Col>
            <Col xs={12} md={6} lg={4}>
                <Feed />
              </Col>
            <Col xs={12} md={3} lg={4}>
                <OtherClients />
            </Col>
        </Row>
      {/* About Section */}
       
    </div>
  );
};

export default UserContent;
