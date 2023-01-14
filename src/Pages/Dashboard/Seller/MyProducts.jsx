import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ConfirmationModal from "../../../Components/ConfirmationModal";
import MyProductsTable from "../../../Components/MyProductsTable";

import { AuthContext } from "../../../Context/AuthProvider";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [slideID, setSlideid] = useState();

  const { data: isVerified } = useQuery({
    queryKey: ["isVerified"],
    queryFn: async () => {
      const res = await fetch(
        `https://ark-deals-server.vercel.app/seller-verified/${user?.email}`
      );
      const data = await res.json();

      return data.isverified;
    },
  });

  const fetchData = async () => {
    const res = await axios.get(
      `https://ark-deals-server.vercel.app/get-advertisement-sort`
    );
    const data = res.data;

    if (data.length === 0) {
      let id = 1;
      return setSlideid(id);
    }

    let id = data[0]?.next;

    setSlideid(id);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(
        `https://ark-deals-server.vercel.app/myproducts?email=${user?.email}`,
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

  const handleAdvertise = (product) => {
    console.log(product);

    const next = slideID + 1;
    const prev = slideID - 1;

    const advertiseProduct = {
      id: product._id,
      product,
      sID: slideID,
      next,
      prev,
      date: new Date(),
      verified: isVerified,
      seller: product.sellerEmail,
    };
    console.log(slideID, next, prev, advertiseProduct);

    fetch(`https://ark-deals-server.vercel.app/post-advertisemnet`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("arkDeals")}`,
      },
      body: JSON.stringify(advertiseProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          fetch(
            `https://ark-deals-server.vercel.app/advertisement-status/${product._id}`,
            {
              method: "PATCH",
            }
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              refetch();
              fetchData();
              toast.success("Product is now on Advertisement");
            });
        }
      });
  };

  const handleRemoveAdvertise = (id) => {
    fetch(`https://ark-deals-server.vercel.app/delete-advertisement/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount === 1) {
          fetch(
            `https://ark-deals-server.vercel.app/advertisement-status/${id}`,
            {
              method: "PATCH",
            }
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              refetch();
              fetchData();
              toast.warning("Product is removed from Advertisement");
            });
        }
      });
  };

  const confirmationModal = (product) => {
    setDeletingProduct(product);
  };

  const handleDelete = (product) => {
    console.log(product);
    if (product.advertised === true) {
      fetch(
        `https://ark-deals-server.vercel.app/delete-advertisement/${product._id}`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount >= 1) {
            refetch();
            fetchData();
            toast.warning("Product is removed from Advertisement");
          }
        });
    }
    fetch(`https://ark-deals-server.vercel.app/delete-product/${product._id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("arkDeals")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount === 1) {
          refetch();
          toast.warning("Product deleted successfully!");
        }
      });
  };

  const closeModal = () => {
    setDeletingProduct(null);
  };

  return (
    <div className="bg-base-100">
      <h2 className="text-center text-xl">My Products</h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full ">
          <thead>
            <tr>
              <th></th>
              <th>Laptop</th>
              <th>Price</th>
              <th>Status</th>
              <th>Advertisement</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <MyProductsTable
                key={product._id}
                product={product}
                i={i}
                handleAdvertise={handleAdvertise}
                handleRemoveAdvertise={handleRemoveAdvertise}
                confirmationModal={confirmationModal}
              ></MyProductsTable>
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

export default MyProducts;
