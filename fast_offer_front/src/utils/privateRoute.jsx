import { useContext } from "react";
import {Navigate, Outlet} from "react-router-dom";
import AuthContext from "@context/AuthContext.jsx";

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);

  if (user) return <Outlet />;

  return <Navigate to="/" replace />
};

export default PrivateRoute;
