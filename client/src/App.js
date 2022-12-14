// import logo from "./logo.svg";
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { Routes, Route } from "react-router-dom";

import "./App.css";
import RegisterUser from "./pages/RegisterUser";
import LoginPage from "./pages/LoginPage";
import GuessGame from "./pages/Guess";
import Locations from "./pages/Locations";
import Navbar from './components/Navbar';
import HomePage from "./pages/Home";
import AllAnimals from "./pages/AllAnimals/Animal";
import User from "./pages/User/User";
import { apolloClient } from "./ApolloClient";
import Donate from "./pages/Donation";


const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});



function App() {
  return (
    <>
     <ApolloProvider client={apolloClient}>
    <Navbar/> 
    <Routes>    
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={<RegisterUser></RegisterUser>} />
        <Route path="/login" element={<LoginPage></LoginPage>} />  
        <Route path="/locations" element={<Locations></Locations>} />  
        <Route path="/user" element={<User/>} />  
        <Route path="/guess" element={<GuessGame/>} /> 
        <Route path="/allanimals" element={<AllAnimals/>} />  
        <Route path="/donate" element={<Donate/>} />  
    </Routes>
    </ApolloProvider>
    </>
  );
}

export default App;
