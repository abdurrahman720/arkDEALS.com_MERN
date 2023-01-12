import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK)

const Payment = () => {
    const order = useLoaderData();
    const { product } = order;
    console.log(order)
    return (
        <div className="bg-base-200 ">
            <h2 className="text-xl text-center">  Payment for {product.productName}</h2>
            <p className="text-center">Amount: ${product.resalePrice} </p>

            <div className="bg-base-100 pt-10">
            <Elements stripe={stripePromise}>
                <CheckoutForm order={order} />
            </Elements>
            </div>
           
        </div>
    );
};

export default Payment;