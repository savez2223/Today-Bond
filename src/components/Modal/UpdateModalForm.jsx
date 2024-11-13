import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";
import CreatableSelect from "react-select/creatable";


const UpdateModalForm = ({ product,handleUpdate,loading }) => {

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

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  // Function to handle adding a new option
  const handleCreateOption = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };
    setOptions([...options, newOption]);
  };


  return (
    <div>
      <form onSubmit={handleSubmit(handleUpdate)}>
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
              defaultValue={product.name}
              {...register("product_title", { required: true })}
            />
            {errors.product_title && (
              <span className="text-xs text-red-500">Title is required *</span>
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
                defaultValue={product.old_price}
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
                defaultValue={product.new_price}
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
                defaultValue={product.category}
                name="category"
                {...register("category", { required: true })}
              >
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
                    defaultValue={{
                      value: product.sub_category,
                      label: product.sub_category,
                    }}
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
              defaultValue={product.ratings}
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
              defaultValue={product.description}
              placeholder="Write Class Description..."
              rows="2"
              {...register("description", { required: false })}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn primary-btn text-white bg-red-500 hover:bg-red-600 w-full"
        >
          {loading ? (
            <ImSpinner9 className="m-auto animate-spin" size={24} />
          ) : (
            "Update Data"
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateModalForm;
