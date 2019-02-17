import { resolvers } from './resolvers'; 
import { importSchema } from 'graphql-import'; 
import { makeExecutableSchema } from 'graphql-tools'; 

const typeDefs = importSchema('db/schema.graphql');

const schema = makeExecutableSchema({typeDefs, resolvers});

export { schema };