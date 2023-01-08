import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../Components/Loader';
import { AuthContext } from '../Context/AuthProvider';
import useSeller from '../hooks/useSeller';

const SellerRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const [isSeller, sellerLoading] = useSeller(user?.email);
    console.log(loading, sellerLoading)
    const location = useLocation();
    if (loading ||sellerLoading  ) {
        return <Loader></Loader>
    }

    if (user && isSeller) {
        return children
    }

    return <Navigate to='/seller-login' state={{from:location}}></Navigate>
};

export default SellerRoute;