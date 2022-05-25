import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me($_id: ID) {
    me(_id: $_id) {
      user {
        username
        email
        savedBooks
      }
    }
  }
`;
