import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";


const GuestRoute = () => {
  if (localStorage.getItem('token')) {
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
};

export default GuestRoute;
