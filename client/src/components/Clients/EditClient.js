import React, { Component } from 'react'
import { CLIENT_QUERY } from '../../queries';
import { Query } from 'react-apollo';
import FormEditClient from './FormEditClient'

export default class EditClient extends Component {
  state = {}
  render() {

     // Need to - Take ID 
     const { id } = this.props.match.params

     console.log(id); 


    return (
        <>
        <h2 className="text-center">
            Edit Client
        </h2>

        <div className="row justify-content-center">

        <Query query={CLIENT_QUERY} variables={{id}}> 
          {({ loading, err, data, refetch }) => { 
            if(loading) return 'Loading...';
            if(err) return `We got an error ${err.message}`;
            

            return (
              <FormEditClient 
                client={data.getClient}
                refetch={refetch}

              />
            )
          }}
        </Query>
        </div>
        </>
    )
  }
}
