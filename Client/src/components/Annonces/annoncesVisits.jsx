import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/userContext.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaTimes, FaTrash, FaCalendarAlt, FaUser, FaEnvelope, FaHome } from "react-icons/fa";
import { showToast } from "../../utils/toastUtils.jsx";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AnnoncesVisits() {
    const [visits, setVisits] = useState([]);
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("all");
    const [activeTab, setActiveTab] = useState("requests");
    const [myvisits, setMyvisits] = useState([]);
    const navigate = useNavigate();

    const handleStatusChange = async (id, status) => {
        setLoading(true);
        try {
            await axios.put(`http://127.0.0.1:8000/api/visit/status/${id}`, { status });
            setVisits(prevVisits => prevVisits.map(item => (
                item.id === id ? { ...item, status } : item
            )));
            showToast('success', `Visit ${status === "acceptée" ? "accepted" : "rejected"} successfully!`);
        } catch (error) {
            console.error("Error updating status:", error);
            showToast('error', 'Failed to update visit status');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveVisit = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`http://127.0.0.1:8000/api/visit/delete/${id}`);
            setVisits(prevVisits => prevVisits.filter(visit => visit.id !== id));
            setMyvisits(prevVisits => prevVisits.filter(visit => visit.id !== id));
            showToast('success', 'Visit removed successfully!');
        } catch (error) {
            console.error("Error removing visit:", error);
            showToast('error', 'Failed to remove visit');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getVisits = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/visits");
                setVisits(response.data.visits);
            } catch (error) {
                console.error("Error fetching visits:", error);
                showToast('error', 'Failed to load visits');
            } finally {
                setLoading(false);
            }
        };
        getVisits();
    }, []);

    const filteredVisits = visits.filter(item => {
        if (item.annonce.proprietaire_id !== user.id) return false;
        if (filter === "all") return true;
        return item.status === (filter === "pending" ? "en_attente" :
            filter === "accepted" ? "acceptée" : "refusée");
    });

    useEffect(() => {
        const filtered = visits.filter(item => item.user_id === user.id);
        setMyvisits(filtered);
    }, [visits, user?.id]);

    const buttonVariants = {
        hover: { scale: 1.03 },
        tap: { scale: 0.97 }
    };

    const statusVariants = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 }
    };

    const rowVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 }
    };

    const tabVariants = {
        active: { backgroundColor: "#000000", color: "#FFFFFF" },
        inactive: { backgroundColor: "#F3F4F6", color: "#000000" }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "acceptée":
                return { bg: "bg-gray-100", text: "text-gray-900", border: "border border-gray-300" };
            case "refusée":
                return { bg: "bg-gray-100", text: "text-gray-900", border: "border border-gray-300" };
            default:
                return { bg: "bg-gray-100", text: "text-gray-900", border: "border border-gray-300" };
        }
    };

    return (
        <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
            <ToastContainer />
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-light text-gray-900 mb-2">Visit Management</h1>
                    <p className="text-gray-600">Manage your property visits and schedule</p>

                    {/* Tab Navigation */}
                    <div className="flex mt-8 border-b border-gray-200">
                        <motion.button
                            variants={tabVariants}
                            animate={activeTab === "requests" ? "active" : "inactive"}
                            onClick={() => setActiveTab("requests")}
                            className="px-6 py-3 text-sm font-medium rounded-none mr-1 border border-gray-200 border-b-0"
                        >
                            Visit Requests
                        </motion.button>
                        <motion.button
                            variants={tabVariants}
                            animate={activeTab === "schedule" ? "active" : "inactive"}
                            onClick={() => setActiveTab("schedule")}
                            className="px-6 py-3 text-sm font-medium rounded-none border border-gray-200 border-b-0"
                        >
                            My Visits
                        </motion.button>
                    </div>

                    {/* Filter Controls - Only for requests tab */}
                    {activeTab === "requests" && (
                        <div className="flex space-x-2 mt-4">
                            <button
                                onClick={() => setFilter("all")}
                                className={`px-4 py-2 text-sm rounded-none border ${filter === "all" ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300'}`}
                            >
                                All Visits
                            </button>
                            <button
                                onClick={() => setFilter("pending")}
                                className={`px-4 py-2 text-sm rounded-none border ${filter === "pending" ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300'}`}
                            >
                                Pending
                            </button>
                            <button
                                onClick={() => setFilter("accepted")}
                                className={`px-4 py-2 text-sm rounded-none border ${filter === "accepted" ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300'}`}
                            >
                                Accepted
                            </button>
                            <button
                                onClick={() => setFilter("rejected")}
                                className={`px-4 py-2 text-sm rounded-none border ${filter === "rejected" ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300'}`}
                            >
                                Rejected
                            </button>
                        </div>
                    )}
                </div>

                {loading && (
                    <div className="mb-4 p-4 bg-gray-100 text-gray-700 rounded-none border border-gray-200 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700 mr-2"></div>
                        Loading data...
                    </div>
                )}

                {activeTab === "requests" ? (
                    <div className="border border-gray-200 rounded-none overflow-hidden">
                        {filteredVisits.length === 0 ? (
                            <div className="p-8 text-center text-gray-500 border-b border-gray-200">
                                No visit requests found matching your criteria
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                            <div className="flex items-center">
                                                <FaUser className="mr-2" /> Visitor
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                            <div className="flex items-center">
                                                <FaEnvelope className="mr-2" /> Email
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                            <div className="flex items-center">
                                                <FaCalendarAlt className="mr-2" /> Visit Date
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                            Actions
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    <AnimatePresence>
                                        {filteredVisits.map(visit => (
                                            <motion.tr
                                                key={visit.id}
                                                variants={rowVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="hidden"
                                                transition={{ duration: 0.2 }}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium border border-gray-300">
                                                            {visit.visiteur.firstName.charAt(0)}
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {visit.visiteur.firstName} {visit.visiteur.lastName}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                                                    <div className="text-sm text-gray-900">{visit.visiteur.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                                                    <div className="text-sm text-gray-900">
                                                        {new Date(visit.date_visite).toLocaleString([], {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                                                    <motion.span
                                                        variants={statusVariants}
                                                        initial="initial"
                                                        animate="animate"
                                                        className={`px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-none border ${getStatusColor(visit.status).border} ${getStatusColor(visit.status).bg} ${getStatusColor(visit.status).text}`}
                                                    >
                                                        {visit.status === "acceptée" ? (
                                                            <FaCheck className="mr-1" />
                                                        ) : visit.status === "refusée" ? (
                                                            <FaTimes className="mr-1" />
                                                        ) : null}
                                                        {visit.status === "acceptée"
                                                            ? "Accepted"
                                                            : visit.status === "refusée"
                                                                ? "Rejected"
                                                                : "Pending"}
                                                    </motion.span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium border-b border-gray-200">
                                                    <div className="flex justify-end items-center gap-2">
                                                        {visit.status === "en_attente" ? (
                                                            <>
                                                                <motion.button
                                                                    variants={buttonVariants}
                                                                    whileHover="hover"
                                                                    whileTap="tap"
                                                                    onClick={() => handleStatusChange(visit.id, "acceptée")}
                                                                    className="p-2 bg-black text-white rounded-none hover:bg-gray-800 transition-all border border-black flex items-center justify-center"
                                                                    title="Accept"
                                                                    disabled={loading}
                                                                >
                                                                    <FaCheck className="text-sm" />
                                                                </motion.button>
                                                                <motion.button
                                                                    variants={buttonVariants}
                                                                    whileHover="hover"
                                                                    whileTap="tap"
                                                                    onClick={() => handleStatusChange(visit.id, "refusée")}
                                                                    className="p-2 bg-white text-black rounded-none hover:bg-gray-100 transition-all border border-gray-300 flex items-center justify-center"
                                                                    title="Reject"
                                                                    disabled={loading}
                                                                >
                                                                    <FaTimes className="text-sm" />
                                                                </motion.button>
                                                            </>
                                                        ) : (
                                                            <motion.span
                                                                variants={statusVariants}
                                                                initial="initial"
                                                                animate="animate"
                                                                className="flex items-center gap-2 text-gray-600"
                                                            >
                                                                {visit.status === "acceptée" ? (
                                                                    <FaCheck className="text-sm" />
                                                                ) : (
                                                                    <FaTimes className="text-sm" />
                                                                )}
                                                                {visit.status === "acceptée" ? "Accepted" : "Rejected"}
                                                            </motion.span>
                                                        )}
                                                        <motion.button
                                                            variants={buttonVariants}
                                                            whileHover="hover"
                                                            whileTap="tap"
                                                            onClick={() => handleRemoveVisit(visit.id)}
                                                            className="p-2 bg-white text-gray-700 rounded-none hover:bg-gray-100 transition-all border border-gray-300 flex items-center justify-center"
                                                            title="Remove Visit"
                                                            disabled={loading}
                                                        >
                                                            <FaTrash className="text-sm" />
                                                        </motion.button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="border border-gray-200 rounded-none overflow-hidden">
                        {myvisits.length === 0 ? (
                            <div className="p-8 text-center text-gray-500 border-b border-gray-200">
                                You haven't scheduled any visits yet.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                            <div className="flex items-center">
                                                <FaHome className="mr-2" /> Property
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                            <div className="flex items-center">
                                                <FaCalendarAlt className="mr-2" /> Visit Date
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                            Actions
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    <AnimatePresence>
                                        {myvisits.map(visit => {
                                            const statusColor = getStatusColor(visit.status);
                                            return (
                                                <motion.tr
                                                    key={visit.id}
                                                    variants={rowVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="hidden"
                                                    transition={{ duration: 0.2 }}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {visit.annonce.titre}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {visit.annonce.adresse}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                                                        <div className="text-sm text-gray-900">
                                                            {new Date(visit.date_visite).toLocaleString([], {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                                                        <motion.span
                                                            variants={statusVariants}
                                                            initial="initial"
                                                            animate="animate"
                                                            className={`px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-none ${statusColor.bg} ${statusColor.text} ${statusColor.border}`}
                                                        >
                                                            {visit.status === "acceptée" ? (
                                                                <FaCheck className="mr-1" />
                                                            ) : visit.status === "refusée" ? (
                                                                <FaTimes className="mr-1" />
                                                            ) : null}
                                                            {visit.status === "acceptée"
                                                                ? "Accepted"
                                                                : visit.status === "refusée"
                                                                    ? "Rejected"
                                                                    : "Pending"}
                                                        </motion.span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium border-b border-gray-200">
                                                        <div className="flex justify-end gap-2">
                                                            <motion.button
                                                                variants={buttonVariants}
                                                                whileHover="hover"
                                                                whileTap="tap"
                                                                onClick={() => navigate(`/properties/annonce/${visit.annonce_id}`)}
                                                                className="p-2 bg-black text-white rounded-none hover:bg-gray-800 transition-all border border-black flex items-center justify-center"
                                                                title="View Property"
                                                            >
                                                                <FaHome className="text-sm" />
                                                            </motion.button>
                                                            <motion.button
                                                                variants={buttonVariants}
                                                                whileHover="hover"
                                                                whileTap="tap"
                                                                onClick={() => handleRemoveVisit(visit.id)}
                                                                className="p-2 bg-white text-gray-700 rounded-none hover:bg-gray-100 transition-all border border-gray-300 flex items-center justify-center"
                                                                title="Cancel Visit"
                                                                disabled={loading}
                                                            >
                                                                <FaTrash className="text-sm" />
                                                            </motion.button>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            );
                                        })}
                                    </AnimatePresence>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}