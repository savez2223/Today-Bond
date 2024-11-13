import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user, loading } = useContext(ShopContext);
  const [axiosSecure] = useAxiosSecure();

  const { data: userData = [], refetch } = useQuery({
    queryKey: ["userData", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res.data;
    },
  });
  return [userData];
};

export default useRole;
