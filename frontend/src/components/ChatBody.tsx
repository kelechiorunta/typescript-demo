// components/ChatBody.tsx

// import React from 'react';
// import { ListGroup } from 'react-bootstrap';

// interface ChatBodyProps {
//     messages: any;
//     messageLoading: boolean;
//     messageError: any;
// }

// const ChatBody: React.FC<ChatBodyProps> = ({messages, messageLoading, messageError}) => {
//   return (
//       <div style={{
//           flex: 1, overflowY: 'auto', padding: '1rem', background: 'url(./backgroundII.png)', 
//         backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'
//      }}>
//       <ListGroup>
//         <ListGroup.Item className="bg-light">
//           <strong>You:</strong> Hello!
//         </ListGroup.Item>
//         <ListGroup.Item>
//           <strong>Other:</strong> Hey, what's up?
//         </ListGroup.Item>
//         {/* Map messages here */}
//       </ListGroup>
//     </div>
//   );
// };

// export default ChatBody;


import React, { useEffect, useRef } from 'react';
import { Spinner, Placeholder, Image } from 'react-bootstrap';
import { FaCircle, FaUserCircle } from 'react-icons/fa';
import { format, isToday, isYesterday } from 'date-fns';

// import './ChatBody.css'; // optional: for additional styles

interface User {
  _id: any;
  username: string;
  picture?: string;
}

interface Message {
  _id: any;
  content: string;
  createdAt: string;
  sender: User;
  receiver: User;
}

interface ChatBodyProps {
  messages: Message[];
  messageLoading: boolean;
  messageError: any;
  currentUserId: any;
}

const FaCircleIcon = FaCircle as unknown as any

const ChatBody: React.FC<ChatBodyProps> = ({ messages, messageLoading, messageError, currentUserId }) => {
  
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        const chatRef = chatEndRef.current as unknown as HTMLElement
        chatRef?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const formatDateLabel = (
        date: Date | string | number | null | undefined
      ): string => {
        if (!date) return 'Invalid Date';
      
        let parsedDate: Date;
      
        if (typeof date === 'number') {
          parsedDate = new Date(date); // UNIX timestamp in ms
        } else if (typeof date === 'string') {
          parsedDate = new Date(date); // handles ISO string like "2025-07-14T18:46:56.720Z"
        } else {
          parsedDate = date;
        }
      
        if (isNaN(parsedDate.getTime())) {
          return 'Invalid Date';
        }
      
        if (isToday(parsedDate)) return 'Today';
        if (isYesterday(parsedDate)) return 'Yesterday';
        return format(parsedDate, 'MMMM d, yyyy');
      };
    
    let lastMessageDate: any = null;
  
    const renderSkeletons = () =>
    Array.from({ length: 5 }).map((_, idx) => (
      <div key={idx} className="d-flex mb-3">
        <Placeholder animation="wave" className="me-2 rounded-circle" style={{ width: 40, height: 40 }} />
        <div className="flex-grow-1">
          <Placeholder xs={8} />
          <Placeholder xs={4} />
        </div>
      </div>
    ));

  const renderMessages = () =>
    messages.map((msg) => {
        const isSender = msg.sender?._id === currentUserId;
        const msgDate = msg.createdAt;
        const dateLabel = typeof msgDate !== 'string' ?
            formatDateLabel((msg.createdAt))
            :
            formatDateLabel(parseInt(msg.createdAt))
            ;
        lastMessageDate = msgDate

      const showDateLabel = !lastMessageDate || formatDateLabel(lastMessageDate) !== dateLabel;
      
        return (
          
      <React.Fragment>
        {showDateLabel && (
            <div className="text-center my-3" style={{ fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent:'space-evenly', width: '100%', alignItems: 'center' }}>
                    <hr style={{ width: '100%' }} />
                    <p style={{ width: '100%', marginTop: 15 }}>{dateLabel} </p>
                    <hr style={{ width: '100%' }} />
                </div>
            </div>
        )}
        <div
          key={msg._id}
          className={`d-flex mb-3 ${isSender ? 'justify-content-end' : 'justify-content-start'}`}
        >
          {!isSender && (
            <Image
              src={msg.sender.picture || ''}
              roundedCircle
              style={{ width: 40, height: 40 }}
              className="me-2"
              onError={(e: any) => (e.target.src = './profile.png')}
            />
          )}

          <div
            className={`p-2 px-3 rounded-3 shadow-sm ${
              isSender ? 'bg-[ #a303a0] text-white' : 'bg-light text-dark'
            }`}
            style={{ maxWidth: '70%', backgroundColor: isSender?'  #a303a0' : 'white'}}
          >
            <div style={{ width: 'max-content', textAlign: isSender? 'left' : 'right' }} className={`small fw-bold mb-1 ${isSender? 'text-left' : 'text-right'} w-100 me-auto`}>{isSender ? 'You' : msg.sender.username}</div>
            <div>{msg.content}</div>
                <div className="text-muted small text-end mt-1">
                {msg.createdAt && dateLabel}
            </div>
          </div>

          {isSender && (
            <Image
              src={msg.sender.picture || ''}
              roundedCircle
              style={{ width: 40, height: 40 }}
              className="ms-2"
              onError={(e: any) => (e.target.src = './profile.png')}
            />
              )}
            <div ref={chatEndRef} />
        </div>
      </React.Fragment>
      );
    });

  return (
    <div
      style={{
        padding: '1rem',
        background: 'url(./backgroundII.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        height: '80vh',
        overflow: 'scroll'
      }}
    >
      {messageLoading ? (
        renderSkeletons()
      ) : messageError ? (
        <div className="text-danger text-center">Failed to load messages.</div>
      ) : messages.length === 0 ? (
        <div className="text-center text-muted">No messages yet.</div>
      ) : (
        renderMessages()
      )}
    </div>
  );
};

export default ChatBody;
