import React from 'react';

const AdvertisementCard = ({ product }) => {
    const {sID, next, prev} = product;
    return (
        <div id={`slide${sID}`} className="carousel-item relative w-full">
        <div className="card mx-auto md:card-side bg-base-200 shadow-xl mt-10">
    <figure><img src="https://placeimg.com/400/400/arch" alt="Album"/></figure>
    <div className="card-body">
      <h2 className="card-title">New album is released!</h2>
      <p>Click the button to listen on Spotiwhy app.</p>
      <div className="card-actions justify-end">
        <button className="btn btn-primary">Listen</button>
      </div>
    </div>
  </div>
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a href={`#slide${prev}`} className="btn btn-circle">❮</a> 
        <a href={`#slide${next}`} className="btn btn-circle">❯</a>
      </div>
    </div> 
    );
};

export default AdvertisementCard;