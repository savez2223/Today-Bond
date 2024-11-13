import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopProvider";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(ShopContext);
  const location = useLocation();
  const [checkAdmin,checkAdminLoading]=useAdmin(); 

  if (loading || checkAdminLoading) {
    // Check both loading states
    return <Loader height={"h-screen"} />;
  }

  if (user && checkAdmin) {
    return children;
  } else {
    // Display toast message when user is not authenticated or not an admin
    toast.error("Unauthorized access!!!");
    return <Navigate to="/login" state={{ form: location }} replace />;
  }
};

export default AdminRoute;
