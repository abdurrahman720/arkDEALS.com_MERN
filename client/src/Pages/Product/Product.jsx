import React, { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader";
import { AuthContext } from "../../Context/AuthProvider";
import useAdmin from "../../hooks/useAdmin";
import useSeller from "../../hooks/useSeller";
import { TiTick } from "react-icons/ti";

const Product = () => {
  const product = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [isSeller] = useSeller(user?.email);
  const [isAdmin] = useAdmin(user?.email);
  const [isLoading, setIsLoading] = useState(false);
  const [isBooking, setIsBooking] = useState(null);
  const [isReporting, setIsReporting] = useState(null);
  const {
    _id,
    sellerName,
    sellerEmail,
    sellerLocation,
    categoryName,
    productName,
    brand,
    resalePrice,
    originalPrice,
    yearOfPurchase,
    condition,
    productImage,
    productDescription,
    timeOfPost,
    verified,
  } = product;

  // console.log(isVerified);

  const bookNowModal = (product) => {
    setIsBooking(product);
  };

  const reportModal = (product) => {
    setIsReporting(product);
  };

  const handleBooking = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target;
    const phone = form.phone.value;
    const location = form.location.value;
    // console.log(phone, location);
    const order = {
      pId: product._id,
      buyerName: user?.displayName,
      buyerEmail: user?.email,
      buyerPhone: phone,
      buyerLocation: location,
      seller: sellerEmail,
      meeting: false,
      paid: false,
      product: product,
    };
    //post order
    fetch(`${process.env.REACT_APP_SERVER}/orders`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("arkDeals")}`,
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        if (data.acknowledged) {
          toast.success(
            "Order has been placed! Wait for seller approval after meeting!"
          );
          navigate("/dashboard/myorders");
        }
      });
  };

  const handleReport = (e) => {
    e.preventDefault();
    const form = e.target;
    setIsLoading(true);
    const message = form.message.value;
    //create reportedItem
    const repItem = {
      pID: _id,
      seller: sellerEmail,
      reporterName: user?.displayName,
      reporterEmail: user?.email,
      message: message,
      product,
    };
    fetch(`${process.env.REACT_APP_SERVER}/reported-item-buyer`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("arkDeals")}`,
      },
      body: JSON.stringify(repItem),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.info("Item has been reported. Admin will review it soon!");
        navigate(`/browse`);
      });
  };

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="card w-full bg-base-300 shadow-xl p-5">
      <h2 className="card-title justify-center text-3xl font-extrabold">
        {productName}
        <div className="badge badge-secondary">${resalePrice}</div>
      </h2>
      <p className="text-2xl font-bold text-center font-custom2">
        <span className="bg-white">Price: ${resalePrice}</span>
      </p>
      <p className="text-lg font-bold text-center">
        Seller: {sellerName}
        {verified && (
          <div className="badge">
            <TiTick></TiTick>
          </div>
        )}
      </p>
      <p className="text-lg font-bold  text-center">
        Location: {sellerLocation}
      </p>
      <figure className="px-10 pt-10">
        <img src={productImage} alt="Laptop" className="rounded-xl w-3/4" />
      </figure>
      <div className="card-actions justify-end mt-5">
        <div className="badge badge-outline">{categoryName}</div>

        <div className="badge badge-outline">{timeOfPost}</div>
      </div>
      <div className="card-body">
        <div className="font-custom2">
          <p className="text-lg font-bold">Brand: {brand}</p>
          <p className="text-lg font-bold">Original Price: ${originalPrice}</p>
          <p className="text-lg font-bold">
            Year of Purchase: {yearOfPurchase}
          </p>
          <p className="text-lg font-bold">Condition: {condition}</p>

          <p className="border p-5">{productDescription}</p>
        </div>

        <div className="card-actions justify-center mt-2">
          <label
            disabled={isAdmin || isSeller}
            onClick={() => bookNowModal(product)}
            htmlFor="book-modal"
            className="btn"
          >
            Book Order
          </label>
        </div>
        <label
          disabled={isAdmin || isSeller}
          onClick={() => reportModal(product)}
          htmlFor="report-modal"
          className="btn btn-xs btn-warning w-32 mx-auto"
        >
          Report this item
        </label>
      </div>

      {isBooking && (
        <div className="book-modal">
          <input type="checkbox" id="book-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">
              <label
                htmlFor="booking-modal"
                onClick={() => setIsBooking(null)}
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <form
                onSubmit={handleBooking}
                className="grid grid-cols-1 gap-3 mt-10"
              >
                <input
                  name="itemName"
                  type="text"
                  defaultValue={productName}
                  disabled
                  placeholder="Your Name"
                  className="input w-full input-bordered"
                  readOnly
                />
                <input
                  name="itemPrice"
                  type="text"
                  defaultValue={`$ ${resalePrice}`}
                  disabled
                  placeholder="Your Name"
                  className="input w-full input-bordered"
                  readOnly
                />
                <input
                  name="name"
                  type="text"
                  defaultValue={user?.displayName}
                  disabled
                  placeholder="Your Name"
                  className="input w-full input-bordered"
                />
                <input
                  name="email"
                  type="email"
                  defaultValue={user?.email}
                  disabled
                  placeholder="Email Address"
                  className="input w-full input-bordered"
                />
                <input
                  name="phone"
                  type="text"
                  placeholder="Phone Number"
                  className="input w-full input-bordered"
                  required
                />
                <input
                  name="location"
                  type="text"
                  placeholder="Meeting Location"
                  className="input w-full input-bordered"
                  required
                />

                <br />
                <input
                  className="btn btn-accent w-full"
                  type="submit"
                  value="Place Order"
                />
              </form>
            </div>
          </div>
        </div>
      )}
      {isReporting && (
        <div className="report-modal">
          <input type="checkbox" id="report-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">
              <label
                htmlFor="report-modal"
                onClick={() => setIsReporting(null)}
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <form
                onSubmit={handleReport}
                className="grid grid-cols-1 gap-3 mt-10"
              >
                <input
                  name="itemName"
                  type="text"
                  defaultValue={productName}
                  disabled
                  placeholder="Your Name"
                  className="input w-full input-bordered"
                  readOnly
                />
                <input
                  name="itemPrice"
                  type="text"
                  defaultValue={`$ ${resalePrice}`}
                  disabled
                  placeholder="Your Name"
                  className="input w-full input-bordered"
                  readOnly
                />
                <input
                  name="name"
                  type="text"
                  defaultValue={user?.displayName}
                  disabled
                  placeholder="Your Name"
                  className="input w-full input-bordered"
                />
                <input
                  name="email"
                  type="email"
                  defaultValue={user?.email}
                  disabled
                  placeholder="Email Address"
                  className="input w-full input-bordered"
                />

                <input
                  name="message"
                  type="text"
                  placeholder="Whats wrong with this product?"
                  className="input w-full input-bordered"
                  required
                />

                <br />
                <input
                  className="btn btn-warning w-full"
                  type="submit"
                  value="Confirm report"
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
