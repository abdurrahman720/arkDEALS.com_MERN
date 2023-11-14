import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TiTick } from 'react-icons/ti';

const AdvertisementCard = ({ ad }) => {
  const { sID, next, prev, product, verified } = ad;

  const navigate = useNavigate()
  const {_id,productImage, productName, sellerName, sellerLocation, brand, categoryName, resalePrice} = product;
    return (
        <div id={`slide${sID}`} className="carousel-item relative w-full">
        <div className="card mx-auto md:card-side bg-base-200 shadow-2xl  m-10">
    <figure><img className='' src={productImage} alt="Album"/></figure>
    <div className="card-body w-full">
            <h2 className="card-title text-3xl">{productName}
              <div className="badge badge-secondary">${resalePrice }</div>
            </h2>
           
            <p className="font-custom2">{categoryName}
              <br />
              Brand: {brand}
              <br />
              Seller: {sellerName} {
          verified===true && <div className="badge">
            <TiTick></TiTick>
          </div>
        }
              <br />
              Location: {sellerLocation}
            </p>
         
      <div className="card-actions justify-end">
        <button onClick={()=>navigate(`/browse/product/${_id}`)} className="btn btn-primary">Details</button>
      </div>
    </div>
  </div>
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a href={`#slide${prev}`} className="btn btn-ghost btn-circle">❮</a> 
        <a href={`#slide${next}`} className="btn btn-ghost btn-circle">❯</a>
      </div>
    </div> 
    );
};

export default AdvertisementCard;