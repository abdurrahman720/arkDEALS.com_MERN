import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import MyreportedTable from '../../../Components/MyreportedTable';
import { AuthContext } from '../../../Context/AuthProvider';

const MyReported = () => {
    const { user } = useContext(AuthContext);
    const { data: items=[],refetch } = useQuery({
        queryKey: ['items'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5001/reported-item-buyer?email=${user?.email}`)
            const data = res.json();
            return data;
        }
    })
    console.log(items);
    const handleSafe = (product) => {
        console.log(product);
        fetch(`http://localhost:5001/reported-item/${product._id}`, {
          method: "DELETE",
          headers: {
            authorization: `bearer ${localStorage.getItem("arkDeals")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            refetch();
            toast.success("Product is marked as Safe!");
          });
      };
    return (
        <div className="bg-base-100">
      <h2 className="text-center text-xl">My Reported Products</h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full ">
          <thead>
            <tr>
              <th></th>
              <th>Laptop</th>
              <th>Seller</th>
              <th>Message</th>
              <th></th>
              <th></th>
              
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <MyreportedTable
                key={item._id}
                item={item}
                i={i}
                handleSafe={handleSafe}
                
              ></MyreportedTable>
            ))}
          </tbody>
        </table>
        {/* {deletingProduct && (
          <ConfirmationModal
            title={`Are your sure to delete ${deletingProduct.productName}`}
            message={`This operation can not be undone`}
            successAction={handleDelete}
            successButtonName="Confirm Delete"
            modalData={deletingProduct}
            closeModal={closeModal}
          ></ConfirmationModal>
        )} */}
      </div>
    </div>
    );
};

export default MyReported;