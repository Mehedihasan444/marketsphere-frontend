import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../Redux/hook';
import { verifyToken } from '../Utils/verifyToken';
import { logout } from '../Redux/Features/Auth/authSlice';
import { RootState } from '../Redux/store';
import { JwtPayload } from 'jwt-decode';

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
    const useCurrentToken = (state: RootState) => state.auth.token;
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token) as JwtPayload&{role: string};
  }

  const dispatch = useAppDispatch();

  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;