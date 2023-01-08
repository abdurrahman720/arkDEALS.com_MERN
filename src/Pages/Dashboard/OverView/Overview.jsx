import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import Loader from '../../../Components/Loader';
import { AuthContext } from '../../../Context/AuthProvider';

const Overview = () => {
    const {user} = useContext(AuthContext)
    const { data:currentUser, isLoading } = useQuery({
        queryKey: [user?.email],
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
    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <div className='text-3xl text-center'>
            {currentUser.name}
        </div>
    );
};

export default Overview;