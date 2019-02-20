import React from 'react';
import { Query } from 'react-apollo'
import { CLIENT_QUERY } from '../../queries'

const ClientData = ({id}) => {
    return (
        <>
        <h2 className="text-center mb-3">
            Client Summery
        </h2>
        <Query query={CLIENT_QUERY} variables={{id}} pollInterval={500}>
        {({
            loading, err, data, startPolling, stopPolling 
        }) => { 
            if(loading) return 'Loading...';
            if(err) return `Error ${err.message}`
            console.log(data);

            const { id, name, lastname, company, age, type, emails } = data.getClient;

            return (
                <ul className="list-unstyled my5">

                    <li className="border font-weight-bold p-2">Name: 
                    <span className="font-weight-normal"> {name}</span>
                    </li>

                    <li className="border font-weight-bold p-2">Lastname: 
                    <span className="font-weight-normal"> {lastname}</span>
                    </li>

                    <li className="border font-weight-bold p-2">Company: 
                    <span className="font-weight-normal"> {company}</span>
                    </li>

                    <li className="border font-weight-bold p-2">Age: 
                    <span className="font-weight-normal"> {age}</span>
                    </li>

                    <li className="border font-weight-bold p-2">Type: 
                    <span className="font-weight-normal"> {type}</span>
                    </li>

                    <li className="border font-weight-bold p-2">Emails: <br/>
                    <span className="font-weight-normal"> {emails.map(email => ` ${email.email}`)}</span>
                    </li>
                </ul>
            )
        }}

        </Query>
        </>
    );
};

export default ClientData;