// import the gql tagged template function
const { gql } = require('apollo-server-express');

// Create typeDefs
const typeDefs = gql`

    type User {
        _id: ID
        username: String
        email: String
        friendCount: Int
        thoughts: [Thought]
        friends: [User]
    }

    type Thought {
        _id: ID // looking for a unique identfier
        thoughtText: String
        createdAt: String
        username: String
        reactionCount: Int // integer
        reactions: [Reaction]
    }

    type Reaction {
        _id: ID
        reactionBody: String
        createdAt: String
        username: String
    }

    type Query {
        users: [User]
        user(username: String!): User
        thoughts(username: String): [Thought]
        thoughts(username: String): [Thought]
    }
`;

// Export the typeDefs
module.exports = typeDefs;