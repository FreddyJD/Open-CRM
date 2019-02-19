import gql from 'graphql-tag';

export const CLIENTS_QUERY =  gql`{
    getClients {
      id
      name
      lastname
      company
    }
}`

export const CLIENT_QUERY = gql`
query getThisClient($id: ID) {
  getClient(id: $id) {
    id
    name
    lastname
    company
    age
    type
    emails { 
      email
    }
  }
}
`