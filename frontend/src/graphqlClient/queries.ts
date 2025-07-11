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
      videoId
      backgroundImageId
      backgroundPlaceholderId
      occupation
      address
      birthday
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
      videoId
      backgroundImageId
      backgroundPlaceholderId
      occupation
      address
      birthday
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
      videoId
      backgroundImageId
      backgroundPlaceholderId
      occupation
      address
      birthday
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
      videoId
      backgroundImageId
      backgroundPlaceholderId
      occupation
      address
      birthday
    }
  }
`;

export const GET_VIDEO = gql`
  query GetVideo($email: String!) {
    getVideo(email: $email)
  }
`;

export const GET_BACKGROUND_IDS = gql`
query GetBackgroundImageIds($email: String!) {
    getBackgroundImageIds(email: $email) {
      backgroundImageId
      backgroundPlaceholderId
    }
  }`

  export const GET_PROFILE = gql`
  query GetProfile {
    getProfile {
      username
      email
      birthday
      gender
      phone
      address
      occupation
      picture
    }
  }
`;
  
export const SET_BACKGROUND_IMAGE = gql`
    mutation SetBackgroundImage($email: String!) {
      setBackgroundImage(email: $email) {
        backgroundImage
        backgroundPlaceholder
        backgroundImageId
        backgroundPlaceholderId
        id
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

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($userInputs: UserUpdateInput!) {
    updateProfile(userInputs: $userInputs) {
      _id
      username
      email
      picture
      birthday
      occupation
      gender
      phone
      address
    }
  }
`;