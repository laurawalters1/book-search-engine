const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    me(_id: int!): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    loginUser(username: String!, email: String!, password: String!): Auth
    saveBook(authors: [String!], description: String!, title: String!, bookId int!, image: String!, link: String!): User
    deleteBook(bookId: int!): User
  }
`;

module.exports = typeDefs;
