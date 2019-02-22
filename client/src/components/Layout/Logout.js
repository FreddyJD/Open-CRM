import React from 'react'; 
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';


const logoutUser = (client, history) => { 
    localStorage.removeItem('token', '');

    // Remove apollo storage 
    client.resetStore(); 

    history.push('/login')



}

const Logout = ({history}) => (
    <ApolloConsumer>
    { client => {
        return (

        <button 
        onClick={() => logoutUser(client, history)}
        className="btn btn-light ml-md-2 mt-2 mt-md-0">
            Logout
        </button>

        )
    }}

    </ApolloConsumer>
    )

export default withRouter(Logout);