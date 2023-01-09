import React from 'react';

const AdvertiseCard = ({ i }) => {
    
    return (
        <div id={`#item${i+1}`} className="carousel-item w-full">
        <img src="https://placeimg.com/800/200/arch" className="w-full" />
      </div> 
    );
};

export default AdvertiseCard;