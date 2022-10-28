import React from "react";
import "./Carousel.css";

function CarouselImages(props) {
  console.log(props);

  const src = `../assets/elephant.jpg`;
  return (
    <>
      <div class="container">
        <img src={props.props.image[0]} />
        <div className="centered">{props.props.animalName}
        <div className="description">{props.props.description}</div>    
        </div>
      </div>
    </>
  );
}

export default CarouselImages;
