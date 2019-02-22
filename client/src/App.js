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

  console.log(session)

  return(
    <Router >
          <>
          <Header session={session} /> 
            <div className="container" >
              <Switch>
                <Route exact path="/clients" component={Clients} />
                <Route exact path="/client/new" component={NewClient} />
                <Route exact path="/client/edit/:id" component={EditClient} />

                <Route exact path="/product/new" component={NewProduct} />
                <Route exact path="/product/edit/:id" component={EditProduct} />
                <Route exact path="/products/" component={Products} />

                <Route exact path="/order/new/:id" component={NewOrder} />
                <Route exact path="/orders/:id" component={ClientsOrder} />

                <Route exact path="/panel" component={Panel} />

                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" render={() => <Login refetch={refetch} /> } />
              </Switch>
            </div>
          </>
        </Router>
       )
}
const RootSession = Session(App);
export { RootSession }
