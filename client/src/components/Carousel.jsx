import { Carousel } from 'antd';
import React from 'react';
import CarouselImages from './CarouselImage';
const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

function MyCarousel(props) {
let data= [];
data = props.data;
return (    
   
    
    
  <Carousel autoplay>
    
     <div>
        <CarouselImages props ={props.data[0]} ></CarouselImages>
    </div>
    <div>
        <CarouselImages props ={props.data[1]} ></CarouselImages>
    </div>
    <div>
        <CarouselImages props ={props.data[2]} ></CarouselImages>
    </div>
    <div>
        <CarouselImages props ={props.data[3]} ></CarouselImages>
    </div>
  </Carousel>
);
}
export default MyCarousel;