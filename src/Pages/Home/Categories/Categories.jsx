import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5001/categories`)
            .then(res => res.json())
            .then(data => {
            setCategories(data)
        })
    },[])

    return (
        <div className="bg-base-200">
            <div className=''>
                <h2 className="text-3xl text-center">Check our Categories</h2>
                <h2 className="text text-center font-thin font-custom2">Which OS you prefer?</h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 ml-5'>
                {
                    categories.map(category =><CategoryCard key={category._id} category={category}></CategoryCard>)
                }
            </div>
        </div>
    );
};

export default Categories;