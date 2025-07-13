import React, {useEffect, useState} from 'react';
import { Route, Navigate, useOutletContext, Routes } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import io from 'socket.io-client';

import VisitorClient from './VisitorClient';
import { GET_OTHER_CLIENTS } from '../graphqlClient/queries';

import { AuthContextType } from '../App';
import UserContent from './UserContent';
import { UserProvider, useUserContext } from './UserContext';

interface HomeProps {
    storedCurrentUser: AuthContextType;
    authUser: AuthContextType;
    currentUser: AuthContextType;
    profileUser: AuthContextType;
    onlineUsers: AuthContextType[];
    clients: AuthContextType[];
    setCurrentUser: React.Dispatch<React.SetStateAction<AuthContextType>>;
    setProfileUser: React.Dispatch<React.SetStateAction<AuthContextType>>;
    data: any;
    loading: boolean;
    isOnline: boolean;
}

const Home: React.FC = () => {

  const authUser = useOutletContext<AuthContextType>();
  const storedUser = authUser;
  const [storedCurrentUser, setStoredCurrentUser] = useState<AuthContextType>(() => ({ ...authUser }));
//   const { currentUser, setCurrentUser, setProfileUser, setUser } = useUserContext();
  // const [currentUser, setCurrentUser] = useState<AuthContextType>(authUser);
//   const [currentUser, setCurrentUser] = useState<AuthContextType>(() => ({ ...authUser }));
//   const [profileUser, setProfileUser] = useState<AuthContextType>(() => ({ ...storedUser }));
//   const [user, setUser] = useState<AuthContextType>(() => ({ ...currentUser }));
  const { data, loading, error } = useQuery(GET_OTHER_CLIENTS);
  const [socket, setSocket] = useState<any>(null);
  const [onlineUsers, setOnlineUsers] = useState<any>(new Set());
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const clients = data?.otherClients ?? [];

  useEffect(() => {
    const socketServerURL = 'http://localhost:3700';
    const socketInstance = io(socketServerURL, {
      transports: ['websocket'],
      //   extraHeaders: {
      //     Authorization: 'Bearer YOUR_TOKEN_HERE',
      //     'Content-Type': 'application/json',
      //   },
    });

    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      console.log('Connected to socket.io server');
    });

    socketInstance.on('newMessage', (user: any) => {
      console.log('Received new user:', user?.username);
    });

    return () => {
      socketInstance.off('newMessage');
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket || !storedUser) return;

    socket.emit('authenticated', { userId: storedCurrentUser?._id });

    socket.on('userOnline', ({ userId, online }: { userId: any; online: boolean }) => {
      setOnlineUsers((prev: any) => new Set(prev).add(userId));
      setIsOnline(online);
    });

    socket.on('usersOnline', ({ userIds, online }: { userIds: any; online: boolean }) => {
      setOnlineUsers(new Set(userIds));
      setIsOnline(online);
    });
    
    socket.on('userOffline', ({ userId }: { userId: any }) => {
      setOnlineUsers((prev: any) => {
        const updated = new Set(prev);
        updated.delete(userId);
        return updated;
      });
    });
  }, [socket]);


    return (
        <UserProvider authUser={authUser} storedUser={storedUser}>
            <Routes>
            <Route path='/' element={<VisitorClient
                // storedCurrentUser={storedCurrentUser}
                // authUser={currentUser}
                // currentUser={currentUser}
                // setCurrentUser={setCurrentUser}
                // profileUser={profileUser}
                // setProfileUser={setProfileUser}
                // onlineUsers={onlineUsers}
                // showEditProfileModal={showEditProfileModal}
                // setShowEditProfileModal={setShowEditProfileModal}
                // clients={clients}
                // data={data}
                // loading={loading}
                isOnline={isOnline}
                // user={user}
                // setUser={setUser}
            />} >
            <Route index element={<Navigate to="profile" replace />} />
                <Route path="profile" element={
                    <UserContent
                    storedUser={storedUser}
                    authUser={authUser}
                    // currentUser={currentUser}
                    // setCurrentUser={setCurrentUser}
                    // profileUser={profileUser}
                    // setProfileUser={setProfileUser}
                    // user={user}
                    // setUser={setUser}
                    onlineUsers={onlineUsers}
                    showEditProfileModal={showEditProfileModal}
                    setShowEditProfileModal={setShowEditProfileModal}
                    clients={clients}
                    data={data}
                    loading={loading}/>} />
                <Route path="messages" element={<h1>Hello Messages</h1>} />
        </Route>
            
    </Routes >
    </UserProvider>
      
  )
}

export default Home