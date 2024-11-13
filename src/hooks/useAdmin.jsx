import { useContext } from "react";
import { ShopContext } from "../Context/ShopProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
    const {user,loading}=useContext(ShopContext);
  const [axiosSecure] = useAxiosSecure();

  const { data: checkAdmin, isLoading: checkAdminLoading } = useQuery({
    queryKey: ["checkAdmin"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/admin/${user?.email}`);
      return res.data.admin;
    },
  });
  return [checkAdmin, checkAdminLoading];
};

export default useAdmin;
