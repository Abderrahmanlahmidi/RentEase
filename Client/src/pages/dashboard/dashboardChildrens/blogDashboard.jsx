import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useForm } from "react-hook-form";
import { showToast } from "../../../utils/toastUtils.jsx";
import { ToastContainer } from "react-toastify";

export default function BlogsDashboard() {

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const { handleSubmit, register, reset, setValue } = useForm();
    const [blogs, setBlogs] = useState([]);
    const [filteredData, setFileteredData] = useState([]);
    const [searchValue, setSearchValue] = useState("");


    const fetchBlogs = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/blogs");
            setBlogs(response.data.blogs);
        } catch {
            showToast("error", "Failed to fetch blogs.");
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const closeModals = () => {
        setIsCreateModalOpen(false);
        setIsUpdateModalOpen(false);
        setSelectedBlog(null);
        reset();
    };

    const createBlog = async (data) => {
        try {
            await axios.post("http://127.0.0.1:8000/api/blog", data, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            showToast("success", "Blog created successfully!");
            await fetchBlogs();
            closeModals();
        } catch {
            showToast("error", "Error creating blog.");
        }
    };

    const updateBlog = async (data) => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/blog/${selectedBlog.id}`, data, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            showToast("success", "Blog updated successfully!");
            await fetchBlogs();
            closeModals();
        } catch {
            showToast("error", "Error updating blog.");
        }
    };

    const deleteBlog = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/blog/${id}`);
            showToast("success", "Blog deleted successfully!");
            await fetchBlogs();
        } catch {
            showToast("error", "Error deleting blog.");
        }
    };

    const searchBlog = (inputValue) => {
        setSearchValue(inputValue);
        if (inputValue !== "") {
            const filtered = blogs.filter(blog => {
                return Object.values(blog).join('').toLowerCase().includes(inputValue.toLowerCase());
            });
            setFileteredData(filtered);
        } else {
            setFileteredData(blogs);
        }
    };

    const result = searchValue === "" ? blogs : filteredData;

    return (
        <div className="relative overflow-x-auto w-full sm:rounded-lg">
            <ToastContainer />
            <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Blog Management
                </h2>
                {/*<button*/}
                {/*    onClick={openCreateModal}*/}
                {/*    className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700"*/}
                {/*>*/}
                {/*    Add Blog*/}
                {/*</button>*/}
                <div>
                    <input
                        type="text"
                        placeholder="Search blog..."
                        onChange={(e) => searchBlog(e.target.value)}
                        className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                </div>
            </div>

            <div className="relative overflow-auto max-h-[600px] w-full sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="sticky top-0 z-10 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">Title</th>
                        <th className="px-6 py-3">Content</th>
                        <th className="px-6 py-3">Author</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {result.map((blog, index) => (
                        <motion.tr
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            key={index}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                        >
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white truncate max-w-xs">
                                {blog.titre.length > 40 ? `${blog.titre.substring(0, 40)}...` : blog.titre}
                            </td>
                            <td className="px-6 py-4  whitespace-nowrap dark:text-white truncate max-w-xs">
                                {blog.contenu.length > 80 ? `${blog.contenu.substring(0, 80)}...` : blog.contenu}
                            </td>
                            <td className="px-6 py-4  whitespace-nowrap dark:text-white">
                                {blog.auteur.firstName}  {blog.auteur.lastName}
                            </td>
                            <td className="px-6 py-4  whitespace-nowrap dark:text-white">
                                {blog.datePublication}
                            </td>
                            <td className="px-6 py-4 text-center space-x-2">
                                {/*<button*/}
                                {/*    onClick={() => openUpdateModal(blog)}*/}
                                {/*    className="bg-blue-500 text-white px-3 py-1 cursor-pointer rounded hover:bg-blue-600 text-xs"*/}
                                {/*>*/}
                                {/*    Update*/}
                                {/*</button>*/}
                                <button
                                    onClick={() => deleteBlog(blog.id)}
                                    className="bg-red-500 text-white px-3 py-1 cursor-pointer rounded hover:bg-red-600 text-xs"
                                >
                                    Delete
                                </button>
                            </td>
                        </motion.tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Create Blog Modal */}
            {isCreateModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 flex items-center justify-center opacity"
                    onClick={closeModals}
                >
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                            Add Blog
                        </h3>
                        <form onSubmit={handleSubmit(createBlog)}>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Title
                                </label>
                                <input
                                    {...register("title", { required: true })}
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter blog title"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Content
                                </label>
                                <textarea
                                    {...register("content", { required: true })}
                                    rows="4"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Leave content..."
                                ></textarea>
                            </div>

                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={closeModals}
                                    className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}

            {/* Update Blog Modal */}
            {isUpdateModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 flex items-center justify-center opacity"
                    onClick={closeModals}
                >
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                            Update Blog
                        </h3>
                        <form onSubmit={handleSubmit(updateBlog)}>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Title
                                </label>
                                <input
                                    {...register("title", { required: true })}
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter blog title"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Content
                                </label>
                                <textarea
                                    {...register("content", { required: true })}
                                    rows="4"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Leave content..."
                                ></textarea>
                            </div>

                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={closeModals}
                                    className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
