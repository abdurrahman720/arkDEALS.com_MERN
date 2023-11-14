import React from 'react';
import { Link } from 'react-router-dom';

const MyreportedTable = ({ item, i,handleSafe }) => {
    const { product,message } = item;
    return (
        <tr>
        <th>{i+1 }</th>
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img
                    src={product.productImage}
                    alt={product.productName}
                  />
                </div>
              </div>
              <div>
                    <div className="font-bold">
                        {product.productName}
                </div>
                    <div className="text-sm opacity-50 font-custom2">
                        {product.categoryName}
                </div>
              </div>
            </div>
          </td>
          <td>
          {product.sellerName}
            <br />
            <span className="badge badge-ghost badge-sm font-custom2">
                {product.sellerEmail}
            </span>
           
          </td>
        
        <td>
            {message}
            </td>
            <td>
            <Link to={`/browse/product/${product?._id}`} className="btn btn-accent btn-xs">View Item</Link>
            </td>
          <td>
            <button onClick={()=>handleSafe(product)} className="btn btn-xs">Remove from Reported Items</button>
          </td>
          
          
        </tr>
    );
};

export default MyreportedTable;