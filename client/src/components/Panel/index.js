import React from 'react';
import Clients from './Clients'
import Sellers from './Sellers';


const Panel = () => {
    return (
        <>
        <h1 className="text-center my-5">Top Clients</h1>
            <Clients/>
        <h1 className="text-center my-5">Top Sellers</h1>
            <Sellers/>
        </>
    );
};

export default Panel;
