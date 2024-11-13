import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopProvider';
import { Navigate, useLocation } from "react-router-dom";
import Loader from '../components/Loader/Loader';
import { toast } from "react-hot-toast";

const PrivateRoute = ({children}) => {
  const { user, loading } = useContext(ShopContext);
  const location = useLocation();

  if (loading) {
    return <Loader height={"h-screen"} />;
  }

  if (user) {
    return children;
  }else{
    // Display toast message when user is not authenticated and redirected to login page
    toast.error("Please login to access this page.");
  }
  
  return <Navigate to="/login" state={{ form: location }} replace></Navigate>;
};

export default PrivateRoute;