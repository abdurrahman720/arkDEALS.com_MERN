import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Loader from '../Components/Loader';
import { AuthContext } from '../Context/AuthProvider';
import useBuyer from '../hooks/useBuyer';

const BuyerRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const [isBuyer, buyerLoading] = useBuyer(user?.email);
    console.log(loading, buyerLoading)

    if (loading ||buyerLoading  ) {
        return <Loader></Loader>
    }

    if (user && isBuyer) {
        return children
    }

    return <Navigate to='/login'></Navigate>
};

export default BuyerRoute;