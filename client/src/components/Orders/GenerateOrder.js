import React from 'react';
import {Mutation } from 'react-apollo';

import {CREATE_ORDER} from '../../queries/mutations'
import { withRouter } from 'react-router-dom';


const validateOrder = (props) => {
    let notValid = !props.products || props.total <= 0;

    return notValid;
}

const GenerateOrder = (props) => {

    return (
        <Mutation 
        mutation={CREATE_ORDER}
        onCompleted={ () => props.history.push('/clients')}
        >
            {createOrder => (
                <button 
                disabled={validateOrder(props)}
                type="button" 
                className="btn btn-warning mt-4"
                onClick={e => {
                    const productsInput = props.products.map(({name, price, stock, ...object}) => object);
                    
                    const input = {
                        order: productsInput,
                        total: props.total,
                        client: props.clientId
                    }
                    // console.log(input);
                    createOrder({
                        variables: {
                            input
                        }
                    })
                }}>
                    Generate Order 
                </button>
            )}
        </Mutation>
    );
};

export default withRouter(GenerateOrder);