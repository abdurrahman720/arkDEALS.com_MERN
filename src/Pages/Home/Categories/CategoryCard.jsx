import React from 'react';

const CategoryCard = ({ category }) => {
    const {categoryName,image} = category;
    return (
        <div className="card card-compact w-96 bg-base-200 shadow-xl glass">
  <figure><img className="h-48 w-full" src={image} alt="OS" /></figure>
  <div className="card-body">
                <h2 className="card-title">
                    {categoryName}
    </h2>
    <p></p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary font-custom2">Browse</button>
    </div>
  </div>
</div>
    );
};

export default CategoryCard;