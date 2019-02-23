import React from 'react';
import { Query } from 'react-apollo';
import { TOP_SELLERS } from '../../queries'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';


const Sellers = () => {
    return (
        <>
        <Query query={TOP_SELLERS} > 
        {({ loading, err, data }) => { 
            if(loading) return `Loading...`;
            if(err) return `err ${err.message}`;

            console.log(data);

            const topSellerChart = []; 

            data.topSellers.map((seller, index) => {
                topSellerChart[index] = {
                    ...seller.seller[0],
                    total: seller.total
                }
            });

            return (
                <>
                	<BarChart
                    width={1000}
                    className="text-center" 
                    height={300} 
                    data={topSellerChart}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}
                    >

                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Bar dataKey="total" fill="#F57992" />
                    
                    </BarChart>
                </>
            )
        }}
        
        </Query>
        </>

    );
};

export default Sellers;