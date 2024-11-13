import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const useProducts = () => {
    const { data: products = [], isLoading,refetch } = useQuery({
      queryKey: ["products"],
      queryFn: async () => {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/allproducts`
        );

        return res.data;
      },
    });
    return [products, isLoading,refetch];
};

export default useProducts;