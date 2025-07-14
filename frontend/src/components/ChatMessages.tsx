// components/ChatMessages.tsx

import React from 'react';
import { Container, Row, Col, Card, Placeholder } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { GET_OTHER_CLIENTS } from '../graphqlClient/queries';
import ChatSidebar from './ChatSidebar';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatInput from './ChatInput';

export interface Client {
  _id: string;
  username: string;
  picture: string;
  email: string;
}

interface ChatProps {
    data: any;
    loading: boolean;
    error: any;
    onlineUsers: any;
    messages: any;
    messageLoading: boolean;
    messageError: any;
    currentUserId: any;
    selectedClient: Client;
    handleSelectClient: (client: any) => void;
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    onSend: () => void;
}

const ChatMessages: React.FC<ChatProps> = (
    { data,
      error,
      loading,
      onlineUsers,
      handleSelectClient,
      currentUserId,
      selectedClient,
      messages,
      messageLoading,
      messageError,
      input,
      setInput,
      onSend,
    }) => {
//   const { data, loading, error } = useQuery(GET_OTHER_CLIENTS);

  const clients: Client[] = data?.otherClients || [];

  return (
    <Container fluid style={{ height: '100vh', overflow: 'scroll' }}>
      <Row className="h-100 p-2">
        {/* Sidebar */}
        <Col xs={12} md={5} lg={4} className="border-end overflow-auto">
          {loading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <Card key={idx} className="mb-2">
                <Card.Body className="d-flex align-items-center">
                  <Placeholder className="rounded-circle me-3" style={{ width: 40, height: 40 }} />
                  <div className="flex-grow-1">
                    <Placeholder xs={6} /> <br />
                    <Placeholder xs={4} />
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : error ? (
            <div className="text-danger p-3">Error fetching clients</div>
          ) : (
            <ChatSidebar
               clients={clients}
               onlineUsers={onlineUsers}
               onSelectClient={handleSelectClient}
               selectedClient={selectedClient}
            />
          )}
        </Col>

        {/* Chat Section */}
        <Col xs={12} md={7} lg={8} className="d-flex flex-column">
          <ChatHeader selectedClient={selectedClient}/>
          <ChatBody
              messages={messages}
              messageLoading={messageLoading}
              messageError={messageError}
              currentUserId={currentUserId}
          />
          <ChatInput
              input={input}
              setInput={setInput}
              onSend={onSend}/>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatMessages;
