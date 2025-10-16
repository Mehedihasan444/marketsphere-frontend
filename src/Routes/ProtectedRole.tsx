import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../Redux/hook';
import { verifyToken } from '../Utils/verifyToken';
import { logout, useCurrentToken } from '../Redux/Features/Auth/authSlice';
import { JwtPayload } from 'jwt-decode';

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  let user;

  try {
    user = verifyToken(token) as JwtPayload & { role: string };
  } catch (error) {
    // If token is invalid or expired, logout and redirect
    console.error('Token verification failed:', error);
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }

  // If role is required and doesn't match user's role, logout and redirect
  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;