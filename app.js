import express from 'express';
import graphqlHTTP from 'express-graphql'


import { schema } from './db/schema'; 

const app = express(); 

app.get('/', (req, res) => { 
    res.send('Hello World');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}))

app.listen(8000, () => { 
    console.log('el Servidor esta funcionando')
})