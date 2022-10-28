import React from 'react';
import './Card.css';


function MyCard(props) {
    var locations = props.data.location ? props.data.location.join(",") : "";
return(
<>
<div className="flip-card">
  <div className="flip-card-inner">
    <div className="flip-card-front">
      <img src={props.data.image[0]} alt={props.data.animalName} style={{width:'300px',height:'300px'}} />
    </div>
    <div className="flip-card-back">
      <h1>{props.data.animalName}</h1>
      <p>className: {props.data.class}</p>
      <p>Family: {props.data.family}</p>
      <p>Locations: {locations}</p>
      
    </div>
  </div>
</div>
</>
)
};
export default MyCard;