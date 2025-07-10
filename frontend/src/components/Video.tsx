import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_VIDEO } from '../graphqlClient/queries';
import { Card, Spinner, Placeholder } from 'react-bootstrap';

interface VideoProps {
  email: string;
}


const Video: React.FC<VideoProps> = ({ email }) => {
    const { data, loading, error } = useQuery(GET_VIDEO, {
    // fetchPolicy: 'cache-only',
    variables: { email },
  });

  if (loading) {
    return (
      <Card className="mb-4">
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <div className="text-center my-3">
            <Spinner animation="border" variant="primary" />
          </div>
          <Placeholder as="div" animation="glow">
            <Placeholder xs={12} className="w-100" style={{ height: '300px' }} />
          </Placeholder>
        </Card.Body>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mb-4">
        <Card.Body>
          <Card.Text className="text-danger">Error loading video</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="mb-4">
      <Card.Body>
        <video width="100%" height="auto" controls>
          <source src={data.getVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Card.Body>
    </Card>
  );
};

export default Video;

