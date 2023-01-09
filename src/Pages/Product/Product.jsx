import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import useAdmin from "../../hooks/useAdmin";
import useSeller from "../../hooks/useSeller";

const Product = () => {
  const product = useLoaderData();
  const { user } = useContext(AuthContext);
  const [isSeller] = useSeller(user?.email);
  const [isAdmin] = useAdmin(user?.email);
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
  return (
    <div className="card w-full bg-base-300 shadow-xl p-5">
      <h2 className="card-title justify-center text-3xl font-extrabold">
        {productName}
        <div className="badge badge-secondary">${resalePrice}</div>
          </h2>
          <p className="text-2xl font-bold text-center font-custom2">
              <span className="bg-white">
              Price: ${resalePrice}
              </span>
        </p>
      <p className="text-lg font-bold text-center">Seller: {sellerName}</p>
      <p className="text-lg font-bold  text-center">
        Location: {sellerLocation}
      </p>
      <figure className="px-10 pt-10">
        <img  src={productImage} alt="Laptop" className="rounded-xl w-3/4" />
      </figure>
      <div className="card-actions justify-end mt-5">
        <div className="badge badge-outline">{categoryName}</div>

        <div className="badge badge-outline">{timeOfPost}</div>
      </div>
      <div className="card-body">
        <div className="font-custom2">
          <p className="text-lg font-bold">Brand: {brand}</p>
          <p className="text-lg font-bold">Original Price: ${originalPrice}</p>
          <p className="text-lg font-bold">
            Year of Purchase: {yearOfPurchase}
          </p>
          <p className="text-lg font-bold">Condition: {condition}</p>

          <p className="border p-5">{productDescription}</p>
        </div>

        <div className="card-actions justify-center mt-2">
          <button
            disabled={isSeller || isAdmin}
            className="btn btn-outline btn-primary"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
