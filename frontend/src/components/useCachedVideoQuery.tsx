import { useQuery, ApolloError } from '@apollo/client';
import { GET_VIDEO } from '../graphqlClient/queries';

interface VideoQueryData {
  getVideo: string; // Adjust based on actual return type
}

interface VideoQueryVars {
  email: string;
}

const useCachedVideoQuery = (email: string) => {
  return useQuery<VideoQueryData, VideoQueryVars>(GET_VIDEO, {
    fetchPolicy: 'cache-only',
    variables: { email },
  });
};

export { useCachedVideoQuery }