import React, { useContext, useState } from "react";
import { ShopContext } from "../../Context/ShopProvider";
import Carousel from "../../components/Carousel/Carousel";
import Container from "../../components/Container";
import Panjabi from "../../assets/carousel/kids/panjabi.webp";
import frock from "../../assets/carousel/kids/frock.jpg";
import tshirt from "../../assets/carousel/kids/tshirt.webp";
import shirt from "../../assets/carousel/kids/shirt.jpg";
import tops from "../../assets/carousel/kids/tops.webp";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import TypingEffect from "../../components/TypingEffect/TypingEffect";
import Product from "../../components/Product/Product";
import LoadPageTop from "../../components/LoadPageTop/LoadPageTop";
import useCategory from "../../hooks/useCategory";
import Loader from "../../components/Loader/Loader";
import { useParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import { Helmet } from "react-helmet-async";

const Kids = () => {
  const [products] = useProducts();
  const [showAll, setShowAll] = useState(false);
  const [selectCategory, setSelectCategory] = useState("");

  const images = [
    { id: 1, src: Panjabi },
    { id: 2, src: tops },
    { id: 3, src: shirt },
    { id: 4, src: tshirt },
    { id: 5, src: frock },
  ];
  const words = ["Panjabi", "Tops", "Shirt", "T-Shirt", "Frock"];

  /* use hook to get data from db  */
  const [categoriesWiseProducts, isLoading, isError] = useCategory("kids");
  //console.log(categoriesWiseProducts);

  /* show all toggle */
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  /* handle data filter */
  const handleCategoryChange = (e) => {
    setSelectCategory(e.target.value);
  };

  /* filtered data */
  const filteredProducts = selectCategory
    ? categoriesWiseProducts.filter(
        (product) => product.sub_category === selectCategory
      )
    : categoriesWiseProducts;

  return (
    <div className="pt-12 md:pt-24 dark:bg-gray-500">
      <Helmet>
        <title>Kids</title>
      </Helmet>
      <LoadPageTop />
      <Container>
        <div className=" flex flex-col gap-y-5 md:flex-row justify-center items-center py-10">
          <div className="md:w-1/2  dark:text-white text-center ">
            <p className="text-sm md:text-lg py-2 dark:text-white text-red-500 font-semibold hidden md:flex">
              Check Out New Collections{" "}
            </p>
            <h2 className="text-lg sm:text-2xl md:text-6xl font-medium  sm:font-semibold ">
              Elevate Your Style with our Premier Kids's Collections
            </h2>
            <p className="mt-2 md:mt-5 text-sm md:text-2xl mb-2 md:mb-0 md:py-4 dark:text-white text-amber-500 font-medium md:font-semibold">
              Exclusive Collections
            </p>

            {/* typing animation */}
            <TypingEffect words={words} />
          </div>

          <div className="w-10/12 md:w-1/2">
            <Carousel images={images} />
          </div>
        </div>
        <div>
          <SectionHeader heading={"Kids"} />
          <div className="flex justify-between mb-5">
            <p className="text-sm md:text-base md:font-semibold dark:text-white">
              Showing {categoriesWiseProducts.length} out of {products.length}{" "}
              products
            </p>
            <div className="flex items-center gap-4 ">
              <form className="max-w-sm " onChange={handleCategoryChange}>
                <div className="flex flex-col md:flex-row items-center gap-2">
                  <label
                    htmlFor="underline_select"
                    className="text-sm md:text-base md:font-semibold dark:text-white"
                  >
                    Sort by
                  </label>
                  <select
                    id="underline_select"
                    className="block w-sm text-sm font-medium text-gray-600 bg-transparent dark:bg-gray-500 border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-white focus:outline-none focus:ring-0 focus:border-gray-200 peer px-2"
                  >
                    <option value="" selected="">
                      All
                    </option>
                    <option value="shirt">Shirt</option>
                    <option value="tshirt">T-Shirt</option>
                    <option value="tops">Tops</option>
                    <option value="pant">Pant</option>
                    <option value="panjabi">Panjabi</option>
                    <option value="kurta">Kurta</option>
                    <option value="frock">Frock</option>
                    <option value="jacket">Jacket</option>
                    <option value="hoodie">Hoodie</option>
                  </select>
                </div>
              </form>
            </div>
          </div>
          {isError && (
            <p className="text-center text-gray-400 my-4">
              Something went wrong!
            </p>
          )}
          {isLoading ? (
            <Loader height={"h-[40vh]"} />
          ) : (
            <>
              {filteredProducts.length === 0 ? (
                <div className="text-center text-gray-400 my-8">
                  No item found!
                </div>
              ) : (
                <div className=" grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5 pb-10 md:pb-12">
                  {showAll
                    ? filteredProducts.map((item) => (
                        <Product key={item.id} item={item} />
                      ))
                    : filteredProducts
                        .slice(0, 8)
                        .map((item) => <Product key={item.id} item={item} />)}
                </div>
              )}
            </>
          )}
        </div>
        {filteredProducts.length > 6 && !showAll && (
          <div className="text-center pb-5 md:pb-10">
            <button onClick={toggleShowAll} type="btn" className="primary-btn">
              Explore More
            </button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Kids;
