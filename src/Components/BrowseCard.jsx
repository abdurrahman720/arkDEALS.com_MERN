import React from "react";
import { useNavigate } from "react-router-dom";
import { TiTick } from 'react-icons/ti';

const BrowseCard = ({ product }) => {
  const navigate = useNavigate()

  const {
    _id,
    sellerName,
    sellerEmail,
    sellerLocation,
    categoryName,
    productName,
    brand,
    resalePrice,
    originalPrice,
    yearOfPurchase,
    condition,
    productImage,
   verified,
      timeOfPost,
  } = product;



  return (
    <div className="card  bg-base-200 m-2 shadow-xl">
      <figure>
        <img className="w-full h-56" src={productImage} alt="Laptop" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {productName}
          <div className="badge badge-secondary">${resalePrice}</div>
        </h2>
        <div className="font-custom2">
        <p className="text-lg font-bold text-center">Seller: {sellerName}
        {
          verified===true && <div className="badge">
            <TiTick></TiTick>
          </div>
        }
      </p>
          <p>Location: {sellerLocation}</p>
          <p>Original Price: ${originalPrice}</p>
          <p>Year of Purchase: {yearOfPurchase}</p>
        </div>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{brand}</div>
          <div className="badge badge-outline">{categoryName}</div>
          <div className="badge badge-outline">{condition}</div>

          <div className="badge badge-outline">{timeOfPost}</div>
        </div>
        <div className="card-actions justify-center mt-2">
          <button onClick={()=>navigate(`/browse/product/${_id}`)} className="btn btn-outline btn-primary">View Item</button>
        </div>
      </div>
    </div>
  );
};

export default BrowseCard;
