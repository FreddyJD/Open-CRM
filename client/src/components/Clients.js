import React from 'react';
import { Query } from 'react-apollo'; 
import { CLIENTS_QUERY } from '../queries';


export default function Clients() {
  return (
      <Query query={CLIENTS_QUERY} > 
      {({ loading, err, data }) => {
          if(loading) return "Loading...";
          if(err) return `Error ${err.message}`;
            console.log(data.getClients);
          return(
              <>
              <h2 className="text-center mt-4"> List of clients </h2>
              <ul className="list-group mt-4">
                  {data.getClients.map(item => (
                      <li key={item.id} className="list-group-item">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-md-8 d-flex justify-content-between align-items-center">
                                {item.name} {item.lastname} - {item.company}
                            </div>
                            <div className="col-md-8 d-flex justify-content-end">
                                <a className="btn btn-success d-block d-md-inline-block">
                                    Edit Client
                                </a>
                            </div>
                        </div>
                      </li>
                  ))}
              </ul>
            </>
          )
      }}
      </Query>
  )
}
