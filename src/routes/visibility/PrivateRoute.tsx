import { useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { getProfile } from "../../api/services/auth";



const PrivateRoute = () => {
  const {setIsLoading,setIsAuthenticated,setAuth} = useAuthStore();
  const navigate = useNavigate();

  if (!localStorage.getItem('token')) {
    return <Navigate to={"/login"} />;
  }
  const token = localStorage.getItem('token');
  useEffect(() => {
    setIsLoading(true);
    const profile = async () => {
      try {
        const userInfo = await getProfile(token!);
        setAuth(userInfo);
      } catch (error:any) {
        console.error('Error fetching user profile:', error);
        if (error.response.data.error) {
          window.alert('Session Expired, Please Login Again');
          localStorage.removeItem('token');
          navigate('/login');
        }
      }finally{
        setIsLoading(false);
      }
    }
    if (token) {
      setIsAuthenticated(true);
      profile();
    }

  }, []);
  return <Outlet />;
};

export default PrivateRoute;