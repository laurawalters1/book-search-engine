import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        username
        email
        savedBooks
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
        email
        savedBooks
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook(
    $authors: [String!]
    $description: String!
    $title: String!
    $bookId: Int!
    $image: String!
    $link: String!
  ) {
    addUser(
      authors: $authors
      description: $description
      title: $title
      bookId: $bookId
      image: $image
      link: $link
    ) {
      user {
        username
        email
        savedBooks
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation saveBook($bookId: int!) {
    addUser(bookId: $bookId) {
      user {
        username
        email
        savedBooks
      }
    }
  }
`;
