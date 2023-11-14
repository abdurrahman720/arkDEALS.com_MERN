import React from 'react';

const MybuyersTable = ({ order, i, confirmationModal ,handleMeet}) => {
    const { product,buyerName, buyerEmail, buyerLocation,buyerPhone } = order;
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
           {buyerName}
            <br />
            <span className="badge badge-ghost badge-sm font-custom2">
                {buyerEmail}
            </span>
            <br />
            <span className="badge badge-ghost badge-sm font-custom2">
            {
                    buyerPhone
                }
            </span>
          </td>
        <td>
            ${product.resalePrice}
          </td>
          <td>
            {buyerLocation}
          </td>
          <td>
          {

            order?.paid===true && order?.meeting===true ? <span className="badge  badge-sm font-custom2">Sold</span> :  order?.meeting===true && order?.paid===false ? <><span className="badge badge-sm font-custom2">Pending payment</span> <button onClick={()=>handleMeet(order)} className="btn btn-warning btn-xs">Cancel Meeting</button> </> : order?.paid===false && order?.meeting===false && <label onClick={()=>confirmationModal(order)} htmlFor="confirmation-modal" className="btn  btn-xs">Meet</label>
         }
          </td>
        </tr>
    );
};

export default MybuyersTable;