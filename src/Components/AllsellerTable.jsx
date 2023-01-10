import React from "react";

const AllsellerTable = ({ seller, confirmationModal, i,hadnleVerify }) => {
    const { name, email, verified } = seller;
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
              {
                  verified ? <button onClick={()=>hadnleVerify(seller)} className="btn btn-xs">Verified</button> : <button onClick={()=>hadnleVerify(seller)} className="btn btn-accent btn-xs">Verify</button>
        }   
      </td>

      <td>
        <label onClick={confirmationModal(seller)} htmlFor="confirmation-modal" className="btn btn-error btn-xs">
          Delete
        </label>
      </td>
    </tr>
  );
};

export default AllsellerTable;
