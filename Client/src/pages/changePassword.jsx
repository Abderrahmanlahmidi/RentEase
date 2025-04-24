import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const ChangePassword = () => {
    const { user } = useContext(UserContext);
    const [showPassword, setShowPassword] = useState(false);
    const { formState: { errors }, handleSubmit, register, watch, reset } = useForm();
    const [showConfirmPassword, setConfirmShowPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const Submit = async (data) => {
        try {
            await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", { withCredentials: true });
            const response = await axios.put(`http://127.0.0.1:8000/api/user/password/${user.id}`, data, { withCredentials: true });
            if (response.status === 202) {
                setSuccessMessage(response.data.message);
                reset();
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(Submit)} className="pt-6 border-t border-gray-200">
            {successMessage && (
                <div className="flex items-center p-4 mb-4 text-gray-800 border border-gray-200 bg-gray-50" role="alert">
                    <svg className="shrink-0 w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <div className="ms-3 text-sm font-medium">{successMessage}</div>
                    <button
                        type="button"
                        className="ms-auto -mx-1.5 -my-1.5 bg-gray-50 text-gray-600 p-1.5 hover:bg-gray-100"
                        onClick={() => setSuccessMessage("")}
                    >
                        <span className="sr-only">Close</span>
                        <svg className="w-3 h-3" aria-hidden="true" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
            )}
            
            <h4 className="text-lg font-light text-gray-900 mb-4">Change Password</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* New Password */}
                <div className="relative flex flex-col">
                    <label
                        htmlFor="password"
                        className={`block mb-2 text-sm font-medium ${errors.password ? 'text-red-600' : 'text-gray-700'}`}
                    >
                        New Password
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="••••••••"
                        className={`border text-sm block w-full p-2.5 pr-10 focus:border-black focus:ring-0 ${
                            errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                        {...register("password", {
                            minLength: 8,
                            maxLength: 18,
                            required: true,
                            pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
                        })}
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.password.type === "required" && "Password is required"}
                            {errors.password.type === "minLength" && "Minimum 8 characters"}
                            {errors.password.type === "maxLength" && "Maximum 18 characters"}
                            {errors.password.type === "pattern" && "Include uppercase and number"}
                        </p>
                    )}
                    <button
                        type="button"
                        className="absolute inset-y-0 top-7 right-3 flex items-center text-gray-600 hover:text-black"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                    </button>
                </div>

                {/* Confirm Password */}
                <div className="relative flex flex-col">
                    <label
                        htmlFor="confirmPassword"
                        className={`block mb-2 text-sm font-medium ${errors.confirmPassword ? 'text-red-600' : 'text-gray-700'}`}
                    >
                        Confirm Password
                    </label>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        placeholder="••••••••"
                        className={`border text-sm block w-full p-2.5 pr-10 focus:border-black focus:ring-0 ${
                            errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        }`}
                        {...register("confirmPassword", {
                            required: true,
                            validate: (value) => value === watch("password"),
                        })}
                    />
                    {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.confirmPassword.type === "required" && "Please confirm password"}
                            {errors.confirmPassword.type === "validate" && "Passwords don't match"}
                        </p>
                    )}
                    <button
                        type="button"
                        className="absolute top-7 inset-y-0 right-3 flex items-center text-gray-600 hover:text-black"
                        onClick={() => setConfirmShowPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                    </button>
                </div>
            </div>
            
            <div className="flex justify-end pt-6">
                <button 
                    type="submit" 
                    className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
                >
                    Change Password
                </button>
            </div>
        </form>
    )
}

export default ChangePassword;