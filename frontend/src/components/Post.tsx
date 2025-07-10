import React from 'react';
import { Card, Image } from 'react-bootstrap';
import { FaHeart, FaComment } from 'react-icons/fa';
import Video from './Video';
import { AuthContextType } from './VisitorClient';

interface PostProps {
  author: string;
  timestamp: string;
  avatarUrl: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  email: string;
  client: AuthContextType;
}

const FaHeartIcon = FaHeart as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const FaCommentIcon = FaComment as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

const Post: React.FC<PostProps> = ({
  author,
  timestamp,
  avatarUrl,
  imageUrl,
  caption,
  likes,
  comments,
  email,
  client
}) => {
  return (
      <div style={{maxHeight: '500px', overflow: 'scroll'}}>
          
      <div className="d-flex align-items-center mb-3 relative">
        <Image
                  
          src={avatarUrl || './profile.png'}
          roundedCircle
          width={50}
          height={50}
          className="me-3"
          alt="Avatar"
        />
         
        <div>
          <strong>{author}</strong>
          <div className="text-muted" style={{ fontSize: '0.85rem' }}>{timestamp}</div>
        </div>
      </div>

       
        {client.videoId ? <Video email={email} /> :
            <Card.Img
                //   style={{ position: 'absolute', zIndex: -1, top: 0, left: 0 }}
                src={imageUrl || './background.png'}
                alt="Post"
                className="rounded"
                height={150}
            />
        }

      <Card.Text className="mt-2">
        {/* <strong>{author}</strong> {caption} */}
      </Card.Text>

      <div className="d-flex justify-content-between text-muted">
        <span><FaHeartIcon className="me-2 text-danger" />{likes.toLocaleString()}</span>
        <span><FaCommentIcon className="me-2 text-primary" />{comments.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default Post;
