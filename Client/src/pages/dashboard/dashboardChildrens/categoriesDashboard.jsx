import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useForm } from "react-hook-form";
import { showToast } from "../../../utils/toastUtils.jsx";
import { ToastContainer } from "react-toastify";
import { FaPlus, FaTimes, FaArrowRight } from "react-icons/fa";

export default function CategoriesDashboard() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);

    const { register, handleSubmit, setValue, reset } = useForm();

    useEffect(() => {
        displayCategories();
    }, []);

    const displayCategories = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/categories");
            setCategories(response.data.categories);
        } catch {
            showToast("error", "Failed to load categories");
        }
    };

    const deleteCategories = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/category/${id}`);
            setCategories(categories.filter((prev) => prev.id !== id));
            showToast("success", "Category deleted successfully");
        } catch {
            showToast("error", "Failed to delete category");
        }
    };

    const createNewCategory = async (data) => {
        try {
            await axios.post(
                "http://127.0.0.1:8000/api/category",
                data,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            displayCategories();
            setIsCreateModalOpen(false);
            reset();
            showToast("success", "Category created successfully");
        } catch  {
            showToast("error", "Failed to create category");
        }
    };

    const updateModalCategories = (category) => {
        setIsUpdateModalOpen(true);
        setSelectedCategory(category.id);
        setValue('nom', category.nom);
        setValue('description', category.description);
    };

    const updateCategory = async (data) => {
        try {
            await axios.put(
                `http://127.0.0.1:8000/api/category/update/${selectedCategory}`,
                data,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            setIsUpdateModalOpen(false);
            displayCategories();
            setSelectedCategory(null);
            showToast("success", "Category updated successfully");
        } catch {
            showToast("error", "Failed to update category");
        }
    };

    return (
        <div className="w-full">
            <ToastContainer />

            <div className="flex items-center justify-between p-6 bg-white border-b border-gray-200">
                <h2 className="text-xl font-light text-gray-900">
                    Category Management
                </h2>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center px-4 py-2 border border-gray-200 hover:border-gray-300 text-gray-800"
                >
                    <FaPlus className="mr-2" />
                    Add Category
                </button>
            </div>

            <div className="relative overflow-auto max-h-[600px] w-full">
                <table className="w-full text-sm text-left">
                    <thead className="sticky top-0 z-10 text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 font-medium">Name</th>
                            <th className="px-6 py-3 font-medium">Description</th>
                            <th className="px-6 py-3 font-medium text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <motion.tr
                                key={category.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white border-b border-gray-200"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {category.nom}
                                </td>
                                <td className="px-6 py-4 text-gray-700">{category.description}</td>
                                <td className="px-6 py-4 text-center space-x-2">
                                    <button
                                        onClick={() => updateModalCategories(category)}
                                        className="px-3 py-1 border border-gray-300 hover:border-gray-400 text-gray-700"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => deleteCategories(category.id)}
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

            {isCreateModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 flex items-center justify-center opacity"
                    onClick={() => setIsCreateModalOpen(false)}
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
                                Add Category
                            </h3>
                            <button
                                onClick={() => setIsCreateModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(createNewCategory)} className="space-y-4">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    {...register("nom", { required: true })}
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                                    placeholder="Enter category name"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    {...register("description", { required: true })}
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                                    placeholder="Leave a description..."
                                ></textarea>
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 hover:border-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-black text-white hover:bg-gray-800 flex items-center"
                                >
                                    Add Category
                                    <FaArrowRight className="ml-2" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}


            {isUpdateModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 flex items-center justify-center opacity"
                    onClick={() => setIsUpdateModalOpen(false)}
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
                                Update Category
                            </h3>
                            <button
                                onClick={() => setIsUpdateModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(updateCategory)} className="space-y-4">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    {...register("nom", { required: true })}
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                                    placeholder="Enter category name"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    {...register("description", { required: true })}
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                                    placeholder="Leave a description..."
                                ></textarea>
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsUpdateModalOpen(false)}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 hover:border-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-black text-white hover:bg-gray-800 flex items-center"
                                >
                                    Update Category
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