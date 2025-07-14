// components/Sidebar.tsx

import React from 'react';
import { ListGroup, Image, Badge } from 'react-bootstrap';
import { FaCircle } from 'react-icons/fa';

import { Client } from './ChatMessages';
import { AuthContextType } from '../App';

const FaCircleIcon = FaCircle as unknown as any;

interface SidebarProps {
  clients: Client[];
  onlineUsers: any;
  selectedClient: Client;
  onSelectClient: (client: any) => void;
}

const ChatSidebar: React.FC<SidebarProps> = ({ clients, onlineUsers, onSelectClient, selectedClient }) => {
  return (
    <ListGroup variant="flush">
      {clients.map((client) => (
          <ListGroup.Item
            style={{cursor: 'pointer'}}
            onClick={() => { onSelectClient(client); console.log(client) }}  
            key={client._id}
            className="d-flex align-items-start relative select_client">
          <Image src={client.picture || './profile.png'} roundedCircle width={40} height={40} className="me-2" />
          <div className='d-flex flex-column align-items-start'>
            <div>{client.username}</div>
                  <small className="text-muted">{onlineUsers?.has(client._id) ?
                      <Badge bg={'success'}>Online</Badge>
                      : 
                      <Badge bg={'warning'}>Offline</Badge>}
                  </small>
              </div>
              <div style={{position: 'absolute', left: 40, bottom: 5}}>
                <FaCircleIcon
                  className={`${onlineUsers?.has(client._id) ? 'text-success' : 'text-warning'} ms-auto`}
                  size={10} />
              </div>
              
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ChatSidebar;
