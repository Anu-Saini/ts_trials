import React from "react";
import MyCarousel from "../components/Carousel";
import { QUERY_PROFILES } from "../queries/AnimalQuery";

import { useQuery } from "@apollo/client";
import { CAROUSAL_LIMIT } from "../utils/Constants";
import MyCard from "../components/Card";

const GuessGame = () => {
  const { loading, data } = useQuery(QUERY_PROFILES);
  const profiles = data || [];
  var randomAnimals = [];
  if (!loading) {
    
    
    let len = profiles.animals.length;
   
    let previousIndex = -1;
    while (randomAnimals.length < 8) {
      const randomElement = Math.floor(Math.random() * len);
      if (previousIndex === randomElement) {
        continue;
      }
      randomAnimals.push(profiles.animals[randomElement]);
      previousIndex = randomElement;
    }}
  
 
return(
 <main>
        <div className="flex-row justify-center cardstack">
          <div className="col-12 col-md-10 my-3 cardrow">
            {loading ? (
              <div>Loading...</div>
            ) : randomAnimals.map(animals =>{
             return (
                <MyCard data={animals}></MyCard>
              )
            }) }
          </div>
        </div>
      </main>
)
  };
  

export default GuessGame;
