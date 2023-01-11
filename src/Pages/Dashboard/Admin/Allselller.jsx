import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AllsellerTable from '../../../Components/AllsellerTable';
import ConfirmationModal from '../../../Components/ConfirmationModal';

const Allselller = () => {
    const [deletingSeller, setDeletingSeller] = useState(null);
    const [ads,setAds] = useState([])
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

    const fetchData = async() => {
        const res = await axios.get(`http://localhost:5001/get-advertisement-sort`)
        const data = res.data;
       setAds(data)
           
      }
      useEffect(() => {
        fetchData()
        },[])

    const confirmationModal = (user) => {
        setDeletingSeller(user)
    console.log(user);
    }

    const hadnleVerify = (user) => {
        console.log(user);
        if (ads.length >= 1) {
            fetch(`http://localhost:5001/verify-ad/${user?.email}`, {
                method: 'PATCH'
            })
                .then(res => res.json())
                .then(data => {
                console.log(data);
            })
        }

        fetch(`http://localhost:5001/verify-seller/${user?._id}`, {
            method: 'PATCH',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                refetch()
                fetch(`http://localhost:5001/verify-product/${user?.email}`, {
                    method: 'PATCH'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        refetch();
                        if (user.verified === false) {
                            toast.success("Verified")
                        }
                        if (user.verified === true) {
                           toast.warning("Unverified")
                       }
                    })
                
            })
            .catch(err => {
            console.log(err)
        })
        
        
       

        
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