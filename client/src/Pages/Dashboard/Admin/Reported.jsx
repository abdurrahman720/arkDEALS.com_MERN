import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import ConfirmationModal from "../../../Components/ConfirmationModal";
import ReportedTable from "../../../Components/ReportedTable";

const Reported = () => {
  const [deletingProduct, setDeletingProduct] = useState(null);
  const { data: items = [], refetch } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_SERVER}/reported-item`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("arkDeals")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  const confirmationModal = (product) => {
    setDeletingProduct(product);
  };
  const closeModal = () => {
    setDeletingProduct(null);
  };

  const handleSafe = (product) => {
    console.log(product);
    fetch(`${process.env.REACT_APP_SERVER}/reported-item/${product._id}`, {
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
  const handleDelete = (product) => {
    console.log(product);
    if (product.advertised === true) {
      fetch(
        `${process.env.REACT_APP_SERVER}/delete-advertisement/${product._id}`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount >= 1) {
            refetch();
          }
        });
    }
    fetch(`${process.env.REACT_APP_SERVER}/reported-item/${product._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("arkDeals")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetch(`${process.env.REACT_APP_SERVER}/delete-product/${product._id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("arkDeals")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount === 1) {
              refetch();
              toast.warning("Product deleted successfully!");
            }
          });
      });
  };

  return (
    <div className="bg-base-100">
      <h2 className="text-center text-xl">Reported Products</h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full ">
          <thead>
            <tr>
              <th></th>
              <th>Laptop</th>
              <th>Seller</th>
              <th>Reporter</th>
              <th>Message</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <ReportedTable
                key={item._id}
                item={item}
                i={i}
                handleSafe={handleSafe}
                confirmationModal={confirmationModal}
              ></ReportedTable>
            ))}
          </tbody>
        </table>
        {deletingProduct && (
          <ConfirmationModal
            title={`Are your sure to delete ${deletingProduct.productName}`}
            message={`This operation can not be undone`}
            successAction={handleDelete}
            successButtonName="Confirm Delete"
            modalData={deletingProduct}
            closeModal={closeModal}
          ></ConfirmationModal>
        )}
      </div>
    </div>
  );
};

export default Reported;
