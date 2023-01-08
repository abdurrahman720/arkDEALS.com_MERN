import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Loader from '../Components/Loader';
import { AuthContext } from '../Context/AuthProvider';
import useSeller from '../hooks/useSeller';

const SellerRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const [isSeller, sellerLoading] = useSeller(user?.email);
    console.log(loading, sellerLoading)

    if (loading ||sellerLoading  ) {
        return <Loader></Loader>
    }

    if (user && isSeller) {
        return children
    }

    return <Navigate to='/login'></Navigate>
};

export default SellerRoute;