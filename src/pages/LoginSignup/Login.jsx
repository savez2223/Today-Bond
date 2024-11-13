import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { ImSpinner9 } from "react-icons/im";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { ShopContext } from "../../Context/ShopProvider";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { userLogin, loading, setLoading, resetPassword, googleSignIn } =
    useContext(ShopContext);
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState("password");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    userLogin(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        toast.success("Successfully Login!");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
        toast.error(err.message);
        reset();
      });
  };

  const handleRestPassword = () => {
    const email = getValues("email");
    console.log(email);
    resetPassword(email)
      .then(() => {
        setLoading(false);
        toast.success("Please check your email !!!");
        reset();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
        toast.error(err.message);
        reset();
      });
  };

   const handleGoogleSignin = () => {
     googleSignIn()
       .then((result) => {
         const { user } = result;
         const signUpData = {
           username: user?.displayName,
           email: user?.email,
         };
         try {
           axios.post(`${import.meta.env.VITE_API_URL}/signup`, signUpData);
           navigate("/");
           toast.success("Successfully signed up");
         } catch (err) {
           console.log(err.message);
           if (err.response) {
             toast.error(err.response.data.errors || err.message);
           } else {
             toast.error("An error occurred. Please try again later.");
           }
         }
       })
       .catch((err) => {
         setLoading(false);
         console.log(err.message);
         toast.error(err.message);
       });
   };

  /* to toggle password input type */
  const togglePassword = () => {
    setShowPassword(!showPassword);
    setInputType(showPassword ? "password" : "text");
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-200 dark:bg-slate-600">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form
          className="space-y-4"
          action="#"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h5 className="text-center text-xl font-medium text-gray-900 dark:text-white">
            Sign In
          </h5>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm  text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="add-input-field"
              placeholder="name@company.com"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-xs text-red-500">Email is required *</span>
            )}
          </div>
          <div className="relative">
            <div className="flex justify-between">
              <label
                htmlFor="password"
                className="text-sm mb-2 text-gray-900 dark:text-white"
              >
                Password
              </label>
            </div>
            <input
              type={inputType}
              name="password"
              id="password"
              placeholder="*******"
              className="add-input-field"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-xs text-red-500">
                Password is required *
              </span>
            )}
            <div
              className={`absolute right-3 transform translate-y-1 cursor-pointer top-1/2`}
              onClick={togglePassword}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
          </div>
          <button type="submit" className="w-full primary-btn">
            {loading ? (
              <ImSpinner9 className="m-auto animate-spin" size={24} />
            ) : (
              "Continue"
            )}
          </button>
        </form>
        <div className="mb-5 mt-2">
          <button
            onClick={handleRestPassword}
            className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
          >
            Forget Password?
          </button>
        </div>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered?{" "}
          <Link
            to="/signup"
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            Create account
          </Link>
        </div>
        <div
          onClick={handleGoogleSignin}
          className="flex justify-center items-center space-x-2 border  mt-4 mb-2 p-2 border-gray-300 border-rounded cursor-pointer text-sm hover:bg-gray-100 group"
        >
          <FcGoogle size={25} />

          <p className="text-gray-900 dark:text-white group-hover:dark:text-gray-600">
            Continue with Google
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
