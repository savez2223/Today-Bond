import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../Context/ShopProvider";
import {useParams } from "react-router-dom";
import Breadcrum from "../../components/Breadcrum/Breadcrum";
import { Rating } from "@smastrom/react-rating";
import Container from "../../components/Container";
import Description from "../../components/Description/Description";
import Reviews from "../../components/Reviews/Reviews";
import LoadPageTop from "../../components/LoadPageTop/LoadPageTop";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import useRole from "../../hooks/useRole";
import { Helmet } from "react-helmet-async";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";

const ProductDetails = () => {
  const { user, setCartItems } = useContext(ShopContext);
  const { itemName } = useParams();
  const [userData] = useRole();

  //console.log(userData);
  /* fetch poduct details from api */
  const {
    data: product = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["productDetails", itemName],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/product/details/${itemName}`
        );
        return res.data;
      } catch (error) {
        throw new Error("Failed to fetch category products");
      }
    },
  });

  /* refetch the page after select new items */
  useEffect(() => {
    refetch();
  }, [itemName, refetch]);

  /* add product to cart */
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    const accessToken = localStorage.getItem("access-token");
    /* check if user logged in */
    if (user && accessToken) {
      fetch(`${import.meta.env.VITE_API_URL}/addtocart`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "access-token": accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          toast.success("Item added to cart!!!");
        });
    } else {
      toast.error("Please Login first!!!");
    }
  };

  //console.log(product);
  const {
    id,
    name,
    image,
    ratings,
    old_price,
    new_price,
    category,
    sub_category,
  } = product;
  /*  const [categoriesWiseProducts] = useCategory(category); */
  const [activeComponent, setActiveComponent] = useState("Description");

  // Function to handle component toggle
  const handleComponentToggle = (component) => {
    setActiveComponent(component);
  };

  /* for image gallery */
  const [activeImage, setActiveImage] = useState(0);

  const handleImageClick = (index) => {
    setActiveImage(index);
  };

  /* right now using single image thats why make a object of four image with different index */
  const images = [
    {
      id: 1,
      src: image,
    },
    {
      id: 2,
      src: image,
    },
    {
      id: 3,
      src: image,
    },
    {
      id: 4,
      src: image,
    },
  ];

  return (
    <div className="py-12 md:py-20 dark:bg-gray-500">
      <Helmet>
        <title>{name}</title>
      </Helmet>
      <LoadPageTop />
      <Container>
        <Breadcrum product={product} />
        {isLoading && <Loader height={"h-screen"} />}
        <div className="flex flex-col md:flex-row gap-5 md:gap-0">
          <div className="md:w-1/2   flex  lg:flex-col-reverse xl:flex-row gap-3">
            <div className="flex flex-col lg:flex-row xl:flex-col gap-[10px] md:gap-[15px]">
              {images.map((image, index) => (
                <img
                  key={image.id}
                  className={`w-[102px] md:w-[90px] lg:w-[90px] xl:w-40 cursor-pointer ${
                    activeImage === index ? "border  border-amber-500" : ""
                  }`}
                  src={image.src}
                  alt=""
                  onClick={() => handleImageClick(index)}
                />
              ))}
            </div>
            <div>
              <img
                className="w-[450px] md:w-[500px] lg:w-[500px] xl:w-[700px]"
                src={images[activeImage].src}
                alt=""
              />
            </div>
          </div>
          <div className="md:w-1/2  flex flex-col md:mx-8 lg:mx-14 xl:mx-15">
            <h1 className="text-xl md:text-2xl lg:text-3xl xl:4xl font-medium md:font-bold text-gray-700 dark:text-white">
              {name}
            </h1>
            <div className="flex items-center my-3 ">
              <Rating
                style={{ maxWidth: 100 }}
                value={Math.round(ratings || 0)}
                readOnly
              />
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                {ratings}
              </span>
            </div>
            <div className="flex gap-8 text-lg md:text-2xl my-2 lg:my-4 xl:my-8 font-semibold md:font-bold">
              <p className="line-through text-gray-400">${old_price}</p>
              <p className="text-red-500 dark:text-white">${new_price}</p>
            </div>
            <div>
              <p className="dark:text-white">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam
                dolores repellat, veniam optio ea illo similique consequuntur
                tempore porro mollitia.
              </p>
            </div>
            <div>
              <p className="text-lg md:text-xl font-semibold mt-4 lg:mt-8 text-gray-600 dark:text-white">
                Select Size
              </p>
              <div className="flex gap-4 md:gap-5 my-4 lg:my-6">
                <div className="product_size">S</div>
                <div className="product_size">M</div>
                <div className="product_size">L</div>
                <div className="product_size">XL</div>
                <div className="product_size">XXL</div>
              </div>
            </div>
            <div>
              <button
                onClick={() => {
                  addToCart(id);
                }}
                className={`${
                  userData?.role === "admin"
                    ? "bg-gray-500 px-5 py-2.5 md:py-3 w-full text-white text-sm md:text-base rounded-lg font-medium"
                    : "primary-btn w-full"
                }`}
                disabled={userData?.role === "admin"}
              >
                ADD TO CART
              </button>
            </div>
            <div className="dark:text-white mt-5 capitalize">
              <span className="font-semibold">Category:</span> {category},{" "}
              {sub_category}
            </div>
            <div className="dark:text-white  capitalize">
              <span className="font-semibold">Tags:</span> Modern, Latest
            </div>
          </div>
        </div>
        <div className="mt-16 md:mt-28">
          <button
            onClick={() => handleComponentToggle("Description")}
            className={`border px-9 md:px-10 py-3 font-semibold ${
              activeComponent === "Description" ? "bg-gray-200" : ""
            }`}
          >
            Description
          </button>
          <button
            onClick={() => handleComponentToggle("Reviews")}
            className={`border px-9 md:px-10 py-3 font-semibold  ${
              activeComponent === "Reviews" ? "bg-gray-200" : ""
            }`}
          >
            Reviews
          </button>
        </div>
        {activeComponent === "Description" ? <Description /> : <Reviews />}
        <RelatedProducts category={category} />
      </Container>
    </div>
  );
};

export default ProductDetails;
