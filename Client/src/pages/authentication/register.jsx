import { useContext, useState } from "react";
import { informationContext } from "../../App";
import { NavLink } from "react-router";
import { useForm } from "react-hook-form";
import { validationError } from "../../utils/utils";
import axios from "axios";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {useNavigate} from "react-router-dom";

const Register = () => {

  const { t } = useContext(informationContext);
  const { register, formState: { errors }, handleSubmit, watch } = useForm();
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setConfirmShowPassword] = useState(true);
  const navigate = useNavigate();


  const onSubmit = async (data) => {

    console.log(data);

    if (data.password !== data.confirmPassword) {
      console.log("password not correct");
      return;
    }

    try {
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", { withCredentials: true });

      const response = await axios.post("http://127.0.0.1:8000/api/register", { ...data,  role_id: 1,  profile_image:"image.png"  }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      setSuccessMessage("You have been successfully registered.");
      navigate("/login");

    } catch (error) {
      if (error.response) {
        console.log("Error:", error.response.data);
      } else {
        console.log("Request failed:", error.message);
      }
    }
  };


  return (
    <div className="flex justify-center items-center w-full py-[30px] max-md:px-[16px]">
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            {t("create_account")}
          </h1>

          {successMessage && (
            <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
              <span className="font-medium">Success!</span> {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstname"
                className={`${successMessage === "" ? (errors.firstName ? validationError.labelError : validationError.labelNormal) : validationError.labelSuccess} block mb-2 text-sm font-medium`}
              >
                {t("first_name")}
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder={t("first_name_placeholder")}
                className={`${successMessage === "" ? (errors.firstName ? validationError.inputError : validationError.inputNormal) : validationError.inputSuccess} border text-sm rounded-lg block w-full p-2.5`}
                {...register("firstName", {
                  required: true,
                  pattern: /^[A-Z][a-z]{1,49}$/,
                  minLength: 5,
                  maxLength: 15,
                })}
              />
              {errors.firstName && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oops!</span>
                  {errors.firstName.type === "required" && " First name is required!"}
                  {errors.firstName.type === "pattern" && " First name is not valid!"}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastname"
                className={`${successMessage === "" ? (errors.lastName ? validationError.labelError : validationError.labelNormal) : validationError.labelSuccess} block mb-2 text-sm font-medium`}
              >
                {t("last_name")}
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder={t("last_name_placeholder")}
                className={`${successMessage === "" ? (errors.lastName ? validationError.inputError : validationError.inputNormal) : validationError.inputSuccess} border text-sm rounded-lg block w-full p-2.5`}
                {...register("lastName", {
                  required: true,
                  pattern: /^[A-Z][a-z]{1,49}$/,
                  minLength: 5,
                  maxLength: 15,
                })}
              />
              {errors.lastName && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oops!</span>
                  {errors.lastName.type === "required" && " Last name is required!"}
                  {errors.lastName.type === "pattern" && " Last name is not valid!"}
                </p>
              )}
            </div>

            {/* Age */}
            <div>
              <label
                htmlFor="age"
                className={`${successMessage === "" ? (errors.age ? validationError.labelError : validationError.labelNormal) : validationError.labelSuccess} block mb-2 text-sm font-medium`}
              >
                {t("age")}
              </label>
              <input
                type="number"
                name="age"
                id="age"
                placeholder={t("age_placeholder")}
                className={`${successMessage === "" ? (errors.age ? validationError.inputError : validationError.inputNormal) : validationError.inputSuccess} border text-sm rounded-lg block w-full p-2.5`}
                {...register("age", {
                  required: true,
                  min: 18,
                  max: 100,
                })}
              />
              {errors.age && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oops!</span>
                  {errors.age.type === "required" && " Age is required!"}
                  {errors.age.type === "min" && " You must be at least 18 years old!"}
                  {errors.age.type === "max" && " Age cannot exceed 100!"}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className={`${successMessage === "" ? (errors.email ? validationError.labelError : validationError.labelNormal) : validationError.labelSuccess} block mb-2 text-sm font-medium`}
              >
                {t("email")}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder={t("email_placeholder")}
                className={`${successMessage === "" ? (errors.email ? validationError.inputError : validationError.inputNormal) : validationError.inputSuccess} border text-sm rounded-lg block w-full p-2.5`}
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                })}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oops!</span>
                  {errors.email.type === "required" && " Email is required!"}
                  {errors.email.type === "pattern" && " Enter a valid email address!"}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label
                htmlFor="password"
                className={`${successMessage === "" ? (errors.password ? validationError.labelError : validationError.labelNormal) : validationError.labelSuccess} block mb-2 text-sm font-medium`}
              >
                {t("password")}
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="••••••••"
                className={`${successMessage === "" ? (errors.password ? validationError.inputError : validationError.inputNormal) : validationError.inputSuccess} border text-sm rounded-lg block w-full p-2.5 pr-10`}
                {...register("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 20,
                  pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
                })}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oops!</span>
                  {errors.password.type === "required" && " Password is required!"}
                  {errors.password.type === "minLength" && " Password must be at least 8 characters long!"}
                  {errors.password.type === "maxLength" && " Password cannot exceed 20 characters!"}
                  {errors.password.type === "pattern" && " Password must include at least one uppercase letter and one number!"}
                </p>
              )}
              <button
                type="button"
                className="absolute inset-y-0 top-7 right-3 flex items-center text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className={`${successMessage === "" ? (errors.confirmPassword ? validationError.labelError : validationError.labelNormal) : validationError.labelSuccess} block mb-2 text-sm font-medium`}
              >
                {t("confirmed password")}
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="••••••••"
                className={`${successMessage === "" ? (errors.confirmPassword ? validationError.inputError : validationError.inputNormal) : validationError.inputSuccess} border text-sm rounded-lg block w-full p-2.5`}
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) => value === watch("password"),
                })}
              />
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oops!</span> The password is not correct
                </p>
              )}
              <button
                type="button"
                className="absolute top-7 inset-y-0 right-3 flex items-center text-gray-400"
                onClick={() => setConfirmShowPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {t("create_account")}
            </button>

            {/* Login Link */}
            <p className="text-sm font-light text-gray-500">
              {t("already_have_account")}{""}
              <NavLink to="/Login" className="font-medium text-primary-600 hover:underline">
                {t("login_here")}
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
