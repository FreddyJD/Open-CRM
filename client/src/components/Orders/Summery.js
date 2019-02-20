import React from 'react';
import Product from './Product'

const Summery = (props) => {

    const products = props.products

    if(products.length === 0) return null;

    return (
        <>
        <h2 className="text-center mb-5 mt-5">Summery and Quantity</h2>
        <table className="table">
            <thead className="bg-success text-light">
                <tr className="font-weight-bold">
                    <th>Product</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Quantity</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => (
                    <Product 
                    product={product} 
                    key={product.id} 
                    id={product.id} 
                    index={index}
                    updateQuantity={props.updateQuantity}
                    removeProduct={props.removeProduct}
                    /> 
                ))}
            </tbody>
        </table>
        </>
    );
};

export default Summery;