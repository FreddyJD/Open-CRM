import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost'; 
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';


//
// Components 
import Header from './components/Header';
import Clients from './components/Clients'
import EditClient from './components/EditClient'
import NewClient from './components/NewClient'

const client = new ApolloClient({
  uri: `http://localhost:4000/graphql`,
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({networkError, graphQLErrors}) => { 
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkErrors', networkError); 
  }
});


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <>
          <Header /> 
            <div className="container">
              <Switch>
                <Route exact path="/" component={Clients} />
                <Route exact path="/client/new" component={NewClient} />
                <Route exact path="/client/edit/:id" component={EditClient} />
              </Switch>
            </div>
          </>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
