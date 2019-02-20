import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import {UPDATE_PRODUCT} from '../../queries/mutations';
import { withRouter } from 'react-router-dom'; 

const initialState = { 
    name: '',
    price: '',
    stock: ''

};

class FormEditProduct extends Component {
    cleanState = () => { 
        this.setState({
            ...initialState
        })
    };
    
    updateState = e => { 
        const {name, value} = e.target;
        this.setState({
            [name] : value
        })
    };
    
    validateForm = () => { 
        const {name, price, stock} = this.state;
        const notValid = !name || !price || !stock;
        return notValid
    };

    updateProductForm = (e, updateProduct) => {
        e.preventDefault();

        updateProduct().then(data => {
            this.setState({
                ...initialState
            })
        });

    }
    state = {
        ... this.props.product.getProduct
     }
  render() {
    const { name, price, stock } = this.state 
    const { id } = this.props
    const input = { 
        id,
        name,
        price: Number(price),
        stock: Number(stock)
    }

    return (
      <div>
      <Mutation
      mutation={UPDATE_PRODUCT}
      variables={{input}}
      key={id}
      onCompleted={() => this.props.refetch().then(() => {
          this.props.history.push('/products')
      })}

      >
      {( updateProduct, {loading, err, data}) => {
          return(

           <form className="col-md-8" 
           onSubmit={e => this.updateProductForm(e, updateProduct)}>
                        <div className="form-group">
                            <label>Name :</label>
                            <input 
                                onChange={this.updateState}
                                type="text"
                                name="name" 
                                className="form-control" 
                                placeholder="Name of the product"
                                value={name}

                            />
                        </div>
                        <div className="form-group">
                            <label>Price :</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">$</div>
                                </div>
                                <input 
                                    onChange={this.updateState}
                                    type="number" 
                                    name="price" 
                                    className="form-control" 
                                    placeholder="Precio of the Product"
                                
                                value={price}

                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Stock :</label>
                            <input 
                                onChange={this.updateState}
                                type="number" 
                                name="stock" 
                                className="form-control" 
                                placeholder="Stock of the product" 
                            
                                value={stock}

                            />
                        </div>
                        <button 
                            disabled={ this.validateForm() }
                            type="submit" 
                            className="btn btn-success float-right">
                                    Save Changes
                        </button>
                    </form>
                    
                    
          )
      }}
        </Mutation>
      </div>
    )
  }
}
export default withRouter(FormEditProduct)