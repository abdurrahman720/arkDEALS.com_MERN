import React from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';

const MyOrderData = ({ order,i , confirmationModal}) => {
    const { product } = order;
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
           {product.sellerName}
            <br />
            <span className="badge badge-ghost badge-sm font-custom2">
                {product.sellerEmail}
            </span>
            <br />
            <span className="badge badge-ghost badge-sm font-custom2">
            {
                    product.sellerPhone
                }
            </span>
          </td>
        <td>
            ${product.resalePrice}
          </td>
          <td>
            <button onClick={()=>navigate(`/browse/product/${product._id}`)} className="btn btn-xs">details</button>
          </td>
          <td>
          <label onClick={()=>confirmationModal(order)} htmlFor="confirmation-modal" className="btn btn-accent btn-xs">Pay</label>
          </td>
        </tr>
           

           
      
    );
};

export default MyOrderData;