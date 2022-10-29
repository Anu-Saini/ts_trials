import React from "react";
import "./Carousel.css";

function CarouselImages(props) {
  console.log(props);

  // const src = `../assets/elephant.jpg`;
  return (
    <>
      <div class="container">
      <div className="imgbox">
        <img src={props.props.image[0]} alt={props.props.animalName} style={{width:'850px', height:'500px'}} />
        </div>
        <div className="aboutbox">
          <div className="centered">{props.props.animalName}</div>
        <div className="description">{props.props.description}</div>    
        </div>
      </div>
    </>
  );
}

export default CarouselImages;
