import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../../context/Store';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo ? children : <Navigate to="/signin" />
}

export default ProtectedRoute