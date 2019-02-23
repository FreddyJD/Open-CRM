import gql from 'graphql-tag';

export const CLIENTS_QUERY =  gql`
query getClients($limit: Int, $offset: Int, $seller: String){
  getClients(limit: $limit, offset: $offset, seller: $seller) {
      id
      name
      lastname
      company
    }
    totalClients(seller: $seller)
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

export const TOP_CLIENTS = gql`
query TOP_CLIENTS {
  topClients{
    total
    client {
      name
    }
  }
}`

export const TOP_SELLERS = gql`
query TOP_SELLERS {
  topSellers{
    total
    seller {
      name
    }
  }
}`


// users
export const CURRENT_USER = gql`
query getUser{
  getUser{
    id
    user
    name
    rol
  }
}
`