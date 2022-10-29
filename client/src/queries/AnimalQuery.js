import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
query 
    Animals {
  animals {
    _id
    animalName
    otherName
    classification
    family
    age
    foods
    population
    image
    threats
    location
    description
    submitBy 
    submitOn
  }
}
`;

export const LOGIN_QUERY = gql`
mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user{
      _id
      userName
    }
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

export const NEW_ANIMAL = gql`
mutation Mutation($animalName: String!, $otherName: String!, $classification: String!, $family: String!, $age: Int!, $foods: String!, $population: String!, $threats: String!, $description: String!, $submitBy: String!, $image: [String!], $location: [String!]) {
  addAnimal(animalName: $animalName, otherName: $otherName, classification: $classification, family: $family, age: $age, foods: $foods, population: $population, threats: $threats,  description: $description, submitBy: $submitBy, image: $image, location: $location) {
    _id
    animalName
  }
}`;