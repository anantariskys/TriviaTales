import { Outlet, Navigate } from "react-router-dom";


const GuestRoute = () => {
  if (localStorage.getItem('token')) {
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
};

export default GuestRoute;
