import React from "react";
import banner from "../../../assets/images/banner.png";
import snow from "../../../assets/images/snowman.png";
import {
  FaFacebookF,
  FaTwitter,
  FaTiktok,
  FaInstagram,
  FaLongArrowAltRight,
} from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import Container from "../../../components/Container";
import { Link } from "react-router-dom";
import Reveal from "../../../components/FramerMotion/Reveal";

const Banner = () => {
  return (
    <div className="max-h-screen md:pt-24 pt-20  dark:bg-gray-500">
      {/* bg-gradient-to-r from-amber-200 to-yellow-500 */}
      <Container>
        {/* for small screen */}
        <p className="sm:hidden text-xs sm:text-sm md:text-base text-gray-700 dark:text-white mb-2 md:font-semibold flex items-center justify-center gap-2 md:gap-7 my-3">
          Dive into Winter Collection Now!{" "}
          <img className="w-7 md:w-20" src={snow} />
        </p>

        <div className="mt-5 md:mt-0 flex flex-col md:flex-row justify-between items-center gap-y-10 md-gap-y-5 gap-5">
          <div className=" flex-col gap-10 hidden md:flex">
            <a href="">
              <FaFacebookF className="w-5 h-5 text-gray-400 hover:text-gray-600 hover:scale-105 transition-all duration-200" />
            </a>
            <a href="">
              <FaInstagram className="w-5 h-5 text-gray-400 hover:text-gray-600 hover:scale-105 transition-all duration-200" />
            </a>
            <a href="">
              <FaTwitter className="w-5 h-5 text-gray-400 hover:text-gray-600 hover:scale-105 transition-all duration-200" />
            </a>
            <a href="">
              <FaTiktok className="w-5 h-5 text-gray-400 hover:text-gray-600 hover:scale-105 transition-all duration-200" />
            </a>
          </div>

          <div className="flex  justify-center items-center gap-2">
            <div>
              <p className="text-xs sm:text-sm md:text-base text-gray-700 dark:text-white mb-2 md:font-semibold sm:flex items-end md:gap-7 hidden">
                Dive into Winter Collection Now!{" "}
                <img className="w-10 md:w-20" src={snow} />
              </p>
              <p className="lg:text-7xl md:text-5xl text-2xl leading-none font-robotoSlab font-semibold md:max-w-sm pb-5  md:my-5 bg-gradient-to-br from-pink-500 to-orange-400 text-transparent bg-clip-text">
                Shop Now & Elevate Your Style!
              </p>
              <Link to="/collections" className="outline-btn group">
                <span className="text-xs md:text-base relative flex items-center gap-1 md:gap-2 px-2 py-1 md:px-5 md:py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-500 rounded-md group-hover:bg-opacity-0">
                  Explore More <FaArrowRightLong className="md:w-4 md:h-4" />
                </span>
              </Link>
            </div>
            <img
              className="w-5/12 md:w-6/12 transform md:scale-100 scale-x-[-1]"
              src={banner}
              alt=""
            />
          </div>

          <div className="flex gap-4 md:gap-2 md:flex-col  md:gap-y-8 dark:text-white">
            <div>
              <Reveal>
                <p className="text-xs md:text-sm">new items</p>
                <Link className="text-sm md:text-base font-medium md:font-semibold ">
                  Special Price
                </Link>
              </Reveal>
            </div>
            <hr className="hidden md:block" />
            <div>
              <Reveal>
                <p className="text-xs md:text-sm">Stylist Hoodies</p>
                <Link className="text-sm md:text-base font-medium md:font-semibold">
                  New Arrival
                </Link>
              </Reveal>
            </div>
            <hr className="hidden md:block" />
            <div>
              <Reveal>
                <p className="text-xs md:text-sm">Winter Collection</p>
                <Link className="text-sm md:text-base font-medium md:font-semibold">
                  Trending
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
