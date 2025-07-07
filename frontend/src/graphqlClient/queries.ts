import { gql } from "@apollo/client";

export const AUTH = gql`
  query authenticatedUser {
    auth {
      _id
      email
      username
      picture
      lastMessage
      lastMessageCount
      isOnline
  }
}
`;

export const GET_CLIENTS = gql`
  query getClients {
    clients {
      email
      username
      picture
      image
    }
  }
`;

