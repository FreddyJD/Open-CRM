import React from 'react';
import { Query } from 'react-apollo';
import { GET_ORDERS } from '../../queries';
import Order from './Order'

const ClientsOrders = (props) => {
    const client = props.match.params.id

    return (
        <>
            <h1 className="text-center mb-5">Orders</h1>
            <div className="row">

            <Query query={GET_ORDERS} variables={{client}} pollInterval={500}> 
            {({loading, err, data, startPolling, stopPolling}) => { 
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
                   data.getOrders.map(order => (
                       <Order 
                       key={order.id}
                       order={order}
                       client={client} />
                   ))
                )
            }}
            </Query>
            </div>
        </>
    );
};

export default ClientsOrders;