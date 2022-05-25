const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: int!
    savedBooks: [Book]
}
type Book {
    bookId: int!
    authors: [String!]
    description: String!
    title: String!
    image: String!
    link: Sting!
}

type Auth {
    token: ID!
    user: User
  }

  type Query {
    me(_id: int!): User
  }

 
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    saveBook(authors: [String!], description: String!, title: String!, bookId int!, image: String!, link: String!): User
    deleteBook(bookId: int!): User
  }
`;

module.exports = typeDefs;
