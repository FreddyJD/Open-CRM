import React, { Component } from 'react'

export default class SimpleProduct extends Component {
    render() {
    return (
        <>
        <div className="border mb-4 p-4">
        <p className="card-text font-weight-bold">
                Name:  
                <span className="font-weight-normal">
                     {this.props.product.name}
                </span>
            </p>

            <p className="card-text font-weight-bold">
                Quantity:  
                <span className="font-weight-normal">
                     {this.props.quantity}
                </span>
            </p>

            <p className="card-text font-weight-bold">
                Unit Price:
                <span className="font-weight-normal">
                     ${this.props.product.price}
                </span>
            </p>
        </div>
        </>
    );
  }
}