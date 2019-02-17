import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost'; 


// Components 
import Header from './components/Header';
import Clients from './components/Clients'


const client = new ApolloClient({
  uri: `http://localhost:4000/graphql`,
  onError: ({networkError, graphQLErrors}) => { 
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkErrors', networkError); 
  }
});


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Header /> 
        <div className="container">
          <Clients />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
