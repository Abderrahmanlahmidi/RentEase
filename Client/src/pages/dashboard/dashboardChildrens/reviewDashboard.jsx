import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useForm } from "react-hook-form";
import { showToast } from "../../../utils/toastUtils.jsx";
import { ToastContainer } from "react-toastify";
import {FaTimes, FaArrowRight, FaSearch } from "react-icons/fa";

export default function ReviewsDashboard() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const { handleSubmit, register, reset } = useForm();
    const [reviews, setReviews] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const fetchReviews = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/reviews");
            setReviews(response.data.reviews);
        } catch {
            showToast("error", "Failed to fetch reviews.");
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const closeModals = () => {
        setIsCreateModalOpen(false);
        setIsUpdateModalOpen(false);
        setSelectedReview(null);
        reset();
    };

    const createReview = async (data) => {
        try {
            await axios.post("http://127.0.0.1:8000/api/review", data, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            showToast("success", "Review created successfully!");
            await fetchReviews();
            closeModals();
        } catch {
            showToast("error", "Error creating review.");
        }
    };

    const updateReview = async (data) => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/review/${selectedReview.id}`, data, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            showToast("success", "Review updated successfully!");
            await fetchReviews();
            closeModals();
        } catch {
            showToast("error", "Error updating review.");
        }
    };

    const deleteReview = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/review/${id}`);
            showToast("success", "Review deleted successfully!");
            await fetchReviews();
        } catch {
            showToast("error", "Error deleting review.");
        }
    };

    const searchReview = (inputValue) => {
        setSearchValue(inputValue);
        if (inputValue !== "") {
            const filtered = reviews.filter(review => {
                return Object.values(review).join('').toLowerCase().includes(inputValue.toLowerCase());
            });
            setFilteredData(filtered);
        } else {
            setFilteredData(reviews);
        }
    };

    const result = searchValue === "" ? reviews : filteredData;

    return (
        <div className="w-full">
            <ToastContainer />
            <div className="flex items-center justify-between p-6 bg-white border-b border-gray-200">
                <h2 className="text-xl font-light text-gray-900">
                    Review Management
                </h2>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search reviews..."
                        onChange={(e) => searchReview(e.target.value)}
                        className="pl-10 px-4 py-2 text-sm border border-gray-300 focus:outline-none focus:border-black"
                    />
                </div>
            </div>

            <div className="relative overflow-auto max-h-[600px] w-full">
                <table className="w-full text-sm text-left">
                    <thead className="sticky top-0 z-10 text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 font-medium">Title</th>
                            <th className="px-6 py-3 font-medium">Content</th>
                            <th className="px-6 py-3 font-medium">Author</th>
                            <th className="px-6 py-3 font-medium">Date</th>
                            <th className="px-6 py-3 font-medium text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.map((review, index) => (
                            <motion.tr
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                key={index}
                                className="bg-white border-b border-gray-200"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 truncate max-w-xs">
                                    {review.titre.length > 40 ? `${review.titre.substring(0, 40)}...` : review.titre}
                                </td>
                                <td className="px-6 py-4 text-gray-700 truncate max-w-xs">
                                    {review.contenu.length > 80 ? `${review.contenu.substring(0, 80)}...` : review.contenu}
                                </td>
                                <td className="px-6 py-4 text-gray-700">
                                    {review.auteur.firstName} {review.auteur.lastName}
                                </td>
                                <td className="px-6 py-4 text-gray-700">
                                    {review.datePublication}
                                </td>
                                <td className="px-6 py-4 text-center space-x-2">
                                    <button
                                        onClick={() => deleteReview(review.id)}
                                        className="px-3 py-1 border border-gray-300 hover:border-gray-400 text-gray-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Create Review Modal */}
            {isCreateModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
                    onClick={closeModals}
                >
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white p-8 rounded-none border border-gray-200 w-96"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-light text-gray-900">
                                Add Review
                            </h3>
                            <button
                                onClick={closeModals}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(createReview)} className="space-y-4">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    {...register("titre", { required: true })}
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                                    placeholder="Enter review title"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Content
                                </label>
                                <textarea
                                    {...register("contenu", { required: true })}
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                                    placeholder="Leave content..."
                                ></textarea>
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModals}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 hover:border-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-black text-white hover:bg-gray-800 flex items-center"
                                >
                                    Add Review
                                    <FaArrowRight className="ml-2" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}

            {/* Update Review Modal */}
            {isUpdateModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
                    onClick={closeModals}
                >
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white p-8 rounded-none border border-gray-200 w-96"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-light text-gray-900">
                                Update Review
                            </h3>
                            <button
                                onClick={closeModals}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(updateReview)} className="space-y-4">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    {...register("titre", { required: true })}
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                                    placeholder="Enter review title"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Content
                                </label>
                                <textarea
                                    {...register("contenu", { required: true })}
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                                    placeholder="Leave content..."
                                ></textarea>
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModals}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 hover:border-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-black text-white hover:bg-gray-800 flex items-center"
                                >
                                    Update Review
                                    <FaArrowRight className="ml-2" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}