import React from 'react';
import {Route, Routes, Navigate } from 'react-router-dom';
import UserDashboard from './Components/UserComponents/UserDashboard';
import Home from './Components/Home';

function AppRoutes(props) {
    return (
        <Routes>
            <Route path="/home">
                <Home />
            </Route>
            <Route path="user/dashboard">
                <UserDashboard />
            </Route>

            {/* <ProtectedRoutes path="/cartItems" component={Cart} /> */}
            {/* <ProtectedRoutes path="/orders" component={Orders} /> */}
            <Route path="/">
                <Navigate to="/home" />
            </Route>
        </Routes>
    )
}

export default AppRoutes