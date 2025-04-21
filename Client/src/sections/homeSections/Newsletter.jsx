import { motion } from "framer-motion";
import { FiMail, FiArrowRight, FiCheck } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import {UserContext} from "../../context/userContext.jsx";
import axios from "axios";

export default function Newsletter() {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [isSuccess, setIsSuccess] = useState(false);
    const {user} = useContext(UserContext);

    const onSubmit = async (data) => {
        try {
            const date = new Date();
            const formattedDate = date.toISOString().split('T')[0];

            const payload = {
                email: data.email,
                date:formattedDate,
                subscriber_id:user?.id || 8,
            }

            const response = await axios.post("http://127.0.0.1:8000/api/subscribe",payload)
            console.log(response)
            setIsSuccess(true);
            reset();
            setTimeout(() => setIsSuccess(false), 5000);
        }catch(err) {
            console.log(err);
        }
    };

    return (
        <div className="bg-gray-50 py-14 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-none overflow-hidden"
            >
                <div className="p-8 sm:p-10 lg:p-12">
                    <div className="text-center mb-10">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl font-light text-gray-900 mb-2"
                        >
                            Stay Updated
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-lg text-gray-600 max-w-2xl mx-auto"
                        >
                            Join our newsletter for the latest updates
                        </motion.p>
                    </div>

                    {isSuccess ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center p-8 bg-white border border-gray-200"
                        >
                            <div className="flex flex-col items-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 500 }}
                                    className="w-14 h-14 bg-gray-100 rounded-none flex items-center justify-center mb-4"
                                >
                                    <FiCheck className="w-6 h-6 text-gray-800" />
                                </motion.div>

                                <h3 className="text-xl font-medium text-gray-900 mb-3">
                                    Subscription Confirmed
                                </h3>

                                <div className="space-y-2">
                                    <p className="text-gray-600 text-sm">
                                        Thank you for subscribing to our newsletter.
                                    </p>
                                    <p className="text-sm text-gray-700 font-medium flex items-center justify-center">
                                        <FiMail className="mr-2" />
                                        Check your inbox
                                    </p>
                                </div>

                                <p className="mt-4 text-xs text-gray-500">
                                    Can't find our email? Check your spam folder.
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.form
                            onSubmit={handleSubmit(onSubmit)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-6"
                        >
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="relative flex-grow">
                                    <div className="flex flex-col">
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FiMail className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                {...register("email", {
                                                    required: "Email is required",
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "Please enter a valid email"
                                                    }
                                                })}
                                                type="email"
                                                id="email"
                                                placeholder="Enter your email"
                                                className={`block w-full pl-10 pr-4 py-3 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-none focus:ring-0 focus:border-black transition-colors`}
                                            />
                                        </div>
                                        {errors.email && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="mt-2 text-sm text-red-600 h-5"
                                            >
                                                {errors.email.message}
                                            </motion.p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex-shrink-0 sm:self-end">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="group w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-none shadow-sm transition-colors bg-black text-white hover:bg-gray-800"
                                    >
                                        <span className="flex items-center">
                                            Subscribe <FiArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </span>
                                    </motion.button>
                                </div>
                            </div>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-center text-sm text-gray-500"
                            >
                                We respect your privacy. Unsubscribe at any time.
                            </motion.p>
                        </motion.form>
                    )}
                </div>
            </motion.div>
        </div>
    );
}