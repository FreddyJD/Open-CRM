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



export const GET_PRODUCT = gql`
query getThisProduct($id: ID!) { 
  getProduct(id: $id) {
    name
    stock
    price
  }
}`
export const GET_PRODUCTS = gql`

  query GET_PRODUCTS($limit: Int, $offset:Int, $stock: Boolean) {
    getProducts(limit: $limit, offset: $offset, stock: $stock) {
      id
      name
      price
    stock
  }
  totalProducts 
}

`

export const GET_ORDERS = gql`
query getOrders($client: String) {
  getOrders(client: $client) {
    id
    total
    date
    status
    order {
      id
      quantity
    }
  }
}`