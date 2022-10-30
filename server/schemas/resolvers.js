const { AuthenticationError } = require("apollo-server-express");
const { Animal, Class, User } = require("../models");
const { signToken } = require("../utils/auth");
const bcrypt = require('bcrypt');

const resolvers = {
  Query: {
    classes: async () => {
      return Class.find({}).populate("animals");
    },
    class: async (parent, { classId }) => {
      return Class.findOne({ _id: classId }).populate("animals");
    },

    //by addingcontext to our query, we can retrive the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return Class.findOne({ _id: context.user_id });
      }
      throw new AuthenticationError("you need to be logged in!");
    },

    animals: async () => {
      return Animal.find();
    },

    animal: async (parent, { animalId }) => {
      return await Animal.find({ submitBy: animalId });
    },

    users: async () => {
      return User.find().populate('animals');
    },
    
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId }).populate('animals');
    },
  },

  Mutation: {
    addUser: async (parent, { userName, email, password }) => {
      //creating a user
      const user = await User.create({ userName, email, password });
      // To reduce friction for the user, we immediately sign a JSON Web Token and log the user in after they are created
      const token = signToken(user);
      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      
      // Look up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
      const user = await User.findOne({ email });
      // If there is no user with that email address, return an Authentication error stating so
      if (!user) {
        throw new AuthenticationError("No user find with this email found!");
      }
      // If there is a user found, execute the `isCorrectPassword` instance method and check if the correct password was 
      const correctPw = await bcrypt.compare(password,user.password); 
      console.log(correctPw)
        
      

      // If the password is incorrect, return an Authentication error stating so
      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }
      // If email and password are correct, sign user into the application with a JWT
      const token = signToken(user);

      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },

    addAnimal: async ( 
      parent,
      {
        animalName,
        othername,
        family,
        age,
        foods,
        population,
        location,
        description,
        image,
        classification,
        submitBy,
      },
      {
        context
      }
      
    ) => {
      const animal = await Animal.create({
        animalName,
        othername,
        family,
        age,
        foods,
        population,
        location,
        description,
        image,
        classification,
        submitBy,
        
      });
      
       const token = signToken(animal);
      console.log(animal)
      return { id: animal._id, animalName: animal.animalName};
    },
    
    // adding a thrid argument to the resolver to access data in our  'context'
    updateAnimal: async (
      parent,
      {
        animalId,
        animalName,
        othername,
        family,
        age,
        foods,
        population,
        location,
        description,
      },
      context
    ) => {
      // if context gas a user property that means the user executing this mutation has a valid JWT and is logged in
      if (context.user) {
        return Animal.findOneAndUpdate(
          { _id: animalId },
          {
            $addToSet: {
              animalName: animalName,
              othername: othername,
              family: family,
              age: age,
              foods: foods,
              population: population,
              location: location,
              description: description,
            },
          },
          {
            new: true,
            runvalidators: true,
          }
        );
      }

      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError("You need to be logged in!");
    },

    deleteAnimal: async (parent, {animalId  }) => {
      return Animal.findOneAndDelete({ _id: animalId});
    },

    
  },
};

module.exports = resolvers;