import React, { Component } from 'react';
import {CREATE_PRODUCT} from '../../queries/mutations';
import { Mutation } from 'react-apollo'

const initialState = { 
    name: '',
    price: '',
    stock: ''

}

export default class NewProduct extends Component {

    state = { 
        ...initialState
    }

    cleanState = () => { 
        this.setState({
            ...initialState
        })
    }

    updateState = e => { 
        const {name, value} = e.target;
        this.setState({
            [name] : value
        })
    }

    validateForm = () => { 
        const {name, price, stock} = this.state;
        const notValid = !name || !price || !stock;
        return notValid
    }
    createNewProduct = (e, newProduct) => {
        e.preventDefault();

        // Store it in a Database 
        newProduct().then(data => { 
            this.cleanState();
            
            // We need to redirect to all the products 
            this.props.history.push('/products')
        })

    }
	render() {
        const { name, price, stock } = this.state 

        const input = { 
            name,
            price: Number(price),
            stock: Number(stock)
        }

		return (
            <>
            <h1 className="text-center mb-5"> New Product </h1>
            <div className="row justify-content-center">
			<Mutation 
            mutation={CREATE_PRODUCT}
            variables={{input}}
            >
            {(newProduct, {loading, err, data}) => { 

            return (
                <form 
                className="col-md-8"
                onSubmit={e => this.createNewProduct(e, newProduct)}
                >
				<div className="form-group">
					<label>Name:</label>
					<input 
                    type="text" 
                    name="name"
                    className="form-control" 
                    placeholder="Name of the product" 
                    onChange={this.updateState}
                    />
				</div>
				<div className="form-group">
					<label>Price:</label>
					<div className="input-group">
						<div className="input-group-prepend">
							<div className="input-group-text">$</div>
						</div>
						<input 
                        type="number" 
                        name="price" 
                        className="form-control" 
                        placeholder="Price of the product" 
                        onChange={this.updateState}
                        />
					</div>
				</div>
				<div className="form-group">
					<label>Stock:</label>
					<input 
                    type="number" 
                    name="stock" 
                    className="form-control" 
                    placeholder="Stock of the product" 
                    onChange={this.updateState}
                    />
				</div>
				<button 
                disabled={ this.validateForm() }
                type="submit" 
                className="btn btn-success float-right">
					Create Product
				</button>
			</form>
                )

            }}
            </Mutation>
            </div>
            </>
		);
	}
}
