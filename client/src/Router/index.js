import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
// src
const Home = lazy(() => import('../Pages/Home'));
const User = lazy(() => import('../Pages/User'));

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:userId" element={<User />} />
        </Routes>
    );
}

export default AppRouter;
