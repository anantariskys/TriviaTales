import { BrowserRouter as Router, RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./visibility/PrivateRoute";
import GuestRoute from "./visibility/GuestRoute";
import Login from "../pages/Login";
import Quiz from "../pages/Quiz";
import Main from "../pages/Main";
import Result from "../pages/Result";

const createRouter = createBrowserRouter([

 
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <Main/>,
      },
      {
        path: "/quiz",
        element: <Quiz/>,
      },
      {
        path: "/result",
        element: <Result/>,
      },
      
    
    ],
  },
  
  {
    path:'/',
    element: <GuestRoute />,
    children: [
      {
        path: "login",
        element: <Login/>,
      },
   
    ],
  },
//   {
//     path: "*",
//     element: <NotFound />,
//   },
]);

const Route = () => {
    
  
  return (
   
        <RouterProvider router={createRouter} />
       
  );
};

export default Route;