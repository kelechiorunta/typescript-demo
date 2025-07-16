import React, {useEffect, useState} from 'react'
import { Form, Button, Card, Image, Row, Col, InputGroup } from 'react-bootstrap';
import { FaSearch, FaEnvelope, FaUserPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import TopBar from './TopBar';
import { AuthContextType } from '../App';
import EditBackgroundProfile from './EditBackgroundProfile';
import BlurLoadBackgroundImage from './BlurLoadBackgroundImage';
import EditProfileModal from './EditProfileModal';
import { useUserContext } from './UserContext';

interface ProfileContextProps {
    authUser: AuthContextType
    currentUser: AuthContextType
    storedUser: AuthContextType
    // profileUser: AuthContextType
    setCurrentUser: React.Dispatch<React.SetStateAction<AuthContextType>>
    // setProfileUser: React.Dispatch<React.SetStateAction<AuthContextType>>
    setShowEditProfileModal: React.Dispatch<React.SetStateAction<any>>
    setShowModal: React.Dispatch<React.SetStateAction<any>>
    handleSelectClient: (client: any) => void
}

const FaSearchIcon = FaSearch as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const FaEnvelopeIcon = FaEnvelope as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const FaUserPlusIcon = FaUserPlus as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

const ProfileHeader: React.FC<ProfileContextProps> = (
    { setShowEditProfileModal,
        setShowModal,
        storedUser,
        authUser,
        currentUser,
        setCurrentUser,
        handleSelectClient
    }) => {
    
    const { profileUser, setProfileUser, user, setUser } = useUserContext();
    const navigate = useNavigate();
    // const [updatePic, setUpdatePic] = useState(profileUser);

  return (
      <Card className="mb-4 bg-[ #ffffff]">
          <BlurLoadBackgroundImage
            activeUser={profileUser}
            fullImageUrl={`http://localhost:3700/pic/images/${profileUser?.backgroundImageId}`}
            placeholderImageUrl={`http://localhost:3700/pic/images/${profileUser?.backgroundPlaceholderId}`}
        />

        <Card.Body className="d-flex flex-column align-items-center relative bg-[ #ffffff] ">
            <Image
                style={{position: 'absolute', bottom: '20%', left: '3%', zIndex:50}}     
                src={user?.picture || profileUser?.picture ||  './backgroundII.png'}
                roundedCircle width={100} height={100}
              className="mb-3"
               />
                {profileUser?.username === storedUser?.username && (
                <div className="d-flex gap-3 mt-3 text-[ #a303a0]">
                    <Button
                    style={{zIndex:50, position: 'absolute', bottom: '50%', right: '1%', color: ' #a303a0', outline: '1px solid  #a303a0', backgroundColor: 'white' }}
                    onClick={() => setShowModal(true)}
                    >
                    Edit Cover Photo
                    </Button>
                </div>
                )}
                  
             <div style={{width: '100%', color: ' #a303a0'}} className='d-flex justify-content-between align-items-center'>
                <div style={{marginLeft: 10}} className="d-flex flex-column align-items-center me-5 mt-4">
                    <h4 className='text-[ #a303a0]'>{ user?.username || profileUser?.username }</h4>
                      <p className="">{user?.occupation ||profileUser?.occupation || 'UI/UX Designer'}</p>       
                </div>
            
                  {profileUser?.username === storedUser?.username ?
                      <div className="d-flex gap-3 mt-3 text-[ #a303a0]">
                          <Button style={{ color: ' #a303a0', outline: '1px solid  #a303a0' }}
                              variant=""
                              onClick={() => setShowEditProfileModal(true)}>
                              Edit Profile
                          </Button>
                      </div>
                      :
                      <div className="d-flex gap-3 mt-3 text-[ #a303a0]">
                          <Button
                              onClick={() => { handleSelectClient(profileUser); navigate('/messages'); }}
                              style={{ color: ' #a303a0', outline: '1px solid  #a303a0' }}
                              variant="outline-primary">
                              <FaEnvelopeIcon className="me-2 text-[ #a303a0]" />
                              Message
                          </Button>
                        <Button style={{ color: ' #a303a0', outline: '1px solid  #a303a0' }} variant=""><FaUserPlusIcon className="me-2" /> Follow</Button>
                      </div>
                  }  
              </div>
        </Card.Body>
      </Card>
  )
}

export default ProfileHeader