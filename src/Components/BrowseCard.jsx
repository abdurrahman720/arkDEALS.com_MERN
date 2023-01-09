import React from "react";

const BrowseCard = ({ product }) => {
  const {
    _id,
    sellerName,
    sellerLocation,
    categoryName,
    productName,
    brand,
    resalePrice,
    originalPrice,
    yearOfPurchase,
    condition,
    productImage,
      productDescription,
      timeOfPost,
  } = product;
    console.log(timeOfPost)
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
          <p>Seller: {sellerName}</p>
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
          <button className="btn btn-outline btn-primary">View Item</button>
        </div>
      </div>
    </div>
  );
};

export default BrowseCard;
