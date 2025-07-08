import React, {useState} from 'react'
import { Form, Button, Card, Image, Row, Col, InputGroup } from 'react-bootstrap';
import { FaSearch, FaEnvelope, FaUserPlus } from 'react-icons/fa';

import TopBar from './TopBar';
import { AuthContextType } from './VisitorClient';
import EditBackgroundProfile from './EditBackgroundProfile';

interface ProfileContextProps {
    authUser: AuthContextType
    currentUser: AuthContextType
    storedUser: AuthContextType
    setCurrentUser: React.Dispatch<React.SetStateAction<AuthContextType>>
}

const FaSearchIcon = FaSearch as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const FaEnvelopeIcon = FaEnvelope as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const FaUserPlusIcon = FaUserPlus as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

const ProfileHeader: React.FC<ProfileContextProps> = ({ storedUser, authUser, currentUser, setCurrentUser }) => {
    const [showModal, setShowModal] = useState(false);
    // const [user, setUser] = useState(currentUser); // Local copy to pass down
  return (
    <Card className="mb-4 bg-[ #ffffff]">
        <Card.Img variant="top" src={currentUser?.backgroundImage || './suit.png'} style={{ minHeight: '40vh', maxHeight:'50vh', backgroundSize: 'cover', backgroundPosition: 'center'}}/>
        <Card.Body className="d-flex flex-column align-items-center relative bg-[ #ffffff] ">
            <Image
                style={{position: 'absolute', bottom: '20%', left: '3%'}}     
                // src="https://randomuser.me/api/portraits/men/75.jpg"
                src={currentUser?.picture || './backgroundII.png'}
                roundedCircle width={100} height={100}
                  className="mb-3" />
                {currentUser?.username === storedUser?.username && (
                <div className="d-flex gap-3 mt-3 text-[ #a303a0]">
                    <Button
                    style={{ position: 'absolute', bottom: '50%', right: '1%', color: ' #a303a0', outline: '1px solid  #a303a0', backgroundColor: 'white' }}
                    onClick={() => setShowModal(true)}
                    >
                    Edit Cover Photo
                    </Button>
                </div>
                )}
                {/* Modal Component */}
                <EditBackgroundProfile
                show={showModal}
                handleClose={() => setShowModal(false)}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                />
                  
             <div style={{width: '100%', color: ' #a303a0'}} className='d-flex justify-content-between align-items-center'>
                <div style={{marginLeft: 10}} className="d-flex flex-column align-items-center me-5 mt-4">
                    <h4 className='text-[ #a303a0]'>{currentUser?.username}</h4>
                    <p className="">UI/UX Designer</p>       
                </div>
            
                  {currentUser?.username === storedUser?.username ?
                      <div className="d-flex gap-3 mt-3 text-[ #a303a0]">
                        <Button style={{ color: ' #a303a0', outline: '1px solid  #a303a0' }} variant=""> Edit Profile</Button>
                      </div>
                      :
                      <div className="d-flex gap-3 mt-3 text-[ #a303a0]">
                        <Button style={{ color: ' #a303a0', outline: '1px solid  #a303a0' }} variant="outline-primary"><FaEnvelopeIcon className="me-2 text-[ #a303a0]" /> Message</Button>
                        <Button style={{ color: ' #a303a0', outline: '1px solid  #a303a0' }} variant=""><FaUserPlusIcon className="me-2" /> Follow</Button>
                      </div>
                  }  
            </div>
        </Card.Body>
      </Card>
  )
}

export default ProfileHeader