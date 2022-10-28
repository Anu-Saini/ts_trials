import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
query 
    Animals {
  animals {
    _id
    animalName
    otherName
    class
    family
    age
    foods
    population
    image
    threats
    location
    description
    submitBy {
      _id
      userName
      email
      password
    }
    submitOn
  }
}
`;

export const LOGIN_QUERY = gql`
mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`;

export const NEW_USER = gql`
mutation Mutation($userName: String!, $email: String!, $password: String!) {
  addUser(userName: $userName, email: $email, password: $password) {
    user {
      _id 
    }
  }
}`;