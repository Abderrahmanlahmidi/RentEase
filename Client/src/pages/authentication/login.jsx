import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { informationContext } from "../../App";
import { useNavigate, NavLink } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { validationLogin } from "../../utils/utils";
import axios from "axios";
import { UserContext } from "../../context/userContext";



const Login = () => {
    

    const { t } = useContext(informationContext);
    const navigate = useNavigate();
  
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitSuccessful },
    } = useForm();
  
    const [showPassword, setShowPassword] = useState(false);

    const {setUser} = useContext(UserContext)

  
    const onSubmit = async (data) => {
      await axios.get("/sanctum/csrf-cookie");
  
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email: data.email,
        password: data.password,
      });

      setUser(response.data.user);
      navigate("/"); 
    };


  return (
    <div className="flex justify-center items-center w-full py-[50px] max-md:px-[16px] max-md:py-[30px]">
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            {t("login")}
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className={`block mb-2 text-sm font-medium ${
                  isSubmitSuccessful
                    ? validationLogin.labelSuccess
                    : errors.email
                    ? validationLogin.labelError
                    : validationLogin.labelNormal
                }`}
              >
                {t("email")}
              </label>
              <input
                type="email"
                id="email"
                placeholder={t("email")}
                className={`block w-full text-sm rounded-lg p-2.5 ${
                  isSubmitSuccessful
                    ? validationLogin.inputSuccess
                    : errors.email
                    ? validationLogin.inputError
                    : validationLogin.inputNormal
                }`}
                {...register("email", {
                  required: t("email required") || "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: t("email invalid") || "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label
                htmlFor="password"
                className={`block mb-2 text-sm font-medium ${
                  isSubmitSuccessful
                    ? validationLogin.labelSuccess
                    : errors.password
                    ? validationLogin.labelError
                    : validationLogin.labelNormal
                }`}
              >
                {t("password")}
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                className={`block w-full text-sm rounded-lg p-2.5 pr-10 ${
                  isSubmitSuccessful
                    ? validationLogin.inputSuccess
                    : errors.password
                    ? validationLogin.inputError
                    : validationLogin.inputNormal
                }`}
                {...register("password", {
                  required: t("password required") || "Password is required",
                  minLength: {
                    value: 6,
                    message:
                      t("password_min_length") || "Password must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {t("login")}
            </button>

            {/* Register Redirect */}
            <p className="text-sm font-light text-gray-500">
              {t("dont_have_account")}{" "}
              <NavLink to="/register" className="font-medium text-primary-600 hover:underline">
                {t("create_account")}
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
