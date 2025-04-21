import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaTachometerAlt,
    FaUsers,
    FaUserShield,
    FaTags,
    FaBuilding,
    FaStar,
    FaHome,
    FaList
} from 'react-icons/fa';

export default function Sidebar() {
    const navItems = [
        {
            to: "/dashboard",
            label: "Dashboard",
            icon: <FaTachometerAlt className="w-4 h-4" />,
            end: true
        },
        {
            to: "/dashboard/users",
            label: "Users",
            icon: <FaUsers className="w-4 h-4" />,
        },
        {
            to: "/dashboard/annonces",
            label: "Annonces",
            icon: <FaList className="w-4 h-4" />
        },
        {
            to: "/dashboard/roles",
            label: "Roles",
            icon: <FaUserShield className="w-4 h-4" />,
        },
        {
            to: "/dashboard/categories",
            label: "Categories",
            icon: <FaTags className="w-4 h-4" />,
        },
        {
            to: "/dashboard/salles",
            label: "Salles",
            icon: <FaBuilding className="w-4 h-4" />,
        },
        {
            to: "/dashboard/tags",
            label: "Tags",
            icon: <FaTags className="w-4 h-4" />,
        },
        {
            to: "/dashboard/reviews",
            label: "Review",
            icon: <FaStar className="w-4 h-4" />,
        }
    ];

    return (
        <aside className="w-56 h-screen bg-white border-r border-gray-200 flex flex-col">
            <div className="px-4 py-6 overflow-y-auto flex-grow">
                <h2 className="text-xl font-light text-gray-900 mb-6 px-2">Admin Panel</h2>
                <ul className="space-y-1">
                    {navItems.map(({ to, label, icon, end }) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                end={end}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 transition-colors ${
                                        isActive
                                            ? "bg-gray-100 text-black border-l-4 border-black"
                                            : "text-gray-600 hover:bg-gray-50"
                                    }`
                                }
                            >
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center gap-3"
                                >
                                    {icon}
                                    <span className="text-sm">{label}</span>
                                </motion.div>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Back to Home Button */}
            <div className="p-4 border-t border-gray-200">
                <NavLink
                    to="/"
                    className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-3"
                    >
                        <FaHome className="w-4 h-4" />
                        <span className="text-sm">Back to Home</span>
                    </motion.div>
                </NavLink>
            </div>
        </aside>
    );
}