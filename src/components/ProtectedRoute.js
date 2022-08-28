import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const { userData } = useSelector((state) => state.userLoginData);
    console.log(userData);
    return userData?.token ? <Outlet /> : <Navigate to="/login" />;
}
