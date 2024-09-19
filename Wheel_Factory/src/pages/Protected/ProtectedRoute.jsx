import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from "react-router-dom";
export default function ProtectedRoute() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    useEffect(() => {
         setIsAuthenticated(localStorage.getItem('status'))
    }, [])

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
