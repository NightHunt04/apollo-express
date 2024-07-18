const typeDefs = `#graphql
    type User {
        id: ID!
        username: String!
        ipAddress: String!
        email: String!
    }

    type Response {
        code: Int!
        msg: String!
    }

    type SearchUser {
        response: Response
        user: User
    }

    input AddUserInput {
        username: String!
        ipAddress: String!
        email: String!
    }

    type Query {
        getUsers: [User]
        getUser(id: ID!): SearchUser
    }

    type Mutation {
        addUser(user: AddUserInput!): Response
        deleteUser(id: ID!): Response
    }
`

export default typeDefs