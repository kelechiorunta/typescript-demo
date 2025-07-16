import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import TopBar from './TopBar';
import { AuthContextType } from '../App';
import ProfileHeader from './ProfileHeader';
import About from './About';
import Feed from './Feed';
import OtherClients from './OtherClients';
import Video from './Video';
import EditProfileModal from './EditProfileModal';
import { useUserContext } from './UserContext';
import EditBackgroundProfile from './EditBackgroundProfile';

interface UserContentProps {
    authUser: AuthContextType;
    storedUser: AuthContextType;
    clients: AuthContextType[];
    onlineUsers: any;
    data: any;
    loading: boolean;
    showEditProfileModal: boolean;
    handleSelectClient: (client: any) => void
    setShowEditProfileModal: React.Dispatch<React.SetStateAction<boolean>>
}


const UserContent: React.FC<UserContentProps> = (
    { data,
      showEditProfileModal,
      setShowEditProfileModal,
      loading,
      onlineUsers,
      clients,
      storedUser,
      authUser,
      handleSelectClient
    }) => {

    const [showModal, setShowModal] = useState(false);
    const { currentUser, setCurrentUser, setProfileUser, profileUser, user, setUser } = useUserContext();
  return (
    <div className="p-5 w-100" style={{ margin: 'auto', backgroundColor: 'rgba(248,248,248, 0.2 )' }}>
      {/* Top Bar */}
        <TopBar currentUser={user} setCurrentUser={setUser} authUser={authUser} />
        <EditBackgroundProfile
            show={showModal}
            handleClose={() => setShowModal(false)}
            storedUser={storedUser}
        />

      {/* Profile Header */}
          <ProfileHeader
            setShowEditProfileModal={setShowEditProfileModal}
            setShowModal={setShowModal}
            storedUser={storedUser}
            authUser={authUser}
            handleSelectClient={handleSelectClient}
            // profileUser={user }//{user?.username === storedUser?.username ? profileUser : user}
            currentUser={user}
            setCurrentUser={setUser} />

      <Row style={{ color: '#a303a0', height: 'max-content', overflow: 'auto' }} className="gx-2">
        <Col xs={12} md={6} lg={4}>
            <EditProfileModal
              show={showEditProfileModal}
              handleClose={() => setShowEditProfileModal(false)}
              currentUser={user}
            />
            <About authUser={authUser} currentUser={user} />
            <Video email={storedUser?.email}/>
        </Col>
        <Col xs={12} md={6} lg={4}>
            <Feed data={data} loading={loading} clients={clients} />
        </Col>
        <Col xs={12} md={12} lg={4}>
            <OtherClients data={data} loading={loading} onlineUsers={onlineUsers} clients={clients} />
        </Col>
      </Row>
    </div>
  );
};

export default UserContent;
