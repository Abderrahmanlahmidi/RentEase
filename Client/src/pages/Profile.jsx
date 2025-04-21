import { useState, useContext, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/userContext.jsx";
import ChangePassword from "./changePassword.jsx";

const Profile = () => {
    const { register, reset, formState: { errors }, handleSubmit } = useForm();
    const [successMessage, setSuccessMessage] = useState("");
    const [userData, setUserData] = useState({});
    const { user, setUser } = useContext(UserContext);
    const formRef = useRef(null);
    const [showingForm, setShowingForm] = useState(false);

    const scrollToForm = () => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const onSubmit = async (data) => {
        data.id = userData?.user?.id;

        try {
            await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
                withCredentials: true,
            });
            const response = await axios.put(`http://127.0.0.1:8000/api/user/update/${data.id}`, data, {
                withCredentials: true,
            });
            setUser(response.data.user);
            setSuccessMessage("Profile successfully updated!");
        } catch (error) {
            console.error("Error:", error?.response?.data || error.message);
            setSuccessMessage("Failed to update profile.");
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
            });
        }
    }, [userData, reset]);

    const toggleForm = () => {
        setShowingForm(!showingForm);
        scrollToForm();
        handleSubmitId(user?.id);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-light text-gray-900 mb-6">Profile</h2>
            
            <div className="mb-6">
                <NavLink 
                    to="/" 
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                    Go Home
                </NavLink>
            </div>

            {successMessage && (
                <div className={`p-4 mb-6 text-sm ${successMessage.includes("success") ? "bg-gray-100 text-gray-800" : "bg-gray-100 text-gray-800"} border border-gray-200`}>
                    {successMessage}
                </div>
            )}

            <div className="bg-white border border-gray-200 p-6 mb-6">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20">
                        <img 
                            src={user?.profile_image} 
                            alt="Profile" 
                            className="w-full h-full object-cover rounded-full border-2 border-gray-200" 
                        />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-medium text-gray-900">{user?.firstName} {user?.lastName}</h3>
                        <p className="text-gray-600 text-sm">Role: <span className="font-medium">{user?.role?.name}</span></p>
                        <p className="text-gray-600 text-sm">Age: {user?.age}</p>
                    </div>
                    <div>
                        <button 
                            type="button" 
                            onClick={toggleForm}
                            className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
                        >
                            {showingForm ? "Change Password" : "Edit Profile"}
                        </button>
                    </div>
                </div>
            </div>

            {showingForm ? (
                <form 
                    ref={formRef} 
                    onSubmit={handleSubmit(onSubmit)} 
                    className="bg-white border border-gray-200 p-6 space-y-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Name */}
                        <div className="flex flex-col">
                            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-700">
                                First Name
                            </label>
                            <input 
                                type="text" 
                                id="firstName" 
                                placeholder="John" 
                                className={`border border-gray-300 text-sm block w-full p-2.5 focus:border-black focus:ring-0 ${
                                    errors.firstName ? "border-red-500" : ""
                                }`} 
                                {...register("firstName", { 
                                    required: true, 
                                    pattern: /^[A-Z][a-z]{1,49}$/, 
                                    minLength: 2, 
                                    maxLength: 15 
                                })} 
                            />
                            {errors.firstName && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.firstName.type === "required" && "First name is required"}
                                    {errors.firstName.type === "pattern" && "First name must start with capital letter"}
                                    {errors.firstName.type === "minLength" && "Minimum 2 characters"}
                                    {errors.firstName.type === "maxLength" && "Maximum 15 characters"}
                                </p>
                            )}
                        </div>
                        
                        {/* Last Name */}
                        <div className="flex flex-col">
                            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-700">
                                Last Name
                            </label>
                            <input 
                                type="text" 
                                id="lastName" 
                                placeholder="Doe" 
                                className={`border border-gray-300 text-sm block w-full p-2.5 focus:border-black focus:ring-0 ${
                                    errors.lastName ? "border-red-500" : ""
                                }`} 
                                {...register("lastName", { 
                                    required: true, 
                                    pattern: /^[A-Z][a-z]{1,49}$/, 
                                    minLength: 2, 
                                    maxLength: 15 
                                })} 
                            />
                            {errors.lastName && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.lastName.type === "required" && "Last name is required"}
                                    {errors.lastName.type === "pattern" && "Last name must start with capital letter"}
                                    {errors.lastName.type === "minLength" && "Minimum 2 characters"}
                                    {errors.lastName.type === "maxLength" && "Maximum 15 characters"}
                                </p>
                            )}
                        </div>
                        
                        {/* Age */}
                        <div className="flex flex-col">
                            <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-700">
                                Age
                            </label>
                            <input 
                                type="number" 
                                id="age" 
                                placeholder="30" 
                                className={`border border-gray-300 text-sm block w-full p-2.5 focus:border-black focus:ring-0 ${
                                    errors.age ? "border-red-500" : ""
                                }`} 
                                {...register("age", { 
                                    required: true, 
                                    min: 18, 
                                    max: 100 
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
                        
                        {/* Profile Image */}
                        <div className="flex flex-col">
                            <label htmlFor="profileImage" className="block mb-2 text-sm font-medium text-gray-700">
                                Profile Image URL
                            </label>
                            <input 
                                type="text" 
                                id="profileImage" 
                                placeholder="Enter image URL" 
                                className="border border-gray-300 text-sm block w-full p-2.5 focus:border-black focus:ring-0" 
                                {...register("profile_image")}
                            />
                        </div>
                        
                        {/* Email */}
                        <div className="flex flex-col md:col-span-2">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input 
                                type="email" 
                                id="email" 
                                placeholder="john@example.com" 
                                className={`border border-gray-300 text-sm block w-full p-2.5 focus:border-black focus:ring-0 ${
                                    errors.email ? "border-red-500" : ""
                                }`} 
                                {...register("email", { 
                                    required: true, 
                                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ 
                                })} 
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.email.type === "required" && "Email is required"}
                                    {errors.email.type === "pattern" && "Enter a valid email address"}
                                </p>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex justify-end pt-6">
                        <button 
                            type="submit" 
                            className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            ) : (
                <ChangePassword />
            )}
        </div>
    );
};

export default Profile;