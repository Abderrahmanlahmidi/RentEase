import { motion } from "framer-motion";
import { FaSearch } from 'react-icons/fa';
import { UserContext } from "../../../context/userContext.jsx";
import {useContext, useState} from "react";
import axios from "axios";
import {showToast} from "../../../utils/toastUtils.jsx";
import {ToastContainer} from "react-toastify";

export default function AnnoncesDashboard() {
    const { announcements, setAnnouncements} = useContext(UserContext);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");

    const searchAnnoncement = (searchValue) => {
        setSearch(searchValue);
        if (searchValue !== "") {
            const filteredAnnonce = announcements.filter((item) =>
                Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            );
            setFiltered(filteredAnnonce);
        }
    };

    const handleDeleteAnnonce = (id) => {
        const updatedAnnouncements = announcements.filter(item => item.id !== id);
        setAnnouncements(updatedAnnouncements);
    }

    const deleteAnnonce = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/annonce/${id}`);

            showToast("success", "Annonce deleted successfully");
        } catch {
            showToast("error", "Failed to delete Annonce");
        }
    };






    const displayedAnnonces = search === "" ? announcements : filtered;

    return (
        <div className="w-full bg-white border border-gray-200 rounded-none overflow-hidden">
            {/* Header with Search */}
            <ToastContainer/>
            <div className="flex flex-col md:flex-row items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-light text-gray-900 mb-4 md:mb-0">
                    Annonces Management
                </h2>
                <div className="relative w-full md:w-64">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FaSearch className="w-4 h-4 text-gray-500" />
                    </div>
                    <input
                        onChange={(e) => searchAnnoncement(e.target.value)}
                        type="text"
                        placeholder="Search announcements..."
                        className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-none focus:ring-1 focus:ring-black focus:border-black outline-none"
                    />
                </div>
            </div>

            {/* Table Container */}
            <div className="relative overflow-auto max-h-[600px] w-full">
                <motion.table
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full text-sm text-left text-gray-600"
                >
                    <thead className="sticky top-0 z-10 text-xs text-gray-600 uppercase bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-medium">Title</th>
                            <th className="px-6 py-4 font-medium">Price</th>
                            <th className="px-6 py-4 font-medium">Location</th>
                            <th className="px-6 py-4 font-medium">Category</th>
                            <th className="px-6 py-4 font-medium">Date</th>
                            <th className="px-6 py-4 font-medium text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedAnnonces.length > 0 ? (
                            displayedAnnonces.map((item) => (
                                <motion.tr
                                    key={item.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-6 py-4 font-light text-gray-900 truncate max-w-xs">
                                        {item.titre}
                                    </td>
                                    <td className="px-6 py-4 font-light text-gray-900">
                                        ${item.prix}
                                    </td>
                                    <td className="px-6 py-4 font-light text-gray-900">
                                        {item.quartier?.nom}
                                    </td>
                                    <td className="px-6 py-4 font-light text-gray-900">
                                        {item.category?.nom}
                                    </td>
                                    <td className="px-6 py-4 font-light text-gray-900">
                                        {new Date(item.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                                deleteAnnonce(item.id);
                                                handleDeleteAnnonce(item.id)
                                            }}
                                            className="px-3 py-1 text-xs font-medium text-white bg-black hover:bg-gray-800 transition-colors"
                                        >
                                            Delete
                                        </motion.button>
                                    </td>
                                </motion.tr>
                            ))
                        ) : (
                            <motion.tr
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                    No announcements found
                                </td>
                            </motion.tr>
                        )}
                    </tbody>
                </motion.table>
            </div>
        </div>
    );
}