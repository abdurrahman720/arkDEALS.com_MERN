import axios from "axios";
import React, { useEffect, useState } from "react";
import BrowseCard from "../../Components/BrowseCard";

const Browse = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const res = await axios.get(`https://ark-deals-server.vercel.app/products`);
    setProducts(res.data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-base-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {products.map((product) => (
        <BrowseCard key={product._id} product={product}></BrowseCard>
      ))}
    </div>
  );
};

export default Browse;
