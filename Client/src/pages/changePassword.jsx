import {validationError} from "../utils/utils.js";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {useForm} from "react-hook-form";
import {useState, useContext} from "react";
import {UserContext} from "../context/UserContext";
import axios from "axios";


const ChangePassword = () => {

    const {user} = useContext(UserContext);

    const [showPassword, setShowPassword] = useState(false);
    const {formState:{errors},handleSubmit, register,watch,} = useForm();
    const [showConfirmPassword, setConfirmShowPassword] = useState(false);


    const Submit = async (data) => {
        console.log(data);

        try {
            await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", { withCredentials: true });

            const response = await axios.put("http://127.0.0.1:8000/api/user/password", data, { withCredentials: true });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <form onSubmit={handleSubmit(Submit)}  className="pt-6 border-t border-gray-200">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Change Password</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* New Password */}
                <div className="relative flex flex-col">
                    <label
                        htmlFor="password"
                        className={`${errors.password ? validationError.labelError : validationError.labelNormal} block mb-2 text-sm font-medium`}
                    >
                        New Password
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="••••••••"
                        className={`${errors.password ? validationError.inputError : validationError.inputNormal} border text-sm rounded-lg block w-full p-2.5 pr-10`}
                        {...register("password", {
                            minLength: 8,
                            maxLength: 18,
                            required: true,
                            pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
                        })}

                    />
                    {errors.password && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            <span className="font-medium">Oops!</span>
                            {errors.password.type === "required" && " Password is required!"}
                            {errors.password.type === "minLength" && " Password must be at least 8 characters long!"}
                            {errors.type === "maxLength" && " Max characters must be at least 8 characters long!"}
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
                <div className="relative flex flex-col">
                    <label
                        htmlFor="confirmPassword"
                        className={`${errors.confirmPassword ? validationError.labelError : validationError.labelNormal} block mb-2 text-sm font-medium`}
                    >
                        Confirm Password
                    </label>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        placeholder="••••••••"
                        className={`${errors.confirmPassword ? validationError.inputError : validationError.inputNormal} border text-sm rounded-lg block w-full p-2.5`}
                        {...register("confirmPassword", {
                            required:true,
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
            </div>
            <div className="flex justify-end pt-6">
                <button type="submit" className="btn-primary">Change Password</button>
            </div>
        </form>
    )
}

export default ChangePassword;