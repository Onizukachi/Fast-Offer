import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  let [user, setUser] = useState(null)

  if (!user.token) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;