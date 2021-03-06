import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./db/schema";
import { resolvers } from "./db/resolvers";

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({path:__dirname+'/./../../.env'})

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async({req}) => {
    // Get the token back
    const token =  req.headers['authorization'];

    if(token !== "null") {
      try {
        // We verified the token from the Front-end 
        const getUser = await jwt.verify(token, process.env.SECRET);

        // We add the user to the request 
        req.getUser = getUser;

        // We send it back 
        return { getUser };

      }
      catch(err) {
        console.error(err);
      }
    }
  }
});


server.applyMiddleware({app}); 

const port = process.env.PORT || 4000;

app.listen({port: port}, () => console.log(`Server is running http://localhost:${port}${server.graphqlPath}`))