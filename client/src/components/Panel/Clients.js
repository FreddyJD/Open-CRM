import React from 'react';
import { Query } from 'react-apollo';
import { TOP_CLIENTS } from '../../queries'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';


const Clients = () => {
    return (
        <>
        <Query query={TOP_CLIENTS} > 
        {({ loading, err, data }) => { 
            if(loading) return `Loading...`;
            if(err) return `err ${err.message}`;

            console.log(data);

            const topClientsChart = []; 

            data.topClients.map((order, index) => {
                topClientsChart[index] = {
                    ...order.client[0],
                    total: order.total
                }
            });
            console.log(topClientsChart)
            return (
                <>
                	<BarChart
                    width={1000}
                    className="text-center" 
                    height={300} 
                    data={topClientsChart}
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

export default Clients;