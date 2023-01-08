import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/categories`);
      setCategories(res.data);
    } catch {}
  };
  useEffect(() => {
    fetchCategories();
  }, []);

const {register, handleSubmit,  formState: { errors },} = useForm()

    const navigate = useNavigate();
    
    const AddProduct = data => {
      console.log(data)
      
  }


  return (
    <div>
      <h2 className="text-2xl text-center">Add Product for sell!</h2>
      <form  onSubmit={handleSubmit(AddProduct)} className="w-3/4 mx-auto">
        <div className="form-control w-full  mt-5">
          <label className="label">
            <span className="label-text">Seller Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            {...register("sellerName", { required: "Name is required" })}
            placeholder="Full Name"
            defaultValue={user?.displayName}
            readOnly
          />
        </div>
        <div className="form-control w-full  mt-5">
          <label className="label">
            <span className="label-text">Seller Email</span>
          </label>
          <input
            type="email"
            className="input input-bordered"
            {...register("sellerEmail", { required: "Email is required" })}
            placeholder="Full Name"
            defaultValue={user?.email}
           readOnly
          />
        </div>
        <div className="form-control w-full  mt-5">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            {...register("sellerLocation", {
              required: "Location is required",
            })}
            placeholder="Dhaka, Khulna..."
          />
          {errors.sellerLocation && (
            <p className="text-red-600" role="alert">
              {errors.sellerLocation?.message}
            </p>
          )}
        </div>
        <div className="form-control w-full  mt-5">
          <label className="label">
            <span className="label-text">Mobile No.</span>
          </label>
          <input
            type="number"
            className="input input-bordered"
            {...register("sellerPhone", {
              required: "Phone number  is required",
            })}
            placeholder="0123456789.."
          />
          {errors.sellerPhone && (
            <p className="text-red-600" role="alert">
              {errors.sellerPhone?.message}
            </p>
          )}
        </div>
        <div className="form-control w-full  mt-5">
          <label className="label">
            <span className="label-text">Operating System</span>
          </label>
          <select
            className="select select-bordered w-full"
            {...register("categoryName", { required: true })}
          >
            {categories.map((category) => (
              <option key={category._id}>{category.category}</option>
            ))}
          </select>
        </div>
        <div className="form-control w-full  mt-5 ">
          <label className="label">
            <span className="label-text">Laptop Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            {...register("productName", { required: "Name is required" })}
            placeholder="Macbook Air m1..."
          />
          {errors.productName && (
            <p className="text-red-600" role="alert">
              {errors.productName?.message}
            </p>
          )}
        </div>
        <div className="form-control w-full  mt-5 ">
          <label className="label">
            <span className="label-text">Brand</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            {...register("brand", { required: "brand is required" })}
            placeholder="Apple..."
          />
          {errors.brand && (
            <p className="text-red-600" role="alert">
              {errors.brand?.message}
            </p>
          )}
        </div>
        <div className="form-control w-full  mt-5 ">
          <label className="label">
            <span className="label-text">Resale Price</span>
          </label>
          <input
            type="number"
            className="input input-bordered"
            {...register("resalePrice", { required: "Price is required" })}
            placeholder="600$"
          />
          {errors.resalePrice && (
            <p className="text-red-600" role="alert">
              {errors.resalePrice?.message}
            </p>
          )}
        </div>
        <div className="form-control w-full  mt-5 ">
          <label className="label">
            <span className="label-text">Original Price</span>
          </label>
          <input
            type="number"
            className="input input-bordered"
            {...register("originalPrice", { required: "Price is required" })}
            placeholder="1000$"
          />
          {errors.originalPrice && (
            <p className="text-red-600" role="alert">
              {errors.originalPrice?.message}
            </p>
          )}
        </div>
        <div className="form-control w-full  mt-5 ">
          <label className="label">
            <span className="label-text">Years of Purchase</span>
          </label>
          <input
            type="number"
            className="input input-bordered"
            {...register("yrOfpurchase", {
              required: "Year of Purchase is required",
            })}
            placeholder="2017"
          />
          {errors.yrOfpurchase && (
            <p className="text-red-600" role="alert">
              {errors.yrOfpurchase?.message}
            </p>
          )}
        </div>
        <div className="form-control w-full  mt-5 ">
          <label className="label">
            <span className="label-text">Condition</span>
                  </label>
                  <select className="select select-bordered"
                  {...register("condition",{required:true})}
                  >
                      <option>Excellent</option>
                      <option>Good</option>
                      <option>Fair</option>
                  </select>
        </div>
        <div className="form-control w-full  mt-5 ">
          <label className="label">
            <span className="label-text">Tell Us More!</span>
                  </label>
                  <textarea className="textarea textarea-bordered"
                      {...register("description", { required: "You must add a description of the laptop"})}
                      placeholder="I bought this product on..."
                  />
                   {errors.description && (
            <p className="text-red-600" role="alert">
              {errors.description?.message}
            </p>
          )}
              </div>
              <div className="form-control w-full mt-5 ">
          <label className="label">
            <span className="label-text">Product Image</span>
          </label>
          <input
            type="file"
            className="input input-bordered"
            {...register("productImage", { required: "photo is required" })}
            placeholder="Full Name"
          />
          {errors.productImage && (
            <p className="text-red-600" role="alert">
              {errors.productImage?.message}
            </p>
          )}
        </div>
            <input className="btn w-full my-5" type="submit" value="Post for sale!" /> 
      </form>
    </div>
  );
};

export default AddProduct;

