import React from 'react'
import { Form, Button, Card, Image, Row, Col, InputGroup } from 'react-bootstrap';
import { FaUser, FaBirthdayCake, FaAddressBook, FaEnvelope, FaPhone } from 'react-icons/fa';
// import { FaHome, FaUser, FaEnvelope, FaBox, FaImages, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';

// const FaHomeIcon = FaHome as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

import { AuthContextType } from './VisitorClient';

const FaUserIcon = FaUser as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const FaBirthdayIcon = FaBirthdayCake as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const FaAddressIcon = FaAddressBook as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const FaEmailIcon = FaEnvelope as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const FaPhoneIcon = FaPhone as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
interface AboutContextProps {
    authUser: AuthContextType
    currentUser: AuthContextType
}

const About: React.FC<AboutContextProps> = ({authUser, currentUser}) => {
  return (
    <Card style={{ backgroundColor: 'white', color: ' #a303a0' }} className="mb-4">
          <Card.Header style={{ width: 'max-content', display: 'inline-block', backgroundColor: 'white', color: ' #a303a0'}} className='text-left border-0'><strong><h4>About</h4></strong></Card.Header>
    <Card.Body className='text-left'>
      <p className='gap-4 justify-content-between d-flex align-items-center'><strong className='d-flex align-items-center'><FaUserIcon className="me-2" /> Gender:</strong> {currentUser?.gender || 'Male'}</p>
      <p className='gap-4 justify-content-between d-flex align-items-center'><strong className='d-flex align-items-center'><FaBirthdayIcon className="me-2" />Birthday:</strong>{currentUser?.birthday || 'June 26, 1980'}</p>
      <p className='gap-4 justify-content-between d-flex align-items-center'><strong className='d-flex align-items-center'><FaAddressIcon className="me-2" />Address:</strong> {currentUser?.address || '2239 Hop Camp Road'}</p>
      <p className='gap-4 justify-content-between d-flex align-items-center'><strong className='d-flex align-items-center'><FaEmailIcon className="me-2" />Email:</strong> { currentUser?.email}</p>
      <p className='gap-4 justify-content-between d-flex align-items-center'><strong className='d-flex align-items-center'><FaPhoneIcon className="me-2" />Phone:</strong> { currentUser?.phone}</p>
    </Card.Body>
  </Card>
  )
}

export default About