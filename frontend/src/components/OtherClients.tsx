import React from 'react';
import YouMightKnow from './YouMightKnow';
import ActiveUsers from './ActiveUsers';
import { Stack } from 'react-bootstrap';
import { AuthContextType } from './VisitorClient';

interface OtherClientsProps {
    clients: AuthContextType[];
    onlineUsers: any;
}

const OtherClients: React.FC<OtherClientsProps> = ({onlineUsers, clients}) => {
  return (
    <Stack gap={3}>
      <YouMightKnow />
      <ActiveUsers onlineUsers={onlineUsers} clients={clients} />
    </Stack>
  );
};

export default OtherClients;
