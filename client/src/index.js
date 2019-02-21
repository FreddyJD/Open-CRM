import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';

import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost'; 

import {RootSession} from './App';

const client = new ApolloClient({
    uri: `http://localhost:4000/graphql`,
    // Send token to the server back 
    fetchOptions: {
      credentials: 'include'
    },
    request: operation => {
      const token = localStorage.getItem('token');
      operation.setContext({
        headers: {
          authorization: token
        }
      })
    },
    cache: new InMemoryCache({
      addTypename: false
    }),
    onError: ({networkError, graphQLErrors}) => { 
      console.log('graphQLErrors', graphQLErrors);
      console.log('networkErrors', networkError); 
    }
  });


ReactDOM.render(
    <ApolloProvider client={client}>
        <RootSession /> 
    </ApolloProvider> ,
document.getElementById('root'));

serviceWorker.unregister();
