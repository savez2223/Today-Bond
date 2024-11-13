import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopProvider";
import { FaRegTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const CartItems = () => {
  const { user, products, cartItems, setCartItems, getTotalCartAmount } =
    useContext(ShopContext);

  /* remove product from cart */
  const removeFromCart = (itemId) => {
    const accessToken = localStorage.getItem("access-token");
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (user && accessToken) {
      console.log("clicked");
      fetch(`${import.meta.env.VITE_API_URL}/removefromcart`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "access-token": accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => {
          response.json();
          console.log("clicked2");
        })
        .then((data) => {
          console.log(data);
          toast.success("Item removed from cart!!!");
        });
    } else {
      toast.error("Please Login first!!!");
    }
  };

  return (
    <div className="md:my-10">
      <div className="hidden md:grid grid-cols-lg xl:grid-cols-custom items-center  gap-5 xl:gap-[75px] py-5 xl:text-lg font-semibold text-gray-600 dark:text-white">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {products.map((item) => {
        if (cartItems[item.id] > 0) {
          return (
            <div key={item.id}>
              <div className="grid grid-cols-md md:grid-cols-lg lg:grid-cols-lg xl:grid-cols-custom items-center gap-5 xl:gap-[75px] py-4 xl:py-5 text-base font-medium text-gray-600 dark:text-white">
                <img className="md:h-[62px]" src={item.image} alt="" />
                <p>{item.name}</p>
                <p>${item.new_price}</p>
                <button className="border w-12 h-9 xl:w-16 xl:h-12">
                  {cartItems[item.id]}
                </button>
                <p>${item.new_price * cartItems[item.id]}</p>
                <button onClick={() => removeFromCart(item.id)}>
                  <FaRegTrashAlt className="w-5 h-5 xl:w-6 xl:h-6" />
                </button>
              </div>
              <hr />
            </div>
          );
        }
      })}
      <div className="flex flex-col xl:flex-row gap-10 my-14 xl:my-24">
        <div className="flex flex-1 flex-col xl:mr-48 gap-5 xl:gap-10 text-gray-700 dark:text-white">
          <h1 className="text-lg md:text-2xl font-semibold">Cart Total:</h1>
          <div>
            <div className="flex justify-between py-3.5">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="flex justify-between py-3.5">
              <p>Shipping Free</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="flex justify-between py-3.5 font-semibold text-lg md:text-xl">
              <h3 className="">Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button className="primary-btn w-full">Proceed to checkout</button>
        </div>
        <div className="flex-1 font-medium">
          <p className="text-gray-700 dark:text-white">
            If you have a promo code, Enter it here
          </p>
          <div className="h-14 mx-auto w-11/12 md:w-full mt-3.5 flex items-center">
            <input
              className="border-none outline-none bg-gray-200 w-56 md:w-72 h-14 items-center focus:ring-transparent px-5 md:px-10"
              type="text"
              name=""
              id=""
              placeholder="promocode"
            />
            <button className="w-32 md:w-[200px] h-14 bg-black text-white">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
