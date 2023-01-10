import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import Loader from '../../../Components/Loader';
import { AuthContext } from '../../../Context/AuthProvider';
import useSeller from '../../../hooks/useSeller';

const Overview = () => {
    const { user } = useContext(AuthContext);
    const [isVerified,sellerLoading] = useSeller(user?.email)
    const { data:currentUser, isLoading } = useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5001/profile/${user?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('arkDeals')}`
                }
            })
            const data = await res.json();
            return data;
        }
    })
    console.log(currentUser);
    console.log(isVerified);
    if (isLoading || sellerLoading) {
        return <Loader></Loader>
    }
    return (
        <div className='bg-accent text-center max-w-sm mx-auto'>
            <h3 className="text-xl">{currentUser.name}</h3>
            <br />
            <h4 className="text-lg">{currentUser.email}</h4>
            <br />
            <h5 className="">{currentUser.role }</h5>
        </div>
    );
};

export default Overview;