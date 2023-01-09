import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import ConfirmationModal from "../../../Components/ConfirmationModal";
import MyOrderData from "../../../Components/MyOrderData";
import { AuthContext } from "../../../Context/AuthProvider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
    const[payOrder,setPayOrder] = useState(null)
  const { data: orders = [], refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5001/orders?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("arkDeals")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });
    
    const confirmationModal = (order) => {
        setPayOrder(order);
    }
    const handlePay = (order) => {
        console.log(order);

    }
  
    const closeModal = () => {
        setPayOrder(null)
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
                <th>Seller Details</th>
                <th>Price</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
                          {orders.map((order, i) => (
                  <MyOrderData key={order._id} order={order} confirmationModal={confirmationModal} i={i}></MyOrderData>
                
              ))}
            </tbody>
          </table>
        </div>
      </div>
          {
              payOrder &&
              <ConfirmationModal
              title={`Payment for ${payOrder.product.productName}`}
              message={`Your are going to pay $ ${payOrder.product.resalePrice}`}
              successAction = {handlePay}
              successButtonName="Pay"
              modalData = {payOrder}
              closeModal = {closeModal}></ConfirmationModal>
         }
    </div>
  );
};

export default MyOrders;
