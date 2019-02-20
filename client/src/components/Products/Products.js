import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo'; 
import { GET_PRODUCTS } from '../../queries';
import { Link } from 'react-router-dom';
import { DELETE_PRODUCT } from '../../queries/mutations';
import Success from '../Alerts/success';
import Paginator from '../Pagination';


export default class Products extends Component {
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


  render() {

    const {alert: {show, message}} = this.state;

    let alert = (show) ? <Success message={message} /> : '';


    return (
        <>
        <h1 className="text-center mb-5">Products </h1>

            {alert}
            <div>
                <Query query={GET_PRODUCTS} pollInterval={1000} variables={{limit: this.limit, offset: this.state.page.offset}}>
                    {({ loading, err, data, startPolling, stopPolling }) => {
                        if (loading) return "Loading...";
                        if (err) return `Error ${err.message}`;
                        console.log(data.getProducts);
                        return (
                            <>
                            <table className="table">
                                <thead>
                                    <tr className="table-primary">
                                        <th scope="col">Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Existing Stock</th>
                                        <th scope="col">Remove</th>
                                        <th scope="col">Edit</th>
                                    </tr>
                                </thead>
                            
                            <tbody>
                                {data.getProducts.map(item => { 
                                    const {id} = item
                                    return (

                                    <tr key={id}>

                                        <td>{item.name}</td> 
                                        <td>{item.price}</td> 
                                        <td>{item.stock}</td> 
                                        <td>

                                        <Mutation 
                                        mutation={DELETE_PRODUCT}
                                        onCompleted={(data) => {
                                            this.setState({
                                                alert: {
                                                    show: true,
                                                    message: data.deleteProduct
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
                                            {deleteProduct => (

                                            <button 
                                            onClick={() => {
                                                if(window.confirm('Are you sure you want to delete this product?')) { 
                                                deleteProduct({
                                                    variables: {id}
                                                })
                                                }
                                            }}
                                            type="button"
                                            className="btn btn-danger">
                                            &times; Remove  
                                            </button>
                                            )}
                                        
                                        
                                         </Mutation>

                                        </td> 
                                        <td>
                                        <Link to={`/product/edit/${id}`} className="btn btn-success">
                                            Edit product 
                                        </Link>


                                            </td> 
                                    
                                    </tr>
                                    )

                                })}
                            </tbody>
                            </table>
                            <Paginator newest={this.state.page.current}
                            totalClients={data.totalClients}
                            paginatorLimit={this.limit}
                            nextPage={this.nextPage}
                            lastPage={this.priorPage}
               />
               </>
            )


                 }}
                </Query>
            </div>
      </>
    )
  }
}
