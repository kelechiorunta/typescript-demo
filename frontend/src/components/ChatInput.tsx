// // components/ChatInput.tsx

// import React, { useState } from 'react';
// import { Form, InputGroup, Button } from 'react-bootstrap';
// import { FaPaperPlane } from 'react-icons/fa';

// const FaPaperPlaneIcon = FaPaperPlane as unknown as any

// const ChatInput: React.FC = () => {
//   const [input, setInput] = useState('');

//   const handleSend = () => {
//     if (!input.trim()) return;
//     // send message logic here
//     console.log("Send:", input);
//     setInput('');
//   };

//   return (
//     <Form className="p-3 border-top">
//       <InputGroup>
//         <Form.Control
//           placeholder="Type a message..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />
//         <Button variant="primary" onClick={handleSend}>
//           <FaPaperPlaneIcon />
//         </Button>
//       </InputGroup>
//     </Form>
//   );
// };

// export default ChatInput;

// components/ChatInput.tsx

import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { Send, Mic, Image, Paperclip, Smile } from 'lucide-react';
// import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
// import { useTheme } from './ThemeContext';

interface ChatInputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  onSend: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ input, setInput, onSend }) => {
//   const { theme } = useTheme();
//   const isDark = theme === 'dark';
  const [showPicker, setShowPicker] = useState(false);

  const addEmoji = (emoji: any) => {
    setInput((prev) => prev + emoji.native);
  };

  return (
    <div
      className="p-3 border-top border-dark"
      style={{
        // backgroundColor: isDark ? '#212529' : 'white',
        // color: isDark ? 'white' : 'black',
        position: 'relative',
      }}
    >
      {showPicker && (
        <div style={{ position: 'absolute', bottom: '60px', zIndex: 1000 }}>
          {/* <Picker
            data={data}
            onEmojiSelect={addEmoji}
            // theme={isDark ? 'dark' : 'light'}
          /> */}
        </div>
      )}

      <InputGroup>
        <Button variant="outline-secondary" onClick={() => setShowPicker((prev) => !prev)}>
          <Smile size={18} />
        </Button>
        <Button variant="outline-secondary">
          <Paperclip size={18} />
        </Button>
        <Button variant="outline-secondary">
          <Image size={18} />
        </Button>
        <FormControl
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border-secondary"
          style={{
            // backgroundColor: isDark ? '#212529' : 'white',
            // color: isDark ? 'white' : 'black',
          }}
        />
        <Button variant="outline-secondary" onClick={onSend}>
          <Send size={18} />
        </Button>
        <Button variant="outline-secondary">
          <Mic size={18} />
        </Button>
      </InputGroup>
    </div>
  );
};

export default ChatInput;
