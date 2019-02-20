import React, { Component } from 'react';
import Select from 'react-select';
import Animated from 'react-select/lib/animated'
import Summery from './Summery';
import GenerateOrder from './GenerateOrder';
import Error from './Error';

export default class OrderContent extends Component {

    state = { 
        products: [],
        total: 0

    }

    updateTotal = () => {
       // We need to read the state of the products
      const products = this.state.products
      // console.log(quantity, index)
      
      // When products are in 0 
      if(products.length === 0) {
        this.setState({
          total: 0 
        });
        return
      }

      let newTotal = 0 


      // math op (quantity x price)
      products.map(product => newTotal += (product.quantity * product.price));

      this.setState({
        total: newTotal
      })


    }

    selectProduct = (products) => { 
        // console.log(products)
        this.setState({
            products
        })
    }

    updateQuantity = (quantity, index) => { 

      // We need to read the state of the products
      const products = this.state.products

      // Add the quantity 
      products[index].quantity = Number(quantity)


      this.setState({
        products
      }, () => { 
        this.updateTotal();
      })
    }

    removeProduct = (id) => {
      const products = this.state.products;

      const remainderProduct = products.filter(product => product.id !== id)

      this.setState({
        products: remainderProduct
      }, () => { 
        this.updateTotal();
      })

    }

  render() {

    const message = (this.state.total < 0) ? <Error error="🚫 You can't go below 0 " />: ''; 

    return (
      
      <>
      <h2 className="text-center mb-3"> Select Products </h2>
        <Select 
        onChange={this.selectProduct}
        options={this.props.products}
        isMulti={true}
        components={Animated()} 
        placeholder={`Select products`}
        getOptionValue={(options) => 
            options.id
        }
        getOptionLabel={(options) => 
            options.name
        }
        value={this.state.products}
         />

         <Summery 
        products={this.state.products}
        updateQuantity={this.updateQuantity}
        removeProduct={this.removeProduct}
         />
      {message}

         <p className="float-right mt-3">
           Total: 
           <span className="font-weightnormal"> ${this.state.total} </span>
         </p> 
         <GenerateOrder 
           products={this.state.products}
           total={this.state.total}
           clientId={this.props.id}
         />
      </>
    )
  }
}
