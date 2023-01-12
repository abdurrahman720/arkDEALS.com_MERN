import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const MyOrdersTable = ({ order,i , confirmationModal}) => {
  const { product,pId } = order;
  
  // const { data: soldProduct, refetch } = useQuery({
  //   queryKey: ['soldProduct'],
  //   queryFn: async () => {
  //     const res = await fetch(`http://localhost:5001/product/${pId}`);
  //     const data = res.json();
  //     return data
  //   }
  // })
  // console.log(soldProduct);

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
            <button onClick={()=>navigate(`/browse/product/${product._id}`)} className="btn btn-accent btn-xs">details</button>
          </td>
          <td>
          {

            order?.paid===true && order?.meeting===true ? <span className="badge  badge-sm font-custom2">Paid</span> :  order?.meeting===false ? <span className="badge badge-warning badge-sm font-custom2">Meeting pending</span> : order?.paid===false && order?.meeting===true && <label onClick={()=>confirmationModal(order)} htmlFor="confirmation-modal" className="btn  btn-xs">Pay</label>
         }
          </td>
        </tr>
           

           
      
    );
};

export default MyOrdersTable;