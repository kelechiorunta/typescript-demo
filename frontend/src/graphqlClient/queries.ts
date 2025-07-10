import { gql } from "@apollo/client";

export const AUTH = gql`
  query authenticatedUser {
    auth {
      _id
      email
      username
      picture
      phone
      image
      gender
      lastMessage
      lastMessageCount
      isOnline
      gender
      backgroundImage
  }
}
`;

export const GET_OTHER_CLIENTS = gql`
  query GetContacts {
    otherClients {
      _id
      email
      username
      picture
      image
      gender
      phone
      backgroundImage
      lastMessage
      lastMessageCount
      isOnline
  }
}
`;

export const GET_CLIENTS = gql`
  query getClients {
    clients {
      _id
      email
      username
      picture
      image
      gender
      phone
      backgroundImage
    }
  }
`;

export const GET_FILTERED_CLIENT = gql`
  query FilteredClients($client: UserInput!) {
    filteredClients(client: $client) {
      _id
      username
      email
      picture
      gender
      phone
      backgroundImage
    }
  }
`;

export const SET_PROFILE_BACKGROUND = gql`
  mutation UpdateProfileBackground($username: String!, $backgroundImage: String!) {
    updateProfileBackground(username: $username, backgroundImage: $backgroundImage) {
      username
      backgroundImage
    }
  }
`;
