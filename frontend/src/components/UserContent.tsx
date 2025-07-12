import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import TopBar from './TopBar';
import { AuthContextType } from './VisitorClient';
import ProfileHeader from './ProfileHeader';
import About from './About';
import Feed from './Feed';
import OtherClients from './OtherClients';
import Video from './Video';
import EditProfileModal from './EditProfileModal';

interface UserContentProps {
    authUser: AuthContextType;
    currentUser: AuthContextType;
    profileUser: AuthContextType;
    storedUser: AuthContextType;
    clients: AuthContextType[];
    onlineUsers: any;
    data: any;
    loading: boolean;
    setCurrentUser: React.Dispatch<React.SetStateAction<AuthContextType>>
    setProfileUser: React.Dispatch<React.SetStateAction<AuthContextType>>
}


const UserContent: React.FC<UserContentProps> = ({data, loading, onlineUsers, clients, profileUser, setProfileUser, storedUser, authUser, currentUser, setCurrentUser }) => {
//   const [currentUser, setCurrentUser] = useState(authUser);
const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [user, setUser] = useState(currentUser); // Local copy to pass down
    const handleSaveProfile = (updatedUser: AuthContextType) => {
        setCurrentUser(updatedUser);
        alert("Saved")
    };
  return (
    <div className="p-5 w-100" style={{ margin: 'auto', backgroundColor: 'rgba(248,248,248, 0.2 )' }}>
      {/* Top Bar */}
      <TopBar currentUser={user} setCurrentUser={setUser} authUser={authUser} />

      {/* Profile Header */}
      <ProfileHeader setShowEditProfileModal={setShowEditProfileModal} storedUser={storedUser} authUser={authUser} profileUser={user.username===storedUser.username? profileUser : user} setProfileUser={setUser} currentUser={user} setCurrentUser={setCurrentUser} />
      <EditProfileModal
                    show={showEditProfileModal}
                    handleClose={() => setShowEditProfileModal(false)}
                    currentUser={currentUser}
                    handleSave={(updatedUser) => {
                        setUser(updatedUser); // 💥 update About section
                      }}
                    />
      <Row style={{ color: '#a303a0', height: 'max-content', overflow: 'auto' }} className="gx-2">
        <Col xs={12} md={6} lg={4}>
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
