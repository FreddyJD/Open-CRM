import React from 'react';
import { GET_PRODUCT } from '../../queries';
import { Query, Mutation } from 'react-apollo';
import SimpleProduct from './SimpleProduct';
import {UPDATE_STATUS} from '../../queries/mutations'

const Order = (props) => {

    const {order} = props;

    const {status} = order

    let orderBorder; 
    if(status === 'PENDING') {
        orderBorder = 'border-light'
    }

    else if(status === 'CANCELLED') {
        orderBorder = 'border-danger'
    }

    else if(status === 'COMPLETED') {
        orderBorder = 'border-success'
    }

    const {id} = order

    return (
        <>
<div className="col-md-4">
            <div className={`card mb-3 ${orderBorder}`} >
                <div className="card-body">
                    <p className="card-text font-weight-bold ">Status:
                    <Mutation mutation={UPDATE_STATUS}> 
                        {updateStatus => (
                            <select 
                            onChange={e => {
                                const input = {
                                    id,
                                    order: order.order, 
                                    date: order.date,
                                    total: order.total,
                                    client: props.client,
                                    status: e.target.value
                                }
                                updateStatus({
                                    variables: {input}
                                })
                            }}
                            value={order.status}
                            className="form-control my-3">
                                    <option value="PENDING">Pending</option>
                                    <option value="COMPLETED">Completed</option>
                                    <option value="CANCELLED">Cancelled</option>
                            </select>

                        )}
                            </Mutation>
                    </p> 
                    <p className="card-text font-weight-bold">Order ID: <br/> 
                        <span className="font-weight-normal">{order.id}</span>
                    </p> 
                    <p className="card-text font-weight-bold">Day ordered:  <br/>
                        <span className="font-weight-normal">{order.date}</span>
                    </p>
                    <p className="card-text font-weight-bold">Total: <br/>
                        <span className="font-weight-normal">${order.total}</span>
                    </p>

                    <h3 className="card-text text-center mb-3">Items</h3>
                    {order.order.map((item, index) => {

                        console.log(order)
                        {/* console.log(data) */}
                        console.log(item)


                        const {id} = item

                        return (
                            <Query key={order.id + index} query={GET_PRODUCT} variables={{id}}>
                            {({loading, err, data}) => {
                                if(loading) return 'loading'
                                if(err) return `err ${err.message}`
                                return ( 
                                    <SimpleProduct 

                                        product={data.getProduct}
                                        quantity={item.quantity}
                                        key={item.key}
                                    />
                                )
                            }}
                             </Query>
                        )
                    })}

                </div>
            </div>
        </div>
        </>
    );
};

export default Order;