import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { json, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CheckoutForm = ({ order }) => {
    const { product, _id, pId, buyerName,buyerEmail } = order;
    const {resalePrice} = product;
    const stripe = useStripe()
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch(`http://localhost:5001/create-payment-intent`, {
          method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('arkDeals')}`
            },
          body: JSON.stringify({ resalePrice }),
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
      }, [resalePrice]);
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const {error,paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setCardError(error.message)

        }
        else {
            setCardError('')
        }
        setSuccess('')
        setProcessing(true)
        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                    name:  buyerName ,
                    email: buyerEmail
                },
              },
            },
        );
        if (confirmError) {
            setCardError(confirmError.message)
            return;
        }
        if (paymentIntent.status === "succeeded") {
            setSuccess("Congrats")
            setTransactionId(paymentIntent.id)
            const tranID = {
                tID: transactionId
            }

            fetch(`http://localhost:5001/orders-paid/${order._id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(tranID)
    })
      .then(res => res.json())
      .then(data => {
        console.log("order status",data)
        fetch(`http://localhost:5001/orders-paid-dup/${order?.pId}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            if (data.deletedCount >= 1) {
              fetch(`http://localhost:5001/products-paid/${order.pId}`, {
                method: 'PATCH'
                })
                  .then(res => res.json())
                  .then(data => {
                    console.log("product status",data);
                    if (data.modifiedCount>=1) {
                      fetch(`http://localhost:5001/delete-advertisement/${order.pId}`, {
                        method: 'DELETE',
                       
                      })
                        .then(res => res.json())
                        .then(data => {
                          console.log("delete",data)
                          if (data.acknowledged) {
                              toast.success("Payment Succesfull!")
                              navigate('/dashboard/myorders')
                          }
                      })
                  }
                })
            }
            else {
                toast.success("Payment Succesfull!")
                navigate('/dashboard/myorders')
              }
        })

    })

            
        }
        setProcessing(false)
        console.log("payment intent",paymentIntent);

    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <CardElement
                className='w-1/2 border'
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button type="submit" className='btn btn-sm w-1/2' disabled={!stripe || !clientSecret || processing}>
        Pay
      </button>
            </form>
            <p className="text-red-500">{cardError}</p>
            {
                success && <div>
                    <p className="text-green-500">
                        {success}
                    </p>
                    <p>Your transactionId: <span className="font-bold">
                    {transactionId}
                    </span> </p>
                </div>
            }
        </>
    );
};

export default CheckoutForm;