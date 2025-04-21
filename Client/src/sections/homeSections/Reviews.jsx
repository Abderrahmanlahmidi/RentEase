import { motion } from "framer-motion";
import { FaCalendarAlt, FaPlus, FaTimes, FaArrowRight } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/userContext.jsx";
import { informationContext } from "../../App";
import { NavLink } from "react-router-dom";

export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { user } = useContext(UserContext);
    const { t } = useContext(informationContext);

    useEffect(() => {
        const getReviews = async () => {
            const response = await axios.get("http://127.0.0.1:8000/api/reviews");
            setReviews(response.data.reviews);
        }
        getReviews();
    }, []);

    const onSubmit = async (data) => {
        try {
            const date = new Date();
            const formattedDate = date.toISOString().split('T')[0];
            const response = await axios.post("http://127.0.0.1:8000/api/review", { ...data, 'auteur_id': user?.id, 'datePublication': formattedDate });
            setReviews([...reviews, response.data.review]);
            setIsModalOpen(false);
            reset();
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <section className="py-14 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-light tracking-tight text-gray-900 mb-2">
                        Customer Reviews
                    </h2>
                    <p className="text-lg text-gray-600">
                        Hear what our clients say about their experience with our services
                    </p>
                </motion.div>

                {/* Add Review Button */}
                {user && (
                    <div className="text-center mb-12">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="group inline-flex items-center px-6 py-3 bg-white border border-gray-200 text-gray-800 font-medium hover:bg-gray-50 transition-colors"
                        >
                            <FaPlus className="mr-2 w-4 h-4 group-hover:rotate-90 transition-transform" />
                            <span>Add Your Review</span>
                        </button>
                    </div>
                )}

                {/* Review Cards Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                show: { opacity: 1, y: 0 }
                            }}
                            className="group bg-white border border-gray-200 p-8 rounded-none hover:shadow-sm transition-all duration-300 h-full flex flex-col"
                        >
                            <div className="flex flex-col h-full">
                                <h3 className="text-xl font-medium text-gray-900 mb-3">
                                    {review.titre}
                                </h3>
                                <p className="text-gray-600 text-sm mb-6 flex-grow">
                                    {review.contenu}
                                </p>

                                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-gray-100 rounded-full">
                                            <img
                                                src={review.auteur.profile_image}
                                                alt="Profile"
                                                className="w-9 h-9 rounded-full object-cover"
                                            />
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">
                                            {review.auteur.firstName} {review.auteur.lastName}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                        <FaCalendarAlt className="w-3 h-3 text-gray-400" />
                                        <span>
                                            {review.datePublication}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Add Review Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-none shadow-sm max-w-md w-full p-8 relative border border-gray-200"
                    >
                        <button
                            onClick={() => {
                                setIsModalOpen(false);
                                reset();
                            }}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <FaTimes className="w-5 h-5" />
                        </button>

                        <h3 className="text-2xl font-light text-gray-900 mb-6">Add Your Review</h3>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    {...register("titre", { required: "Title is required" })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-0 focus:border-black transition-colors"
                                    placeholder="Your review title"
                                />
                                {errors.titre && (
                                    <p className="mt-1 text-sm text-red-500">{errors.titre.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="description"
                                    rows="4"
                                    {...register("contenu", { required: "Description is required" })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-0 focus:border-black transition-colors"
                                    placeholder="Share your experience..."
                                ></textarea>
                                {errors.contenu && (
                                    <p className="mt-1 text-sm text-red-500">{errors.contenu.message}</p>
                                )}
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        reset();
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-none text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="group inline-flex items-center px-6 py-2 bg-black text-white font-medium rounded-none hover:bg-gray-800 transition-colors"
                                >
                                    Submit Review
                                    <FaArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </section>
    );
}