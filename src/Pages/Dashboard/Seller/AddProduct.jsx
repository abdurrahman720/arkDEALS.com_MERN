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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-2xl text-center">Add Product for sell!</h2>
      <form className="w-3/4">
        <div className="form-control w-full max-w-sm">
          <label className="label">
            <span className="label-text">Seller Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            {...register("sellrName", { required: "Name is required" })}
            placeholder="Full Name"
            defaultValue={user?.displayName}
            disabled
          />
        </div>
        <div className="form-control w-full max-w-sm">
          <label className="label">
            <span className="label-text">Seller Email</span>
          </label>
          <input
            type="email"
            className="input input-bordered"
            {...register("sellrEmail", { required: "Email is required" })}
            placeholder="Full Name"
            defaultValue={user?.email}
            disabled
          />
              </div>
              <div className="form-control w-full max-w-sm">
          <label className="label">
            <span className="label-text">Category</span>
                  </label>
                  <select className="select select-bordered w-full">
                      {
                          categories.map(category =>
                              <option key={category._id}>
                                  {category.name}
                            </option>
                            )
                      }
            </select>
                  
                  </div>
      </form>
    </div>
  );
};

export default AddProduct;
