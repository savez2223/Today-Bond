import React from "react";
import logo from "../../assets/biglogo.png";
import facebook from "../../assets/social/facebook.png";
import instagram from "../../assets/social/instagram.png";
import tiktok from "../../assets/social/tiktok.png";
import twitter from "../../assets/social/twitter.png";
import youtube from "../../assets/social/youtube.png";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaHeadset,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import Container from "../Container";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div>
      <footer className=" py-14 bg-amber-100 dark:bg-gray-600 text-base-content">
        <Container>
          <div className="flex flex-col md:flex-row justify-between  gap-10 md:gap-0">
            <aside className="md:w-1/4">
              <img loading="lazy" className="w-52 md:w-64" src={logo} />
              <p className="text-sm ms-2 mt-2 dark:text-white">
                Your Trusted Destination for Quality Products, Exceptional
                Service, and Unbeatable Convenience
              </p>
              <div className="flex justify-start space-x-4 mt-5 ms-2 md:py-4">
                <Link to="#">
                  <img className="w-6 md:w-8" src={facebook} alt="" />
                </Link>
                <Link to="#">
                  <img className="w-6 md:w-8" src={instagram} alt="" />
                </Link>
                <Link to="#">
                  <img className="w-6 md:w-8" src={tiktok} alt="" />
                </Link>
                <Link to="#">
                  <img className="w-6 md:w-8" src={twitter} alt="" />
                </Link>
                <Link to="#">
                  <img className="w-6 md:w-8" src={youtube} alt="" />
                </Link>
              </div>
            </aside>
            <nav>
              <header className="font-bold text-xl mb-3 dark:text-white">
                Contact Us
              </header>
              <div className="flex flex-col space-y-3 text-base dark:text-white">
                <p className="flex items-center gap-1">
                  <FaWhatsapp />
                  +88 01711-22334455
                </p>
                <p className="flex items-center gap-1">
                  <FaPhoneAlt />
                  +88 01711-22334455
                </p>
                <p className="flex items-center gap-1">
                  <FaHeadset />
                  +88 09811-222333
                </p>
                <span className="text-xs -mt-5">
                  SUNDAY-THURSDAY(10:30 AM-5:00 PM)
                </span>
                <p className="flex items-center gap-1">
                  <FaEnvelope />
                  mmbmart@inqury.com
                </p>
              </div>
            </nav>
            <nav>
              <header className="font-bold text-xl mb-3 dark:text-white ">
                Quick Links
              </header>
              <div className="flex md:flex-col gap-4 md:gap-0 items-center md:items-start md:space-y-3 text-base  dark:text-white">
                <Link to="/" className="link link-hover hover:text-amber-500">
                  Shop
                </Link>
                <Link to="/men" className="link link-hover hover:text-amber-500">
                  Men
                </Link>
                <Link to="/women" className="link link-hover hover:text-amber-500">
                  Women
                </Link>
                <Link to="/kids" className="link link-hover hover:text-amber-500">
                  Kids
                </Link>
              </div>
            </nav>
            <form className="md:w-1/4">
              <header className="font-bold text-xl mb-3 dark:text-white">
                Our Address
              </header>
              <p className=" dark:text-white pb-3">
                Ahmed Tower (9th Floor), 28 & 30, Kamal Ataturk Avenue, Banani
                C/A, Dhaka-1213
              </p>
              <p className=" dark:text-white">
                Shop# 18,19,20 Block# D, Level# 01, Ka-244,Progoti sarani,
                Baridhara, Dhaka
              </p>
            </form>
          </div>
        </Container>
      </footer>
      <div className="text-center p-6 bg-amber-100 dark:bg-gray-600 text-base-content border-t border-slate-300">
        <p className="dark:text-white">
          Copyright © {year} - All right reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
