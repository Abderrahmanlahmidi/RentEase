import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useForm } from "react-hook-form";
import { showToast } from "../../../utils/toastUtils.jsx";
import { ToastContainer } from "react-toastify";
import { FaPlus, FaTimes, FaArrowRight } from "react-icons/fa";

export default function RolesDashboard() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const { handleSubmit, register, reset, setValue } = useForm();
    const [roles, setRoles] = useState([]);

    const fetchRoles = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/roles");
            setRoles(response.data.data);
        } catch (error) {
            console.error(error);
            showToast("error", "Failed to fetch roles.");
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const openCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const openUpdateModal = (role) => {
        setSelectedRole(role);
        setIsUpdateModalOpen(true);
        setValue("name", role.name);
        setValue("description", role.description);
    };

    const closeModals = () => {
        setIsCreateModalOpen(false);
        setIsUpdateModalOpen(false);
        setSelectedRole(null);
        reset();
    };

    const createRole = async (data) => {
        try {
            await axios.post("http://127.0.0.1:8000/api/role", data, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            showToast("success", "Role created successfully!");
            await fetchRoles();
            closeModals();
        } catch {
            showToast("error", "Error creating role.");
        }
    };

    const updateRole = async (data) => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/role/${selectedRole.id}`, data, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            showToast("success", "Role updated successfully!");
            await fetchRoles();
            closeModals();
        } catch {
            showToast("error", "Error updating role.");
        }
    };

    const deleteRole = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/role/${id}`);
            showToast("success", "Role deleted successfully!");
            await fetchRoles();
        } catch {
            showToast("error", "Error deleting role.");
        }
    };

    return (
        <div className="w-full">
            <ToastContainer />
            <div className="flex items-center justify-between p-6 bg-white border-b border-gray-200">
                <h2 className="text-xl font-light text-gray-900">
                    Role Management
                </h2>
                <button
                    onClick={openCreateModal}
                    className="flex items-center px-4 py-2 border border-gray-200 hover:border-gray-300 text-gray-800"
                >
                    <FaPlus className="mr-2" />
                    Add Role
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
                        {roles.map((role, index) => (
                            <motion.tr
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                key={index}
                                className="bg-white border-b border-gray-200"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {role.name}
                                </td>
                                <td className="px-6 py-4 text-gray-700">{role.description}</td>
                                <td className="px-6 py-4 text-center space-x-2">
                                    <button
                                        onClick={() => openUpdateModal(role)}
                                        className="px-3 py-1 border border-gray-300 hover:border-gray-400 text-gray-700"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => deleteRole(role.id)}
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

            {/* Create Role Modal */}
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
                                Add Role
                            </h3>
                            <button
                                onClick={closeModals}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(createRole)} className="space-y-4">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    {...register("name", { required: true })}
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                                    placeholder="Enter role name"
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
                                    Add Role
                                    <FaArrowRight className="ml-2" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}

            {/* Update Role Modal */}
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
                                Update Role
                            </h3>
                            <button
                                onClick={closeModals}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(updateRole)} className="space-y-4">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    {...register("name", { required: true })}
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                                    placeholder="Enter role name"
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
                                    Update Role
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