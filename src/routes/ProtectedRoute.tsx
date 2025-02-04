import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentToken } from "../redux/feature/auth/authSlice";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(selectCurrentToken);
  const location = useLocation();

  if (!token) {
    return <Navigate state={location.pathname} to="/login" replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
