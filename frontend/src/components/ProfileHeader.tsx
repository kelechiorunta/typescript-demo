import React from 'react'
import { Form, Button, Card, Image, Row, Col, InputGroup } from 'react-bootstrap';
import { FaSearch, FaEnvelope, FaUserPlus } from 'react-icons/fa';

import TopBar from './TopBar';
import { AuthContextType } from './VisitorClient';

interface UserContextProps {
    authUser: AuthContextType
}

const FaSearchIcon = FaSearch as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const FaEnvelopeIcon = FaEnvelope as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const FaUserPlusIcon = FaUserPlus as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

const ProfileHeader: React.FC<UserContextProps> = ({authUser}) => {
  return (
    <Card className="mb-4 bg-[ #ffffff]">
        <Card.Img variant="top" src='./background.png' style={{ minHeight: '40vh', backgroundSize: 'cover', backgroundPosition: 'center'}}/>
        <Card.Body className="d-flex flex-column align-items-center relative bg-[ #ffffff] ">
            <Image
                style={{position: 'absolute', bottom: '20%', left: '3%'}}     
                // src="https://randomuser.me/api/portraits/men/75.jpg"
                src={authUser?.picture || './background.png'}
                roundedCircle width={100}
                className="mb-3" />
                  
             <div style={{width: '100%', color: ' #a303a0'}} className='d-flex justify-content-between align-items-center'>
                <div style={{marginLeft: 10}} className="d-flex flex-column align-items-center me-5 mt-4">
                    <h4 className='text-[ #a303a0]'>{authUser?.username}</h4>
                    <p className="">UI/UX Designer</p>       
                </div>
            
                <div className="d-flex gap-3 mt-3 text-[ #a303a0]">
                    <Button style={{color: ' #a303a0', outline: '1px solid  #a303a0'}} variant="outline-primary"><FaEnvelopeIcon className="me-2 text-[ #a303a0]" /> Message</Button>
                    <Button style={{color: ' #a303a0', outline: '1px solid  #a303a0'}} variant=""><FaUserPlusIcon className="me-2" /> Follow</Button>
                </div>      
            </div>
        </Card.Body>
      </Card>
  )
}

export default ProfileHeader