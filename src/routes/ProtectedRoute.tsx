import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  logout,
  selectCurrentToken,
  TAuthUser,
} from "../redux/feature/auth/authSlice";
import { Navigate, useLocation } from "react-router-dom";
import { verifyToken } from "../utils/verifyToken";
import { TUser } from "../types/user.type";
type TProtectedRouteProps = {
  children: ReactNode;
  role?: string | undefined;
};
const ProtectedRoute = ({ children, role }: TProtectedRouteProps) => {
  const token = useAppSelector(selectCurrentToken);
  const location = useLocation();
  //

  // let user;

  // if (token) {
  //   user = verifyToken(token) as TUser;
  // }
  let user: TAuthUser | null = null;
  if (token) {
    const decodedToken = verifyToken(token) as unknown as Partial<TAuthUser>;
    if (decodedToken?.data) {
      user = decodedToken as TAuthUser; // Now we safely assert it
    }
  }

  const dispatch = useAppDispatch();
  // console.log("user", user);
  // console.log("role", role);

  if (user?.data?.role !== role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }

  //

  if (!token) {
    return <Navigate state={location.pathname} to="/login" replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
