import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo'; 
import { CLIENTS_QUERY } from '../../queries';
import { DELETE_CLIENT } from '../../queries/mutations';
import { Link } from 'react-router-dom';
import Paginator from '../Pagination'
import Success from '../Alerts/success';


class Clients extends Component {

    limit = 3; 

    state = {
        page: {
            offset: 0,
            current: 1
        },
        alert : {
            show: false, 
            message: ''
        }
    }

    priorPage = () => {
        this.setState({
            page: {
                offset: this.state.page.offset - this.limit,
                current: this.state.page.current - 1
            }
        })

    }

    nextPage = () => { 
        this.setState({
            page: {
                offset: this.state.page.offset + this.limit,
                current: this.state.page.current + 1
            }
        })


    }
    
    render(){
        const {alert: {show, message}} = this.state;

        let alert = (show) ? <Success message={message} /> : '';

        return (

        <Query query={CLIENTS_QUERY} pollInterval={1000} variables={{limit: this.limit, offset: this.state.page.offset}}> 
      {({ loading, err, data, startPolling, stopPolling }) => {
          if(loading) return "Loading...";
          if(err) return `Error ${err.message}`;
            console.log(data.getClients);
          return(
              <>
              <h2 className="text-center"> List of clients </h2>
                      {alert}
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

                            <Link to={`/order/new/${id}`}
                            
                            className="btn btn-warning d-block d-md-inline-block mr-2">
                           New Order

                            </Link>
                            
                            <Mutation mutation={DELETE_CLIENT}
                            onCompleted={(data) => {
                                            this.setState({
                                                alert: {
                                                    show: true,
                                                    message: data.deleteClient
                                                }
                                            }, () => {
                                                setTimeout(() => {
                                                    this.setState({
                                                        alert: {
                                                            show: false,
                                                            message: ''
                                                        }
                                                    })
                                                }, 3000)
                                            })
                                        }}
                                >

                            { deleteClient => (

                            <button 
                            className="btn btn-danger d-block d-md-inline-block mr-2" 
                            type="button"
                            onClick={ () => {
                                const windowConfirm = window.confirm(`Do you really want to remove ${item.name} from ${item.company} ?`)  
                                if (windowConfirm === true) { 
                                    deleteClient({
                                        variables: {id}
                                    })
                                }

                        
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
              <Paginator newest={this.state.page.current}
                total={data.totalClients}
                paginatorLimit={this.limit}
                nextPage={this.nextPage}
                lastPage={this.priorPage}
               />
            </>
          )
      }}
      </Query>
  )
}
}
export default Clients