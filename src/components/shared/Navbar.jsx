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

const Navbar = () => {
  const [userData] = useRole();
  //console.log(userData.role);
  const { getTotalCartItems,products, cartItems, user, logOut, theme, setTheme } =
    useContext(ShopContext);
  //console.log(cartItems);
  const [isOpen, setIsOpen] = useState(false);
 
  /* handle theme toggle */
  const handleThemeToggle = () => {
    setTheme((prevMode) => (prevMode === "light" ? "dark" : "light"));
    /* setIsRotated(!isRotated); */
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-500 shadow-md fixed w-full z-20 top-0 start-0">
      <Container>
        <div className=" flex flex-wrap items-center justify-between mx-auto py-4">
          <Link href="/">
            <img src={Logo} className="w-32 md:w-56" alt="Flowbite Logo" />
          </Link>
          <div className="flex md:gap-7 md:order-2 space-x-4 md:space-x-0 rtl:space-x-reverse">
            <Link to="/cart" className="relative mt-3 md:mt-1">
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
            <div
              onClick={() => setIsOpen(!isOpen)}
              className=" flex flex-row items-center gap-3 rounded-full cursor-pointer transition"
            >
              {/* <span className="sr-only">Open user menu</span> */}
              <FiUser className="w-5 h-5 md:w-6 md:h-6 dark:text-white md:mt-1" />
            </div>
            {/* Dropdown menu */}
            {isOpen && (
              <div
                className="absolute my-4 text-base list-none bg-white overflow-hidden right-1 top-14 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  {!user ? (
                    <span className="block text-sm text-gray-900 dark:text-white">
                      Please login & enjoy
                    </span>
                  ) : (
                    <>
                      <span className="block text-sm text-gray-900 dark:text-white">
                        Welcome {userData.name}
                      </span>
                    </>
                  )}
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  {user ? (
                    userData.role === "admin" ? (
                      <>
                        <li>
                          <Link
                            to="/dashboard"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={() => logOut()}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Sign out
                          </button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            to="/cart"
                          >
                            My Cart
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={() => logOut()}
                            className="block px-4 text-left py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full"
                          >
                            Sign out
                          </button>
                        </li>
                      </>
                    )
                  ) : (
                    <>
                      <li>
                        <Link
                          to="/login"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/signup"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Signup
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}

            <button 
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-700 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <MdMenu className="w-8 h-8 dark:text-white" />
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-500 dark:border-gray-700">
              <li>
                <ActiveLink to="/" aria-current="page">
                  Shop
                </ActiveLink>
              </li>
              <li>
                <ActiveLink to="/men" className="nav-item">
                  Men
                </ActiveLink>
              </li>
              <li>
                <ActiveLink to="/women" className="nav-item">
                  Women
                </ActiveLink>
              </li>
              <li>
                <ActiveLink to="/kids" className="nav-item">
                  Kids
                </ActiveLink>
              </li>
              <li>
                <Link to="/login" className="md:hidden nav-item">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
