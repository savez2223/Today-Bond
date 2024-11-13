import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Container from "../../../components/Container";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import Product from "../../../components/Product/Product";
import Loader from "../../../components/Loader/Loader";

const NewCollection = () => {
  const {
    data: newCollections = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["newCollections"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/newcollections`
      );
      return res.data;
    },
  });

  return (
    <div className="dark:bg-gray-500 pb-10">
      <Container>
        <SectionHeader heading={"New Collection"} />
         {isError && <p className='text-center text-gray-400'>Something went wrong!</p>}
        {isLoading ? (
          <Loader/>
        ) : (
          <div className=" grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5">
            {newCollections.map((item) => (
              <Product key={item.id} item={item} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default NewCollection;
