import gql from 'graphql-tag';
export const NEW_CLIENT = gql`
mutation createClient($input: ClientInput){
    createClient(input: $input){
      id
      name
      lastname
    }
}
`;


export const UPDATE_CLIENT = gql`
mutation updateMyClient($input : ClientInput) {
  updateClient(input: $input) {
    id
    name
    lastname
    emails {
      email
    }
    company
    type
  }
}
`;

export const DELETE_CLIENT = gql`
  mutation deleteUserByID($id: ID!){
  deleteClient(id: $id)
}
`;

export const CREATE_PRODUCT = gql`
mutation createNewProduct($input : ProductInput){
  createProduct(input: $input) {
    name
    price
    stock
  }
}
`

export const DELETE_PRODUCT = gql`
mutation REMOVE_PRODUCT($id : ID!) {
  deleteProduct(id: $id) 
}
`


export const UPDATE_PRODUCT = gql`
mutation updateMyItem($input: ProductInput) {
  updateProduct(input: $input) {
    name
    price
    stock
  }
}
`
export const CREATE_ORDER = gql`
  mutation createOrder($input: OrderInput) {
  createOrder(input: $input) {
    id
  }
}
`

export const UPDATE_STATUS = gql`
mutation updateStatus($input: OrderInput) {
  updateStatus(input: $input)
}`

export const CREATE_USER = gql`
mutation createUser($user: String!, $password: String!){
  createUser(user: $user, password: $password) 
}
`

export const AUTH_USER = gql`
mutation authUser($user: String!, $password: String!){
  authUser(user: $user, password: $password){
    token
  } 
}
`