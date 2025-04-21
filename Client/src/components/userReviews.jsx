import { useState, useContext, useEffect } from 'react';
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import { UserContext } from '../context/userContext.jsx';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { showToast } from "../utils/toastUtils.jsx";
import { ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

export default function UserReviews() {
    const { user } = useContext(UserContext);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [selectReviews, setSelectReviews] = useState(null);
    
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm();

    const getReviews = async () => {
        const response = await axios.get("http://127.0.0.1:8000/api/reviews");
        setReviews(response.data.reviews);
    }
    
    useEffect(() => {
        getReviews();
    }, [])

    const filterReviews = reviews.filter((review) => review.auteur_id === user.id);

    const openUpdateModal = (review) => {
        setValue("titre", review.titre);
        setValue("contenu", review.contenu);
        setValue("datePublication", review.datePublication)
        setSelectReviews(review);
        setIsEditModalOpen(true);
    }

    const updateReview = async (data) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/review/update/${selectReviews.id}`, {...data, auteur_id:selectReviews.auteur.id});
            await getReviews();
            setIsEditModalOpen(false);
            showToast("success" , "Review updated successfully");
        } catch {
            showToast("error", "Failed to update review");
        }
    }

    const deleteReview = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/review/${id}`)
            await getReviews();
            showToast("success", "Review deleted successfully");
        } catch {
            showToast("error", "Failed to delete review");
        }
    }

    return (
        <div className="min-h-screen bg-white p-4 md:p-8">
            <ToastContainer/>
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-3xl font-light tracking-tight text-gray-900 mb-2">My Reviews</h1>
                    <p className="text-gray-600">Manage your property reviews</p>
                </motion.div>

                {/* Reviews Table */}
                <div className="bg-white border border-gray-200 rounded-none overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Title</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Content</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Date</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filterReviews.length > 0 ? (
                                    filterReviews.map((review) => (
                                        <motion.tr 
                                            key={review.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{review.titre}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-600 line-clamp-2">{review.contenu}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{review.datePublication}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => openUpdateModal(review)}
                                                    className="text-gray-600 hover:text-black mr-4"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() => deleteReview(review.id)}
                                                    className="text-gray-600 hover:text-black"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                            No reviews found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Edit Review Modal */}
                <AnimatePresence>
                    {isEditModalOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                        >
                            <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.9 }}
                                className="bg-white border border-gray-200 rounded-none w-full max-w-md"
                            >
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-medium text-gray-900">Edit Review</h2>
                                        <button
                                            onClick={() => setIsEditModalOpen(false)}
                                            className="text-gray-500 hover:text-black"
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>

                                    <form onSubmit={handleSubmit(updateReview)}>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                                <input
                                                    {...register("titre", {required:"Title is required"})}
                                                    type="text"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-1 focus:ring-black focus:border-black"
                                                />
                                                {errors.titre && (
                                                    <p className='mt-1 text-sm text-red-500'>{errors.titre.message}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Review</label>
                                                <textarea
                                                    {...register("contenu", {required:"Review content is required"})}
                                                    rows="4"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-1 focus:ring-black focus:border-black"
                                                ></textarea>
                                                {errors.contenu && (
                                                    <p className='mt-1 text-sm text-red-500'>{errors.contenu.message}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                                                <input
                                                    {...register("datePublication", {required:"Date is required"})}
                                                    type="date"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-1 focus:ring-black focus:border-black"
                                                />
                                                {errors.datePublication && (
                                                    <p className='mt-1 text-sm text-red-500'>{errors.datePublication.message}</p>
                                                )}
                                            </div>

                                            <div className="flex justify-end gap-3 pt-4">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsEditModalOpen(false)}
                                                    className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
                                                >
                                                    Update Review
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}