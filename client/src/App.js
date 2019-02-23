import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import Header from './components/Layout/Header';

import Clients from './components/Clients/Clients';
import EditClient from './components/Clients/EditClient';
import NewClient from './components/Clients/NewClient';

import NewProduct from './components/Products/NewProduct';
import EditProduct from './components/Products/EditProduct';
import Products from './components/Products/Products';

import NewOrder from './components/Orders/NewOrder';
import ClientsOrder from './components/Orders/ClientsOrders';

import Panel from './components/Panel';

import Register from './components/Auth/Register';
import Login from './components/Auth/Login';

import Session from './components/Session';

const App = ({refetch, session}) => {

  const { getUser } = session


  const message = (getUser) ? `Welcome ${getUser.name}` : <Redirect to="/login" />;
  
  return(
    <Router >
          <>
          <Header session={session} /> 
            <div className="container" >
            <p className="text-right">{message}</p>
              <Switch>
                <Route exact path="/clients" render={() => <Clients session={session} /> } />
                <Route exact path="/client/new" render={() => <NewClient session={session} /> } />
                <Route exact path="/client/edit/:id" component={EditClient} />

                <Route exact path="/product/new" component={NewProduct} />
                <Route exact path="/product/edit/:id" component={EditProduct} />
                <Route exact path="/products/" component={Products} />

                <Route exact path="/order/new/:id" render={() => <NewOrder session={session} /> } />
                <Route exact path="/orders/:id" component={ClientsOrder} />

                <Route exact path="/" component={Panel} />

                <Route exact path="/register" render={() => <Register session={session} /> }/>
                <Route exact path="/login" render={() => <Login refetch={refetch} /> } />
              </Switch>
            </div>
          </>
        </Router>
       )
}
const RootSession = Session(App);
export { RootSession }
