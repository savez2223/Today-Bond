import { createContext, useEffect, useState } from "react";
//import products from "../assets/data/all_product";
import useProducts from "../hooks/useProducts";
import axios from "axios";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";

export const ShopContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < 300 + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

const ShopProvider = ({ children }) => {
  const [products] = useProducts();
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  /* set theme */
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  /* create user using firebase */
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  /* user login fucntion */
  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  /* password reset */
  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  /* logout method */
  const logOut = () => {
    setLoading(true);
    localStorage.removeItem("access-token");
    return signOut(auth);
  };

  /* social media login */
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        axios
          .post(`${import.meta.env.VITE_API_URL}/jwt`, {
            email: currentUser?.email,
          })
          .then((data) => {
            localStorage.setItem("access-token", data.data.token);
            // Fetch cart items when user signs in
            fetchCartItems();
            setLoading(false);
          });
      } else {
        localStorage.removeItem("access-token");
        //empty cart data if no user exist
        setCartItems({});
        setLoading(false);
      }
      console.log(currentUser);
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  // Function to fetch cart items
  const fetchCartItems = () => {
    if (localStorage.getItem("access-token")) {
      fetch(`${import.meta.env.VITE_API_URL}/getcart`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "access-token": localStorage.getItem("access-token"),
          "Content-Type": "application/json",
        },
        body: "",
      })
        .then((res) => res.json())
        .then((data) => setCartItems(data));
    }
  };

  /* add product to cart */
  /*   const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    
    if (localStorage.getItem("access-token")) {
      try {
        axios.post(
          `${import.meta.env.VITE_API_URL}/addtocart`,
          { itemId: itemId },
          {
          headers: {
            "access-token": localStorage.getItem("access-token"),
          },
        }
        );

        toast.success("Item added to cart");
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    }
  }; */

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        //calculate total item amount
        let itemInfo = products.find(
          (product) => product.id === parseInt(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
        console.log(totalAmount);
      }
    }
    return totalAmount; 
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const shopInfo = {
    user,
    loading,
    setLoading,
    createUser,
    userLogin,
    googleSignIn,
    logOut,
    products,
    getTotalCartAmount,
    getTotalCartItems,
    resetPassword,
    theme,
    setCartItems,
    cartItems,
    setTheme,
    updateUserProfile,
  };

  return (
    <ShopContext.Provider value={shopInfo}>{children}</ShopContext.Provider>
  );
};

export default ShopProvider;
