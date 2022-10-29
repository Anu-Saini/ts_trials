const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Class {
  _id :ID
 className: String
 about: String
 animals : [Animal]!
}

type Animal {
  _id: ID
  animalName: String
  otherName: String
  classification: String
  family: String
  age: String
  foods: String
  population : String
  image: [String]!
  threats: String
  location : [String]!
  locationmap: String
  description: String
  submitBy: String
  submitOn: String
  }

type User {
  _id: ID
 userName: String
 email: String
  password: String
  animals: [Animal]!
}

type Auth {
  token: ID!
  user: User
}

 type Query {
    classes: [Class]
    class(classId: ID!): Class
    animals: [Animal]
    animal(animalId: ID!): Animal
    users: [User]
    user(userId: ID!): User
    me: User
   }

   type Mutation {
    addAnimal(animalName: String!, otherName: String!, classification: String!, family: String!, age: Int!, foods: String! , population: String! , image: [String!],  threats: String! , location: [String!] ,description: String!, submitBy: String! ): Animal
    updateAnimal(id:ID!, otherName: String!, class:String!, family: String!, age: Int!, foods: String! , population: String! , image: [String!],  threats: String! , location: [String!] ,  locationmap: String!, description: String!, submitBy: String!  ): Animal
        
    addUser(userName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    updateUser(userName: String!, email: String!, password: String!): Auth
    deleteUser(userName: String!, email: String!, password: String!): Auth
          }`;

module.exports = typeDefs;


