import { useState, useContext, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { validationError } from "../utils/utils";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/userContext.jsx";
import ChangePassword from "./changePassword.jsx";

const Profile = () => {

    const { register, reset, formState: { errors }, handleSubmit, watch } = useForm();
    const [successMessage, setSuccessMessage] = useState("");
    const [userData, setUserData] = useState({});
    const { user, setUser } = useContext(UserContext);
    const formRef = useRef(null);
    const [Showing, setShowing] = useState(false);

    const scrollToForm = () => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const onSubmit = async (data) => {
        data.id = userData?.user?.id;

        if (data.password !== data.confirmPassword) {
            setSuccessMessage("Passwords do not match.");
            return;
        }
        try {
            await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
                withCredentials: true,
            });
            const response = await axios.put(`http://127.0.0.1:8000/api/user/update/${data.id}`, data, {
                withCredentials: true,
            });
            console.log("User updated successfully:", response.data.user);
            setUser(response.data.user);
            setSuccessMessage("Profile successfully updated!");
        } catch (error) {
            if (error.response) {
                console.log("Error:", error.response.data);
                setSuccessMessage("Failed to update profile.");
            } else {
                console.log("Request failed:", error.message);
                setSuccessMessage("Failed to update profile.");
            }
        }
    };

    const handleSubmitId = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/user/${id}`, {
                withCredentials: true,
            });
            setUserData(response.data);
        } catch (error) {
            console.error("Error:", error?.response?.data || error.message);
        }
    };

    useEffect(() => {
        if (userData) {
            reset({
                firstName: userData.user?.firstName || "",
                lastName: userData.user?.lastName || "",
                age: userData.user?.age || "",
                profile_image: userData.user?.profile_image || "",
                email: userData.user?.email || "",
                password: userData.user?.password || "",
            });
        }
    }, [userData, reset]);

    const handleShowing = () => {
        setShowing(!Showing);
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Profile</h2>
            <div className="mb-6">
                <NavLink to="/" className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none">
                    Go Home
                </NavLink>
            </div>
            {successMessage && (
                <div className="p-4 mb-4 text-sm rounded-lg text-green-800 bg-green-50" role="alert">
                    {successMessage}
                </div>
            )}
            <div className="bg-white shadow rounded-lg p-6 mb-6 border border-gray-200">
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24">
                        <img src={user?.profile_image} alt="Profile" className="w-full h-full object-cover rounded-full border-4 border-indigo-200" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800">{user?.firstName}</h3>
                        <h3 className="text-xl font-semibold text-gray-800">{user?.lastName}</h3>
                        <p className="text-gray-600 text-sm">Role: <span className="font-medium">{user?.role.name}</span></p>
                        <p className="text-gray-600 text-sm">Age: {user?.age}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <button type="button" value={user?.id} className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2" onClick={() => {
                            scrollToForm();
                            handleSubmitId(user?.id);
                            handleShowing();
                        }}>
                            {Showing ? "Change Password" : "Edit Profile"}
                        </button>
                    </div>
                </div>
            </div>

            {Showing === true ? (
                <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="bg-white shadow rounded-lg p-6 space-y-6 border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Name */}
                        <div className="flex flex-col">
                            <label htmlFor="firstName" className={`${errors.firstName ? validationError.labelError : validationError.labelNormal} block mb-2 text-sm font-medium`}>
                                First Name
                            </label>
                            <input type="text" id="firstName" placeholder="John" className={`${errors.firstName ? validationError.inputError : validationError.inputNormal} border text-sm rounded-lg block w-full p-2.5`} {...register("firstName", { required: true, pattern: /^[A-Z][a-z]{1,49}$/, minLength: 5, maxLength: 15 })} />
                            {errors.firstName && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span>{errors.firstName.type === "required" && " First name is required!"}{errors.firstName.type === "pattern" && " First name is not valid!"}</p>}
                        </div>
                        {/* Last Name */}
                        <div className="flex flex-col">
                            <label htmlFor="lastName" className={`${errors.lastName ? validationError.labelError : validationError.labelNormal} block mb-2 text-sm font-medium`}>
                                Last Name
                            </label>
                            <input type="text" id="lastName" placeholder="Doe" className={`${errors.lastName ? validationError.inputError : validationError.inputNormal} border text-sm rounded-lg block w-full p-2.5`} {...register("lastName", { required: true, pattern: /^[A-Z][a-z]{1,49}$/, minLength: 5, maxLength: 15 })} />
                            {errors.lastName && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span>{errors.lastName.type === "required" && " Last name is required!"}{errors.lastName.type === "pattern" && " Last name is not valid!"}</p>}
                        </div>
                        {/* Age */}
                        <div className="flex flex-col md:col-span-2">
                            <label htmlFor="age" className={`${errors.age ? validationError.labelError : validationError.labelNormal} block mb-2 text-sm font-medium`}>
                                Age
                            </label>
                            <input type="number" id="age" placeholder="30" className={`${errors.age ? validationError.inputError : validationError.inputNormal} border text-sm rounded-lg block w-full p-2.5`} {...register("age", { required: true, min: 18, max: 100 })} />
                            {errors.age && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span>{errors.age.type === "required" && " Age is required!"}{errors.age.type === "min" && " You must be at least 18 years old!"}{errors.age.type === "max" && " Age cannot exceed 100!"}</p>}
                        </div>
                        <div className="flex flex-col md:col-span-2">
                            <label htmlFor="profileImage" className="block mb-2 text-sm font-medium text-gray-700">Profile Image</label>
                            <input type="text" id="profileImage" placeholder="Enter image URL" className="form-input" {...register("profile_image")}/>
                        </div>
                        {/* Email */}
                        <div className="flex flex-col md:col-span-2">
                            <label htmlFor="email" className={`${errors.email ? validationError.labelError : validationError.labelNormal} block mb-2 text-sm font-medium`}>
                                Email
                            </label>
                            <input type="email" id="email" placeholder="john@example.com" className={`${errors.email ? validationError.inputError : validationError.inputNormal} border text-sm rounded-lg block w-full p-2.5`} {...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$/ })} />
                            {errors.email && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span>{errors.email.type === "required" && " Email is required!"}{errors.email.type === "pattern" && " Enter a valid email address!"}</p>}
                        </div>
                    </div>
                    <div className="flex justify-end pt-6">
                        <button type="submit" className="btn-primary">Save Changes</button>
                    </div>
                </form>
            ): (
                <ChangePassword/>
            )}


        </div>
    );
};

export default Profile;
