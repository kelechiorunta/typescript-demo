import React from 'react';
import YouMightKnow from './YouMightKnow';
import ActiveUsers from './ActiveUsers';
import { Stack } from 'react-bootstrap';
import { AuthContextType } from './VisitorClient';

interface OtherClientsProps {
    clients: AuthContextType[];
    onlineUsers: any;
    data: any;
    loading: boolean
}

const OtherClients: React.FC<OtherClientsProps> = ({data, loading, onlineUsers, clients}) => {
  return (
    <Stack gap={3}>
      <YouMightKnow />
      <ActiveUsers data={data} loading={loading} onlineUsers={onlineUsers} clients={clients} />
    </Stack>
  );
};

export default OtherClients;
