import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { informationContext } from "../../App";
import { useNavigate, NavLink } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import { motion } from "framer-motion";

const Login = () => {
    const { t } = useContext(informationContext);
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await axios.get("/sanctum/csrf-cookie");
            const response = await axios.post("http://127.0.0.1:8000/api/login", {
                email: data.email,
                password: data.password,
            });

            console.log(response);
        
            localStorage.setItem("user", JSON.stringify(response.data.user));
            setUser(response.data.user);
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
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
                    {t("login")}
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            {t("email")}
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder={t("email")}
                            className={`block w-full px-4 py-2 border ${
                                errors.email ? "border-red-500" : "border-gray-300"
                            } rounded-none focus:ring-1 focus:ring-black focus:border-black`}
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


                    <div className="relative">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
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
                                required: t("password required") || "Password is required",
                                minLength: {
                                    value: 6,
                                    message: t("password_min_length") || "Password must be at least 6 characters",
                                },
                            })}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[38px] text-gray-500 hover:text-black"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
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
                            t("login")
                        )}
                    </motion.button>

                    <p className="text-sm text-gray-600 text-center">
                        {t("dont_have_account")}{" "}
                        <NavLink 
                            to="/register" 
                            className="font-medium text-black hover:underline"
                        >
                            {t("create_account")}
                        </NavLink>
                    </p>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;