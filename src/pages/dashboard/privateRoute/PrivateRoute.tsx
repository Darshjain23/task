import React from "react";
import { Navigate } from "react-router-dom";

interface privateProp {
  children: React.ReactNode;
}
const PrivateRoute = ({ children }: privateProp) => {
  const getToken = localStorage.getItem("user-info");
  
  // const data = useLocation();
  // console.log(data)

  return getToken ? children : <Navigate to="/" />;
};

export default PrivateRoute;
