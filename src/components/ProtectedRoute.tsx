import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from '../hooks/redux';

export default function ProtectedRoute () {

  const { isAuthenticated } = useAppSelector(state => state.auth);

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace/>
}

