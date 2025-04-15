import { motion } from "framer-motion";
import { FaCalendarAlt, FaPlus, FaTimes } from "react-icons/fa";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {UserContext} from "../../context/userContext.jsx";

export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const {user} = useContext(UserContext);


    useEffect(() => {
        const getReviews = async () => {
            const response = await axios.get("http://127.0.0.1:8000/api/blogs");
            setReviews(response.data.blogs);
        }
        getReviews();
    }, []);


    const onSubmit = async (data) => {
        try {
            const date = new Date();
            const formattedDate = date.toISOString().split('T')[0];
            console.log(formattedDate);
            console.log(user.id);
            const response = await axios.post("http://127.0.0.1:8000/api/blog", {...data, 'auteur_id':user?.id, 'datePublication':formattedDate} );
            console.log(response);
            setReviews([...reviews, response.data.review]);
            setIsModalOpen(false);
            reset();
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">

            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Customer Reviews</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Hear what our clients say about their experience with our services
                    </p>

                    {/* Add Review Button */}
                    {user && (
                        <div className="mt-8">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center mx-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                            >
                                <FaPlus className="mr-2" />
                                Add Your Review
                            </button>
                        </div>
                    )}
                </motion.div>

                {/* Review Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    {review.titre}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    {review.contenu}
                                </p>

                                <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                                            <img
                                                src={review.auteur.profile_image}
                                                alt="Profile"
                                                className="w-9 h-9 rounded-full object-cover"
                                            />
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {review.auteur.firstName} {review.auteur.lastName}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                                        <FaCalendarAlt className="w-3 h-3" />
                                        <span>
                                            {review.datePublication}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Add Review Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 opacity flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 relative"
                    >
                        <button
                            onClick={() => {
                                setIsModalOpen(false);
                                reset();
                            }}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            <FaTimes className="w-5 h-5" />
                        </button>

                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add Your Review</h3>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Title
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    {...register("titre", { required: "Title is required" })}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="Your review title"
                                />
                                {errors.titre && (
                                    <p className="mt-1 text-sm text-red-600">{errors.titre.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    rows="4"
                                    {...register("contenu", { required: "Description is required" })}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="Share your experience..."
                                ></textarea>
                                {errors.contenu && (
                                    <p className="mt-1 text-sm text-red-600">{errors.contenu.message}</p>
                                )}
                            </div>


                              <div className="flex justify-end space-x-3 pt-4">
                                      <button
                                          type="button"
                                          onClick={() => {
                                              setIsModalOpen(false);
                                              reset();
                                          }}
                                          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                      >
                                          Cancel
                                      </button>
                                      <button
                                      type="submit"
                                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                                      >
                                      Submit Review
                                      </button>
                              </div>

                        </form>
                    </motion.div>
                </div>
            )}
        </section>
    );
}