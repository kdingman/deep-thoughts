const express = require("express");
// import Apollo
const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require("./utils/auth");

// import typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

  // create a new Apollo server and pass in our schema data
const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware // ensures that every request performs auth check, updated request object will be passed to the resolvers as the context
  });

  // Start the Apollo Server
  await server.start();

  // integrate our Apollo server with the Express app as middleware
  server.applyMiddleware({ app });

  // log where we can go to test our GQL API
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

// Initialize the Apollo Server
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
