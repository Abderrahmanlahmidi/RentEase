import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useForm } from "react-hook-form";
import {ToastContainer} from "react-toastify";
import {showToast} from "../../../utils/toastUtils.jsx";

export default function SallesDashboard() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedSalle, setSelectedSalle] = useState(null);
    const { handleSubmit, register, reset, setValue } = useForm();
    const [salles, setSalles] = useState([]);

    const fetchSalles = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/salles");
            setSalles(response.data.salles);
        } catch {
            showToast("error", "Failed to fetch salles.");
        }
    };

    useEffect(() => {
        fetchSalles();
    }, []);

    const openCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const openUpdateModal = (salle) => {
        setSelectedSalle(salle);
        setIsUpdateModalOpen(true);

        setValue("type", salle.type);
        setValue("description", salle.description);
    };

    const closeModals = () => {
        setIsCreateModalOpen(false);
        setIsUpdateModalOpen(false);
        setSelectedSalle(null);
        reset();
    };


    const createSalle = async (data) => {
        try {
            await axios.post("http://127.0.0.1:8000/api/salle", {'type':data.type, 'description':data.description},
             {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            await fetchSalles();
            closeModals();
            showToast("success", "Salle created!");
        } catch  {

            showToast("error", "Error creating Salle");
        }
    };


    const updateSalle = async (data) => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/salle/update/${selectedSalle.id}`, data, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            await fetchSalles();
            closeModals();
            showToast("success", "Salle updated!");
        } catch  {
            showToast("error", "Error updating Salle");
        }
    };

    const deleteSalle = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/salle/${id}`);
            await fetchSalles();
            showToast("success", "Salle deleted!");
        } catch  {
            showToast("error", "Error deleting Salle");
        }
    };

    return (
        <div className="relative overflow-x-auto w-full sm:rounded-lg">
            <ToastContainer/>
            <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Salle Management
                </h2>
                <button
                    onClick={openCreateModal}
                    className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700"
                >
                    Add Salle
                </button>
            </div>

            <div className="relative overflow-auto max-h-[600px] w-full sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="sticky top-0 z-10 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <motion.tr
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Description</th>
                        <th className="px-6 py-3 text-center">Actions</th>
                    </motion.tr>
                    </thead>
                    <tbody>
                    {salles.map((salle, index) => (
                        <motion.tr
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            key={index}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                        >
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {salle.type}
                            </td>
                            <td className="px-6 py-4">{salle.description}</td>
                            <td className="px-6 py-4 text-center space-x-2">
                                <button
                                    onClick={() => openUpdateModal(salle)}
                                    className="bg-blue-500 text-white px-3 py-1 cursor-pointer rounded hover:bg-blue-600 text-xs"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => deleteSalle(salle.id)}
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

            {/* Create Salle Modal */}
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
                            Add Salle
                        </h3>
                        <form onSubmit={handleSubmit(createSalle)}>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Name
                                </label>
                                <input
                                    {...register("type", { required: true })}
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter salle type"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Description
                                </label>
                                <textarea
                                    {...register("description", { required: true })}
                                    rows="4"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Leave a description..."
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

            {/* Update Salle Modal */}
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
                            Update Salle
                        </h3>
                        <form onSubmit={handleSubmit(updateSalle)}>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Name
                                </label>
                                <input
                                    {...register("type", { required: true })}
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter salle type"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Description
                                </label>
                                <textarea
                                    {...register("description", { required: true })}
                                    rows="4"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Leave a description..."
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
