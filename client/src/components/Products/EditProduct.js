import React, { Component } from 'react';
import { Query } from 'react-apollo'; 
import {GET_PRODUCT } from '../../queries/index';
import FormEditProduct from './FormEditProduct'

export default class EditProduct extends Component {
  render() {


    // Take the ID we need to edit 
    const { id } = this.props.match.params; 

    return (
      <div>

      <h1 className="text-center">Edit Product</h1>
      <div className="row justify-content-center">
      <Query query={GET_PRODUCT} variables={{id}}>

      {( {loading, err, data, refetch}) => { 
        if(loading) return "Loading";
        if (err) return `Err ${err.message}`;
        return(
          <FormEditProduct product={data} id={id} refetch={refetch} />
        )
      }}

      </Query>

      </div>
        
      </div>
    )
  }
}
