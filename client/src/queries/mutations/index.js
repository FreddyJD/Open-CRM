import gql from 'graphql-tag';
export const NEW_CLIENT = gql`
mutation createClient($input: ClientInput){
    createClient(input: $input){
      id
      name
      lastname
    }
}
`


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
  `