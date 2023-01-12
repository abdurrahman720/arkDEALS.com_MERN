import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import ConfirmationModal from '../../../Components/ConfirmationModal';
import MybuyersTable from '../../../Components/MybuyersTable';
import { AuthContext } from '../../../Context/AuthProvider';

const MyBuyers = () => {
    const { user } = useContext(AuthContext);
    const [meetingOrder, setMeetingOrder] = useState(null)
    const { data: orders = [], refetch } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5001/mybuyers?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('arkDeals')}`
                }
            })
            const data = await res.json();
            return data
        }
    })

    const confirmationModal = (order) => {
        setMeetingOrder(order)
    }
    const closeModal = () => {
        setMeetingOrder(null)
    }

    const handleMeet = (order) => {
        console.log(order);
        fetch(`http://localhost:5001/confirm-meeting/${order._id}`, {
            method: 'PATCH',
            headers: {
                authorization: `bearer ${localStorage.getItem('arkDeals')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch();
                toast.success("Meeting is marked as Done!")
        })
    }


    return (
        <div>
      <div className="bg-base-100">
        <h2 className="text-center text-xl">My Orders</h2>
        <div className="overflow-x-auto w-full">
          <table className="table w-full ">
            <thead>
              <tr>
                <th></th>
                <th>Laptop</th>
                <th>Buyer Details</th>
                <th>Price</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <MybuyersTable
                  key={order._id}
                  order={order}
                  confirmationModal={confirmationModal}
                      i={i}
                      handleMeet={handleMeet}
                ></MybuyersTable>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {meetingOrder && (
        <ConfirmationModal
          title={`Meeting for ${meetingOrder.product.productName} with ${meetingOrder.buyerName}`}
          message={`You are confirming that you had a meeting with ${meetingOrder.buyerName} and you're letting ${meetingOrder.buyerName} to pay $${meetingOrder.product.resalePrice} `}
          successAction={handleMeet}
          successButtonName="Confirm"
          modalData={meetingOrder}
          closeModal={closeModal}
        ></ConfirmationModal>
      )}
    </div>
    );
};

export default MyBuyers;