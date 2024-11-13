import { Dropdown, Navbar } from "flowbite-react";
import { useContext, useState } from "react";
import Container from "../Container";
import { Link } from "react-router-dom";
import Logo from "../../assets/biglogo.png";
import { FiMoon, FiSun, FiUser } from "react-icons/fi";
import { BsCart3 } from "react-icons/bs";
import { MdMenu } from "react-icons/md";

import ActiveLink from "../ActiveLink/ActiveLink";
import { ShopContext } from "../../Context/ShopProvider";
import useRole from "../../hooks/useRole";

const Navbar2 = () => {
  const [userData] = useRole();
  const { getTotalCartItems, user, logOut, theme, setTheme } =
    useContext(ShopContext);

  /* handle theme toggle */
  const handleThemeToggle = () => {
    setTheme((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };
  return (
    <Container>
      <Navbar
        rounded
        className="bg-white border-gray-200 dark:bg-gray-500 shadow-md fixed w-full z-20 top-0 start-0 py-4 "
      >
        <Navbar.Brand href="https://flowbite-react.com">
          <Link href="/">
            <img src={Logo} className="w-32 md:w-56" alt="Flowbite Logo" />
          </Link>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <div className="flex md:gap-7 space-x-4 md:space-x-0 rtl:space-x-reverse mr-5">
            <Link to="/cart" className="relative mt-2 md:mt-[1px]">
              <BsCart3 className="w-5 h-5 md:w-6 md:h-6 dark:text-white" />
              <span className="absolute -top-1.5 -right-2 bg-primary rounded-full font-medium text-[10px] px-1.5 py-[1px] text-white">
                {getTotalCartItems()}
              </span>
            </Link>
            <button onClick={handleThemeToggle}>
              {theme == "light" ? (
                <FiMoon
                  className={`w-5 h-5 md:w-6 md:h-6 dark:text-white animate-rotate`}
                />
              ) : (
                <FiSun
                  className={`w-5 h-5 md:w-6 md:h-6 dark:text-white animate-rotate`}
                />
              )}
            </button>
          </div>
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <FiUser className="w-5 h-5 md:w-6 md:h-6 dark:text-white me-4 md:me-0" />
            }
          >
            <Dropdown.Header>
              {!user ? (
                <span className="block text-sm text-gray-900 dark:text-white">
                  Please login & enjoy
                </span>
              ) : (
                <>
                  <span className="block text-sm text-gray-900 dark:text-white">
                    Welcome {userData.name}
                    <br />
                    {userData.email}
                  </span>
                </>
              )}
            </Dropdown.Header>
            {user ? (
              userData.role === "admin" ? (
                <>
                  <Link to="/dashboard">
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                  </Link>

                  <Dropdown.Item onClick={() => logOut()}>
                    Sign out
                  </Dropdown.Item>
                </>
              ) : (
                <>
                  <Link to="/cart">
                    <Dropdown.Item>My Cart</Dropdown.Item>
                  </Link>
                  <Dropdown.Item onClick={() => logOut()}>
                    Sign out
                  </Dropdown.Item>
                </>
              )
            ) : (
              <>
                <Link to="/login">
                  <Dropdown.Item>Login</Dropdown.Item>
                </Link>
                  <Link to="/signup">
                    <Dropdown.Item>Signup</Dropdown.Item>
                  </Link>
              </>
            )}
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <ActiveLink to="/" active>
            Home
          </ActiveLink>
          <ActiveLink to="/collections">Shop</ActiveLink>
          <ActiveLink to="/men">Men</ActiveLink>
          <ActiveLink to="/women">Women</ActiveLink>
          <ActiveLink to="/kids">Kids</ActiveLink>
          <Link to="/login" className="md:hidden ms-3 mt-1.5">
            Login
          </Link>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default Navbar2;
