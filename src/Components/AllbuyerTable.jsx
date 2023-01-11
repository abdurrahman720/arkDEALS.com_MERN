import React from 'react';

const AllbuyerTable = ({ buyer, confirmationModal, i }) => {
    const { name, email } = buyer;
    return (
        <tr>
        <th>{i + 1}</th>
  
            <td className="font-custom2">
               {name} 
        </td>
  
        <td>
          {email}
        </td>
        
  
        <td>
          <label onClick={confirmationModal(buyer)} htmlFor="confirmation-modal" className="btn btn-error btn-xs">
            Delete
          </label>
        </td>
      </tr>
    );
};

export default AllbuyerTable;