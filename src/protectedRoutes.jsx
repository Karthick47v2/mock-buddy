import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoutes = () => {
  const restrictAccess = useSelector(
    (state) => state.practice.restrictResultsAccess
  );

  return restrictAccess ? <Navigate to="/" /> : <Outlet />;
};
