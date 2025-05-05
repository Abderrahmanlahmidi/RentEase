import { useContext, useState } from "react";
import { informationContext } from "../../App";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from "framer-motion";

const Register = () => {
  const { t } = useContext(informationContext);
  const { register, formState: { errors }, handleSubmit, watch } = useForm();
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", { withCredentials: true });
      
      await axios.post(
        "http://127.0.0.1:8000/api/register", 
        { ...data, role_id: 1, profile_image: "image.png" }, 
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setSuccessMessage("You have been successfully registered.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md border border-gray-200 rounded-none p-8"
      >
        <h1 className="text-2xl font-light text-gray-900 mb-6">
          {t("create_account")}
        </h1>

        {successMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 mb-6 text-sm text-gray-900 bg-gray-100 border border-gray-300"
          >
            {successMessage}
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
              {t("first_name")}
            </label>
            <input
              type="text"
              id="firstName"
              placeholder={t("first_name_placeholder")}
              className={`block w-full px-4 py-2 border ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } rounded-none focus:ring-1 focus:ring-black focus:border-black`}
              {...register("firstName", {
                required: true,
                pattern: /^[A-Z][a-z]{1,49}$/,
                minLength: 5,
                maxLength: 15,
              })}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.firstName.type === "required" && "First name is required"}
                {errors.firstName.type === "pattern" && "First name is not valid"}
                {errors.firstName.type === "minLength" && "Minimum 5 characters"}
                {errors.firstName.type === "maxLength" && "Maximum 15 characters"}
              </p>
            )}
          </div>


          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
              {t("last_name")}
            </label>
            <input
              type="text"
              id="lastName"
              placeholder={t("last_name_placeholder")}
              className={`block w-full px-4 py-2 border ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } rounded-none focus:ring-1 focus:ring-black focus:border-black`}
              {...register("lastName", {
                required: true,
                pattern: /^[A-Z][a-z]{1,49}$/,
                minLength: 5,
                maxLength: 15,
              })}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.lastName.type === "required" && "Last name is required"}
                {errors.lastName.type === "pattern" && "Last name is not valid"}
                {errors.lastName.type === "minLength" && "Minimum 5 characters"}
                {errors.lastName.type === "maxLength" && "Maximum 15 characters"}
              </p>
            )}
          </div>


          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
              {t("age")}
            </label>
            <input
              type="number"
              id="age"
              placeholder={t("age_placeholder")}
              className={`block w-full px-4 py-2 border ${
                errors.age ? "border-red-500" : "border-gray-300"
              } rounded-none focus:ring-1 focus:ring-black focus:border-black`}
              {...register("age", {
                required: true,
                min: 18,
                max: 100,
              })}
            />
            {errors.age && (
              <p className="mt-1 text-sm text-red-600">
                {errors.age.type === "required" && "Age is required"}
                {errors.age.type === "min" && "Minimum age is 18"}
                {errors.age.type === "max" && "Maximum age is 100"}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              {t("email")}
            </label>
            <input
              type="email"
              id="email"
              placeholder={t("email_placeholder")}
              className={`block w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-none focus:ring-1 focus:ring-black focus:border-black`}
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.type === "required" && "Email is required"}
                {errors.email.type === "pattern" && "Enter a valid email"}
              </p>
            )}
          </div>


          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              {t("password")}
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              className={`block w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-none focus:ring-1 focus:ring-black focus:border-black pr-10`}
              {...register("password", {
                required: true,
                minLength: 8,
                maxLength: 20,
                pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
              })}
            />
            <button
              type="button"
              className="absolute right-3 top-[38px] text-gray-500 hover:text-black"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.type === "required" && "Password is required"}
                {errors.password.type === "minLength" && "Minimum 8 characters"}
                {errors.password.type === "maxLength" && "Maximum 20 characters"}
                {errors.password.type === "pattern" && "Include uppercase and number"}
              </p>
            )}
          </div>


          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              {t("confirmed password")}
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="••••••••"
              className={`block w-full px-4 py-2 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-none focus:ring-1 focus:ring-black focus:border-black pr-10`}
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) => value === watch("password"),
              })}
            />
            <button
              type="button"
              className="absolute right-3 top-[38px] text-gray-500 hover:text-black"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword.message || "Passwords don't match"}
              </p>
            )}
          </div>


          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-black text-white py-3 rounded-none hover:bg-gray-800 transition-colors flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              t("create_account")
            )}
          </motion.button>

          <p className="text-sm text-gray-600 text-center">
            {t("already_have_account")}{" "}
            <NavLink 
              to="/login" 
              className="font-medium text-black hover:underline"
            >
              {t("login_here")}
            </NavLink>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;