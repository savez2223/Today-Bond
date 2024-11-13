import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";


const Breadcrum = ({ product }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center text-xs md:text-base font-semibold text-gray-600 dark:text-white mt-10 mb-4 md:my-10">
      <div className="flex">
        <Link to="/">HOME</Link>{" "}
        <MdOutlineKeyboardArrowRight className="w-5 h-4 md:w-6 md:h-6" />{" "}
        <Link to="/collections">SHOP</Link>{" "}
        <MdOutlineKeyboardArrowRight className="w-5 h-4 md:w-6 md:h-6" />
        <Link to='/men' className="uppercase">{product.category}</Link>
        <MdOutlineKeyboardArrowRight className="w-5 h-4 md:w-6 md:h-6" />
      </div>
      <p>{product.name}</p>
    </div>
  );
};

export default Breadcrum;
