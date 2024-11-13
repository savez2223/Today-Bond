import Container from "../../components/Container";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { useParams } from "react-router-dom";
import Product from "../../components/Product/Product";
import LoadPageTop from "../../components/LoadPageTop/LoadPageTop";
import banner from "../../assets/images/offerban.png";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import { Helmet } from "react-helmet-async";

const CategoryWise = () => {
  const { sub_category } = useParams();
  console.log(sub_category);
  /* get sub categories data from api */
  const {
    data: subCategoriseData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["subCategoriseData"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/subcategories/${sub_category}`
      );
      return res.data;
    },
  });

  if(isError){
    <p>erorororororro</p>
  }
  return (
    <div className="pt-[75px] md:pt-[81px] dark:bg-gray-500">
      <Helmet>
        <title>{sub_category}</title>
      </Helmet>
      <LoadPageTop />
      <div className="flex justify-center items-center p-2 lg:p-4 ">
        <img loading="lazy" className="rounded-xl" src={banner} alt="" />
      </div>

      <Container>
        <SectionHeader heading={sub_category} />
        {isError && (
          <p className="my-[10vh] pb-10 text-center text-lg md:text-2xl font-medium text-slate-400">
            Something went wrong!
          </p>
        )}
        {isLoading ? (
          <Loader height={"h-[40vh]"} />
        ) : subCategoriseData.length <= 0 ? (
          <p className="my-[10vh] pb-10  text-center text-lg md:text-2xl font-medium text-slate-400">
            No items found
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5 pb-10 md:pb-12">
            {subCategoriseData.map((item) => (
              <Product key={item.id} item={item} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default CategoryWise;
