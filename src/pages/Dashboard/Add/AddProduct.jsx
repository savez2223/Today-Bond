import { useState } from "react";
import DashboardHeader from "../../../components/SectionHeader/DashboardHeader";
import { useForm, Controller } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import CreatableSelect from "react-select/creatable";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [axiosSecure] = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const [options, setOptions] = useState([
    { value: "shirt", label: "Shirt" },
    { value: "tshirt", label: "T-shirt" },
    { value: "panjabi", label: "Panjabi" },
    { value: "jacket", label: "Jacket" },
    { value: "hoodie", label: "Hoodie" },
    { value: "pant", label: "Pant" },
    { value: "saree", label: "Saree" },
    { value: "kurta", label: "Kurta" },
    { value: "tops", label: "Tops" },
    { value: "blouse", label: "Blouse" },
  ]);

  /* to change upload image button text */
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const handleImageChange = (image) => {
    let shortenedName = image.name;
    if (image.name.length > 20) {
      shortenedName = image.name.substring(0, 20) + "...";
    }
    setUploadButtonText(shortenedName);
  };

  // Function to handle adding a new option
  const handleCreateOption = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };
    setOptions([...options, newOption]);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const productInfo = {
      name: data.product_title,
      image: "",
      category: data.category,
      sub_category: data.subcategory.value,
      new_price: data.offer_price,
      old_price: data.price,
      ratings: data.ratings,
      description: data.description,
    };
    console.log(productInfo);
    /* let responseData; */
    let product = productInfo;

    try {
      let formData = new FormData();
      formData.append("product", data.image[0]);

      const responseUpload = await axiosSecure.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (responseUpload.data.success) {
        productInfo.image = responseUpload.data.image_url;
        console.log(productInfo);

        /* send data to api to add in db */
        const responseAddProduct = await axiosSecure.post(
          "/addproduct",
          productInfo
        );
        reset();
        setUploadButtonText("Upload Image");
        console.log(responseAddProduct.data);
        setLoading(false);
        toast.success("Product added successfully");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="">
      <Helmet>
        <title>Add Product</title>
      </Helmet>
      <DashboardHeader title={"Add Product"} />
      <div className="my-8 md:w-9/12 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <div>
              <label htmlFor="product_name" className="add-product-label">
                Product Title
              </label>
              <input
                type="text"
                id="product_title"
                className="add-input-field"
                placeholder="Product Title"
                {...register("product_title", { required: true })}
              />
              {errors.product_title && (
                <span className="text-xs text-red-500">
                  Title is required *
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5 ">
              <div>
                <label htmlFor="price" className="add-product-label">
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  className="add-input-field"
                  placeholder="price $"
                  {...register("price", { required: true })}
                />
                {errors.price && (
                  <span className=" text-xs text-red-500">
                    Please select product price *
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="offer_price" className="add-product-label">
                  Offer Price
                </label>
                <input
                  type="text"
                  id="offer_price"
                  className="add-input-field"
                  placeholder="offer price $"
                  {...register("offer_price", { required: true })}
                />
                {errors.offer_price && (
                  <span className=" text-xs text-red-500">
                    Please select product offer price *
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5 ">
              <div>
                <label htmlFor="category" className="add-product-label">
                  Category
                </label>
                <select
                  className="add-input-field"
                  defaultValue=""
                  name="category"
                  {...register("category", { required: true })}
                >
                  <option value=""> Select </option>
                  <option value="men"> Men </option>
                  <option value="women"> Women </option>
                  <option value="kids"> Kids </option>
                </select>
                {errors.category && (
                  <span className=" text-xs text-red-500">
                    Please select any category *
                  </span>
                )}
              </div>
              <div className="">
                <label htmlFor="seats" className="add-product-label">
                  Sub-Category
                </label>
                <Controller
                  name="subcategory"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CreatableSelect
                      {...field}
                      options={options}
                      className="!dark:text-white !dark:bg-gray-700"
                      isClearable
                      onCreateOption={handleCreateOption}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          padding: "2.2px 0",
                          borderRadius: "8px",
                          fontSize: "14px",
                          background: "#f9fafb",
                          borderColor: state.isFocused ? "grey" : "#22d3ee",
                        }),
                      }}
                    />
                  )}
                />
                {errors.subcategory && (
                  <span className=" text-xs text-red-500">
                    Please select any subcategory *
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="mb-5 grid grid-cols-1 md:grid-cols-2 md:gap-5 ">
            <div>
              <label htmlFor="ratings" className="add-product-label">
                Ratings
              </label>
              <input
                type="text"
                id="ratings"
                className="add-input-field"
                placeholder="Ratings"
                {...register("ratings", { required: true })}
              />
              {errors.ratings && (
                <span className="text-xs text-red-500">
                  Ratings is required *
                </span>
              )}
            </div>
            <div>
              <label htmlFor="description" className="add-product-label">
                Description
              </label>
              <textarea
                id="description"
                className="add-input-field"
                placeholder="Write Class Description..."
                rows="2"
                {...register("description", { required: false })}
              />
            </div>
          </div>
          <div className="mb-5">
            <div className=" p-4 bg-gray-50 w-full  m-auto rounded-lg">
              <div className="px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      className="text-xs cursor-pointer w-36 hidden"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      hidden
                      {...control.register("image", {
                        onChange: (e) => handleImageChange(e.target.files[0]),
                        required: true,
                      })}
                      /* {...control,register("image", {
                        required: true,
                      })} */
                      /* onChange={handleImageChange} */
                    />
                    <div className="bg-cyan-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-cyan-500">
                      {uploadButtonText}
                    </div>
                  </label>

                  {errors.image && (
                    <span className="text-xs text-red-500">
                      Please select an image *
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn primary-btn text-white bg-red-500 hover:bg-red-600 w-full"
          >
            {loading ? (
              <ImSpinner9 className="m-auto animate-spin" size={24} />
            ) : (
              "Add Product"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
