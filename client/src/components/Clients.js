import React from 'react';
import { Query, Mutation } from 'react-apollo'; 
import { CLIENTS_QUERY } from '../queries';
import { DELETE_CLIENT } from '../queries/mutations';
import { Link } from 'react-router-dom';


export default function Clients() {
  return (
      <Query query={CLIENTS_QUERY} pollInterval={1000} > 
      {({ loading, err, data, startPolling, stopPolling }) => {
          if(loading) return "Loading...";
          if(err) return `Error ${err.message}`;
            console.log(data.getClients);
          return(
              <>
              <h2 className="text-center"> List of clients </h2>
              <ul className="list-group mt-4">
                  {data.getClients.map(item => {

                  const {id} = item;
                  return (
                  
                      <li key={item.id} className="list-group-item">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-md-8 d-flex justify-content-between align-items-left">
                                {item.name} {item.lastname} - {item.company}
                            </div>
                            <div className="col-md-4 d-flex justify-content-end">
                            <Mutation mutation={DELETE_CLIENT}>
                            { deleteClient => (

                            <button 
                            className="btn btn-danger d-block d-md-inline-block mr-2" 
                            type="button"
                            onClick={ () => {
                                deleteClient({
                                    variables: {id}
                                })
                            }}
                            >
                                &times; Delete Client 
                            </button>
                            )}
                            </Mutation>
                                <Link to={`/client/edit/${item.id}`} className="btn btn-success d-block d-md-inline-block">
                                    Edit Client
                                </Link>
                            </div>
                        </div>
                      </li>
                      )})}
              </ul>
            </>
          )
      }}
      </Query>
  )
}
