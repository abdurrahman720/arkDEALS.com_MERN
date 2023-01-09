import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import MyProductsTable from "../../../Components/MyProductsTable";

import { AuthContext } from "../../../Context/AuthProvider";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const [slideID, setSlideid] = useState(1);
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
  
  const handleAdvertise = (product) => {
    console.log(product);
    
    const next = slideID + 1;
    const prev = slideID - 1;
    
    const advertiseProduct = {
      product,
      sID: slideID,
      next,
      prev
    }
    fetch(`http://localhost:5001/post-advertisemnet`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('arkDeals')}`
      },
      body: JSON.stringify(advertiseProduct)
    })
      .then(res => res.json())
      .then(data => {
        if (data.acknowledged) {
          console.log(next);
          setSlideid(next)
          fetch(`http://localhost:5001/advertisement-status/${product._id}`, {
            method: 'PATCH',
          })
            .then(res => res.json())
            .then(data => {
              console.log(data)
              refetch();
              toast.success('Product is now on live!')
          })
       }
    })
  }
 
  const handleRemoveAdvertise = (id) => {
    
  }

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
              <th>Advertisement</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
                      {
                          products.map((product,i) =><MyProductsTable key={product._id} product={product} i={i} handleAdvertise={handleAdvertise} handleRemoveAdvertise={handleRemoveAdvertise}></MyProductsTable>)
           }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
