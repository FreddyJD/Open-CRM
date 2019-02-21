import React, {Component} from 'react';
import { Query } from 'react-apollo'; 
import {CURRENT_USER} from '../queries'

const Session = Component => props => (
    <Query query={CURRENT_USER}>
        {({loading, err, data, refetch}) => { 
            return (
                <Component {...props} refetch={refetch} session={data} />
            )
        }}
    </Query>
);

export default Session;