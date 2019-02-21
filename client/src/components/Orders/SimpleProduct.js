import React from 'react';

const SimpleProduct = ({quantity, product}) => {
    return (
        <>
        <div className="border mb-4 p-4">
        <p className="card-text font-weight-bold">
                Name:  <br/>
                <span className="font-weight-normal">
                     {product.name}
                </span>
            </p>

            <p className="card-text font-weight-bold">
                Quantity:  <br/>
                <span className="font-weight-normal">
                     {quantity}
                </span>
            </p>

            <p className="card-text font-weight-bold">
                Unit Price:  <br/>
                <span className="font-weight-normal">
                     ${product.price}
                </span>
            </p>
        </div>
        </>
    );
};

export default SimpleProduct;