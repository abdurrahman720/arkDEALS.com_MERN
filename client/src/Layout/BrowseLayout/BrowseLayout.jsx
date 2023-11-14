import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const BrowseLayout = () => {
  const navigate = useNavigate();

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_SERVER}/categories`);
      const data = await res.json();
      return data;
    },
  });

  const handleCategory = (e) => {
    e.preventDefault();
    const form = e.target;
    const categoryName = form.category.value;
    if (categoryName === "All Categories") {
      navigate("/browse");
    }

    const category = categories.find((c) => c.categoryName === categoryName);
    navigate(`/browse/category/${category._id}`);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleCategory} className="">
        <div className="form-control">
          <div className="input-group">
            <select name="category" className="select select-bordered">
              <option selected>All Categories</option>
              {categories.map((category) => (
                <option key={category._id}>{category.categoryName}</option>
              ))}
            </select>
            <input className="btn btn-accent" type="submit" value="go" />
          </div>
        </div>
      </form>

      <Outlet></Outlet>
    </div>
  );
};

export default BrowseLayout;
