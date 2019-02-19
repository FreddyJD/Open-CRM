import gql from 'graphql-tag';

export const CLIENTS_QUERY =  gql`
query getClients($limit: Int, $offset: Int){
  getClients(limit: $limit, offset: $offset) {
      id
      name
      lastname
      company
    }
    totalClients
  }
`

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