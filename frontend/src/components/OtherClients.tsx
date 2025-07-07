import React from 'react';
import YouMightKnow from './YouMightKnow';
import ActiveUsers from './ActiveUsers';
import { Stack } from 'react-bootstrap';

const OtherClients: React.FC = () => {
  return (
    <Stack gap={3}>
      <YouMightKnow />
      <ActiveUsers />
    </Stack>
  );
};

export default OtherClients;
