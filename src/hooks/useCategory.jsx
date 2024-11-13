import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useCategory = (category) => {
  const {
    data: categoriesWiseProducts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categoriesWiseProducts", category], // Include category in the query key
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/categories/${category}`
        );
        return res.data;
      } catch (error) {
        throw new Error("Failed to fetch category products");
      }
    },
  });
  return [categoriesWiseProducts, isLoading, isError];
};

export default useCategory;
