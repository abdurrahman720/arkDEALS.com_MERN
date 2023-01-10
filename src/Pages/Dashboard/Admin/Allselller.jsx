import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import AllsellerTable from '../../../Components/AllsellerTable';
import ConfirmationModal from '../../../Components/ConfirmationModal';

const Allselller = () => {
    const [deletingSeller,setDeletingSeller] = useState(null)
    const { data: sellers = [], refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5001/allsellers`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('arkDeals')}`
                }
            })
            const data = await res.json()
            return data;
        }
    })

    const confirmationModal = (user) => {
        setDeletingSeller(user)
    console.log(user);
    }

    const hadnleVerify = (user) => {
        console.log(user);
    }

    const handleDelete = (user) => {
        console.log(user);
    }
    
    const closeModal = () => {
        setDeletingSeller(null)
    }

    return (
        <div>
      <div className="bg-base-100">
        <h2 className="text-center text-xl">All Seller</h2>
        <div className="overflow-x-auto w-full">
          <table className="table w-full ">
            <thead>
              <tr>
                <th></th>
                <th>Seller Name</th>
                <th>Email</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {sellers.map((seller,i) =><AllsellerTable key={seller._id} seller={seller} confirmationModal={confirmationModal} i={i} hadnleVerify={hadnleVerify}></AllsellerTable>)}
            </tbody>
          </table>
        </div>
      </div>
      {deletingSeller && (
        <ConfirmationModal
          title={`Your are deleting ${deletingSeller.name}`}
          message={`Email: ${deletingSeller.email}`}
          successAction={handleDelete}
          successButtonName="Delete"
          modalData={deletingSeller}
          closeModal={closeModal}
        ></ConfirmationModal>
      )}
    </div>
    );
};

export default Allselller;