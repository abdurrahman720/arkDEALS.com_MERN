import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import MyProductsTable from "../../../Components/MyProductsTable";

import { AuthContext } from "../../../Context/AuthProvider";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5001/myproducts?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("arkDeals")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });
  console.log(products);
  return (
    <div className="bg-base-100">
      <h2 className="text-center text-xl">My Products</h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full ">
          <thead>
            <tr>
              <th></th>
              <th>Laptop</th>
              <th>Price</th>
              <th>Status</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
                      {
                          products.map((product,i) =><MyProductsTable key={product._id} product={product} i={i}></MyProductsTable>)
           }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
