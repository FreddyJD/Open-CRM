import { importSchema } from 'graphql-import'; 

const typeDefs = importSchema('db/schema.graphql');

export { typeDefs };