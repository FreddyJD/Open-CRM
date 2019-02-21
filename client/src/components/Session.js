import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { CURRENT_USER } from '../queries/index';

const Session = Component => props => (
    <Query query={CURRENT_USER} >
        {({loading, err, data, refetch}) => { 
            return (
                <>
                <Component {...props}  session={data} refetch={refetch} />
                </>
            )
        }}
    </Query>
);

export default Session;