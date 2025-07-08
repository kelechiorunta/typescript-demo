import React from 'react'
import { Form, Button, Card, Image, Row, Col, InputGroup } from 'react-bootstrap';
import { FaSearch, FaEnvelope, FaUserPlus } from 'react-icons/fa';
import { AuthContextType } from './VisitorClient';

interface AboutContextProps {
    authUser: AuthContextType
    currentUser: AuthContextType
}

const About: React.FC<AboutContextProps> = ({authUser, currentUser}) => {
  return (
      <Card style={{ backgroundColor: 'white', color: ' #a303a0' }} className="mb-4">
          <Card.Header style={{ width: 'max-content', display: 'inline-block', backgroundColor: 'white', color: ' #a303a0'}} className='text-left border-0'><strong><h4>About</h4></strong></Card.Header>
    <Card.Body className='text-left'>
              <p className='gap-4 justify-content-between d-flex align-items-center'><strong>Gender:</strong> {currentUser?.gender || 'Male'}</p>
      <p className='gap-4 justify-content-between d-flex align-items-center'><strong>Birthday:</strong> June 26, 1980</p>
      <p className='gap-4 justify-content-between d-flex align-items-center'><strong>Address:</strong> 2239 Hop Camp Road</p>
      <p className='gap-4 justify-content-between d-flex align-items-center'><strong>Email:</strong> { currentUser?.email}</p>
      <p className='gap-4 justify-content-between d-flex align-items-center'><strong>Phone:</strong> { currentUser?.phone}</p>
    </Card.Body>
  </Card>
  )
}

export default About