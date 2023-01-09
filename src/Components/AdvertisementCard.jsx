import React from 'react';

const AdvertisementCard = ({ ad }) => {
  const { sID, next, prev, product } = ad;
  const {productImage, productName, sellerName, sellerlocation} = product;
    return (
        <div id={`slide${sID}`} className="carousel-item relative w-full">
        <div className="card mx-auto md:card-side bg-base-200 shadow-xl mt-10">
    <figure><img src={productImage} alt="Album"/></figure>
    <div className="card-body">
            <h2 className="card-title">{productName }</h2>
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