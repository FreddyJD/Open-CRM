import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./db/schema";
import { resolvers } from "./db/resolvers";

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async({req}) => {
    // Get the token back
    const token =  req.headers['authorization'];
    console.log(token);
  }
});


server.applyMiddleware({app}); 

app.listen({port: 4000}, () => console.log(`Server is running http://localhost:4000${server.graphqlPath}`))