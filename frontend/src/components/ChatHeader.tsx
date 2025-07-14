// components/ChatHeader.tsx

import React from 'react';
import { Image, Navbar } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { Client } from './ChatMessages';

const FaUserCircleIcon = FaUserCircle as unknown as any

interface ChatHeaderProps {
    selectedClient: any
}

const ChatHeader: React.FC<ChatHeaderProps> = ({selectedClient}) => {
  return (
    <Navbar bg="light" className="border-bottom px-3">
        {selectedClient && selectedClient.picture ?
            <Image
            src={selectedClient.picture || './profile.png'}
            roundedCircle
            width={40}
            height={40}
            className="me-3"
          />
            :
            <FaUserCircleIcon size={30} className="me-2" />
          }
      <span className="fw-bold">{selectedClient ? `Chat with ${selectedClient.username}` : 'Chat with Clients'}</span>
    </Navbar>
  );
};

export default ChatHeader;
