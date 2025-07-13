// src/context/UserContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType } from '../App';

interface UserContextType {
  currentUser: AuthContextType;
  setCurrentUser: React.Dispatch<React.SetStateAction<AuthContextType>>;
  profileUser: AuthContextType;
  setProfileUser: React.Dispatch<React.SetStateAction<AuthContextType | any>>;
  user: AuthContextType;
  setUser: React.Dispatch<React.SetStateAction<AuthContextType>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ authUser: AuthContextType; storedUser: AuthContextType; children: React.ReactNode }> = ({
  authUser,
  storedUser,
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<AuthContextType>(() => ({ ...authUser }));
  const [profileUser, setProfileUser] = useState<AuthContextType | any>(() => ({ ...authUser }));
  const [user, setUser] = useState<AuthContextType>(() => ({ ...storedUser }));

  // Sync updates
  useEffect(() => {
    setCurrentUser({ ...authUser });
    // if (user?.username !== authUser?.username) {
    // setProfileUser({ ...authUser });
    setUser({ ...authUser });
    // }
  },[authUser]);



  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, profileUser, setProfileUser, user, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

// 🔄 Custom hook
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUserContext must be used within a UserProvider');
  return context;
};
