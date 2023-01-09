import React from 'react';
import { useLoaderData } from 'react-router-dom';
import BrowseCard from '../../Components/BrowseCard';

const BrowseByCate = () => {
    const products = useLoaderData()
  
    return (
        <div className='bg-base-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {
                products.map(product =><BrowseCard key={product._id} product={product}></BrowseCard>)
            }
        </div>
    );
};

export default BrowseByCate;