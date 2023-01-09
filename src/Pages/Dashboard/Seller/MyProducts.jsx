import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import MyProductsTable from "../../../Components/MyProductsTable";

import { AuthContext } from "../../../Context/AuthProvider";

const MyProducts = () => {
  const { user } = useContext(AuthContext);

  const [slideID, setSlideid] = useState();

  const fetchData = async() => {
    const res = await axios.get(`http://localhost:5001/get-advertisement-sort`)
    const data = res.data;

        if (data.length === 0) {
          let id = 1;
         return setSlideid(id)
        }

        let id = data[0]?.next;
        
        setSlideid(id)
  }

  useEffect(() => {
    fetchData()
    },[])




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
      id: product._id,
      product,
      sID: slideID,
      next,
      prev,
      date: new Date()
    }
  console.log(slideID,next,prev,advertiseProduct);
    
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
          
         
          fetch(`http://localhost:5001/advertisement-status/${product._id}`, {
            method: 'PATCH',
          })
            .then(res => res.json())
            .then(data => {
              console.log(data);
              refetch()
              fetchData();
              toast.success('Product is now on Advertisement')
          })
       }
    })
  }
 
  const handleRemoveAdvertise = (id) => {
    fetch(`http://localhost:5001/delete-advertisement/${id}`, {
      method: 'DELETE',
     
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount === 1) {
          fetch(`http://localhost:5001/advertisement-status/${id}`, {
            method: 'PATCH',
          })
            .then(res => res.json())
            .then(data => {
              console.log(data);
              refetch()
              fetchData();
              toast.warning('Product is removed from Advertisement')
          })
        }
    })
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
