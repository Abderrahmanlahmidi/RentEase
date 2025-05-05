import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { showToast } from "../../../utils/toastUtils.jsx";
import { FaPlus, FaTimes, FaArrowRight } from "react-icons/fa";

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
            await axios.post("http://127.0.0.1:8000/api/salle", 
                {'type': data.type, 'description': data.description},
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            await fetchSalles();
            closeModals();
            showToast("success", "Salle created!");
        } catch {
            showToast("error", "Error creating Salle");
        }
    };

    const updateSalle = async (data) => {
        try {
            await axios.put(
                `http://127.0.0.1:8000/api/salle/update/${selectedSalle.id}`, 
                data, 
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            await fetchSalles();
            closeModals();
            showToast("success", "Salle updated!");
        } catch {
            showToast("error", "Error updating Salle");
        }
    };

    const deleteSalle = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/salle/${id}`);
            await fetchSalles();
            showToast("success", "Salle deleted!");
        } catch {
            showToast("error", "Error deleting Salle");
        }
    };

    return (
        <div className="w-full">
            <ToastContainer />
            <div className="flex items-center justify-between p-6 bg-white border-b border-gray-200">
                <h2 className="text-xl font-light text-gray-900">
                    Salle Management
                </h2>
                <button
                    onClick={openCreateModal}
                    className="flex items-center px-4 py-2 border border-gray-200 hover:border-gray-300 text-gray-800"
                >
                    <FaPlus className="mr-2" />
                    Add Salle
                </button>
            </div>

            <div className="relative overflow-auto max-h-[600px] w-full">
                <table className="w-full text-sm text-left">
                    <thead className="sticky top-0 z-10 text-xs text-gray-700 uppercase bg-gray-50">
                        <motion.tr
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <th className="px-6 py-3 font-medium">Name</th>
                            <th className="px-6 py-3 font-medium">Description</th>
                            <th className="px-6 py-3 font-medium text-center">Actions</th>
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
                                className="bg-white border-b border-gray-200"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {salle.type}
                                </td>
                                <td className="px-6 py-4 text-gray-700">{salle.description}</td>
                                <td className="px-6 py-4 text-center space-x-2">
                                    <button
                                        onClick={() => openUpdateModal(salle)}
                                        className="px-3 py-1 border border-gray-300 hover:border-gray-400 text-gray-700"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => deleteSalle(salle.id)}
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
                                Add Salle
                            </h3>
                            <button
                                onClick={closeModals}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(createSalle)} className="space-y-4">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    {...register("type", { required: true })}
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                                    placeholder="Enter salle type"
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
                                    onClick={closeModals}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 hover:border-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-black text-white hover:bg-gray-800 flex items-center"
                                >
                                    Add Salle
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
                                Update Salle
                            </h3>
                            <button
                                onClick={closeModals}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(updateSalle)} className="space-y-4">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    {...register("type", { required: true })}
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                                    placeholder="Enter salle type"
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
                                    onClick={closeModals}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 hover:border-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-black text-white hover:bg-gray-800 flex items-center"
                                >
                                    Update Salle
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