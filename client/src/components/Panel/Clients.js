import React from 'react';
import { Query } from 'react-apollo';
import { TOP_CLIENTS } from '../../queries'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const data1 = [
    {name: 'Page A', pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];


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
                    <Bar dataKey="total" fill="#8884d8" />

                    </BarChart>
                </>
            )
        }}
        
        </Query>
        </>

    );
};

export default Clients;