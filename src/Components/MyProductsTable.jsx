import React from 'react';
import { useNavigate } from 'react-router-dom';


const MyProductsTable = ({product,i,confirmationModal}) => {

    const navigate = useNavigate()
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
           ${product.resalePrice}
           
          </td>
        <td>
          {
            product.sold ?  <span className="badge badge-ghost badge-sm font-custom2">Sold</span> : <span className="badge badge-ghost badge-sm font-custom2">UnSold</span>
            }
          </td>
          <td>
            <button onClick={()=>navigate(`/browse/product/${product._id}`)} className="btn btn-xs">details</button>
          </td>
          <td>
          {
            product.advertied ?  <button  className="btn btn-xs">UnAdvertise</button> :  <button  className="btn btn-xs">Advertise</button>
           }
          </td>
          <td>
          <label onClick={()=>confirmationModal(product)} htmlFor="confirmation-modal" className="btn btn-error btn-xs">Delete</label>
          </td>
        </tr>
           
    );
};

export default MyProductsTable;