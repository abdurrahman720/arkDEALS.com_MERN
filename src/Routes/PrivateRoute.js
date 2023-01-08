import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../Components/Loader';
import { AuthContext } from '../Context/AuthProvider';

const PrivateRoute=({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();


    if (loading  ) {
        return <Loader></Loader>
    }

    if (user?.email) {
        return children
    }

    return <Navigate to='/login' state={{from:location}} ></Navigate>
};

export default PrivateRoute;