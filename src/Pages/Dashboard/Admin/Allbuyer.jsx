import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import AllbuyerTable from "../../../Components/AllbuyerTable";
import ConfirmationModal from "../../../Components/ConfirmationModal";

const Allbuyer = () => {
  const { data: buyers = [], refetch } = useQuery({
    queryKey: ["buyers"],
    queryFn: async () => {
      const res = await fetch(`https://ark-deals-server.vercel.app/allbuyers`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("arkDeals")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  const [deletingBuyer, setDeletingBuyer] = useState(null);

  const confirmationModal = (user) => {
    setDeletingBuyer(user);
  };
  const closeModal = () => {
    setDeletingBuyer(null);
  };

  const handleDelete = (user) => {
    console.log(user);
    fetch(
      `https://ark-deals-server.vercel.app/buyer-orders-delete/${user?.email}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("arkDeals")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetch(
          `https://ark-deals-server.vercel.app/user-delete/${user?.email}`,
          {
            method: "DELETE",
            headers: {
              authorization: `Bearer ${localStorage.getItem("arkDeals")}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            refetch();
            toast.success("User has been deleted successfully");
            toast.warn("Don't forget to delete this user from Firebase!");
          });
      });
  };

  return (
    <div>
      <div className="bg-base-100">
        <h2 className="text-center text-xl">All Buyer</h2>
        <div className="overflow-x-auto w-full">
          <table className="table w-full ">
            <thead>
              <tr>
                <th></th>
                <th>Seller Name</th>
                <th>Email</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {buyers.map((buyer, i) => (
                <AllbuyerTable
                  key={buyer._id}
                  buyer={buyer}
                  confirmationModal={confirmationModal}
                  i={i}
                ></AllbuyerTable>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {deletingBuyer && (
        <ConfirmationModal
          title={`Your are deleting ${deletingBuyer.name}`}
          message={`Everything associated with this email: ${deletingBuyer.name}  will be deleted from database. 
          Since your are using firebase authentication, you must delete ${deletingBuyer.email} from there manually!`}
          successAction={handleDelete}
          successButtonName="Delete"
          modalData={deletingBuyer}
          closeModal={closeModal}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default Allbuyer;
