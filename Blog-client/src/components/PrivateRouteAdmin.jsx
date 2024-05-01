import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRouteAdmin = () => {
    const {currentUser} = useSelector((state) => state.user)
    return currentUser.isAdmin ? <Outlet/> : <Navigate to="/SignIn"/>
};

export default PrivateRouteAdmin;