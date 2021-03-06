import React, { Component } from 'react'
import ClientData from './ClientData';
import { Query } from 'react-apollo';
import { GET_PRODUCTS } from '../../queries';
import OrderContent from './OrderContent'
import Session from '../Session';

import {withRouter} from 'react-router-dom'

class NewOrder extends Component {
    state = { 

    }
  render() {
    const { id } = this.props.match.params

    const sellerID = this.props.session.getUser.id

    return (
      <>
      <h1 className="text-center mb-5"> New Order </h1>
      <hr/>
      <div className="row">
          <div className="col-md-3">
              <ClientData
                  id={id}
              />
          </div>
          <div className="col-md-9">
              <Query query={GET_PRODUCTS} variables={{stock: true}}>
                  {({ loading, err, data }) => { 
                      if(loading) return (
                        <div className="sk-folding-cube">
                            <div className="sk-cube1 sk-cube"></div>
                            <div className="sk-cube2 sk-cube"></div>
                            <div className="sk-cube4 sk-cube"></div>
                            <div className="sk-cube3 sk-cube"></div>
                        </div>
                      )

                      if(err) return `Err ${err.message}`

                      console.log(data);

                      return (
                        <OrderContent 
                        products={data.getProducts} 
                        id={id} 
                        sellerID={sellerID}
                        >
                        </OrderContent>
                      )
                  }}
              </Query>
          </div>
      </div>
        
      </>
    )
  }
}

export default withRouter(NewOrder)
