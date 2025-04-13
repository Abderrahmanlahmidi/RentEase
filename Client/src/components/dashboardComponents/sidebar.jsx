import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaTachometerAlt,
    FaUsers,
    FaUserShield,
    FaTags,
    FaBuilding,
    FaBlog,
    FaHome,
    FaList
} from 'react-icons/fa';

export default function Sidebar() {
    const navItems = [
        {
            to: "/dashboard",
            label: "Dashboard",
            icon: <FaTachometerAlt className="w-5 h-5" />,
        },
        {
            to: "/dashboard/users",
            label: "Users",
            icon: <FaUsers className="w-5 h-5" />,
        },
        {
            to: "/dashboard/annonces",
            label: "Annonces",
            icon: <FaList className="w-4 h-4" />
        },
        {
            to: "/dashboard/roles",
            label: "Roles",
            icon: <FaUserShield className="w-5 h-5" />,
        },
        {
            to: "/dashboard/categories",
            label: "Categories",
            icon: <FaTags className="w-5 h-5" />,
        },
        {
            to: "/dashboard/salles",
            label: "Salles",
            icon: <FaBuilding className="w-5 h-5" />,
        },
        {
            to: "/dashboard/tags",
            label: "Tags",
            icon: <FaTags className="w-5 h-5" />,
        },
        {
            to: "/dashboard/blogs",
            label: "Blog",
            icon: <FaBlog className="w-5 h-5" />,
        }

    ];

    return (
        <aside className="w-64 h-screen bg-white border-r border-gray-200 shadow-md dark:bg-gray-900 dark:border-gray-700 flex flex-col">
            <div className="px-4 py-6 overflow-y-auto flex-grow">
                <h2 className="text-xl font-bold text-gray-800 mb-6 px-2 dark:text-white">Admin Panel</h2>
                <ul className="space-y-1">
                    {navItems.map(({to, label, icon}) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                className={({isActive}) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                                        isActive
                                            ? "bg-blue-50 text-blue-700 dark:bg-blue-600 dark:text-white"
                                            : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                                    }`
                                }
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-3"
                                >
                                    {icon}
                                    <span>{label}</span>
                                </motion.div>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Back to Home Button */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <NavLink
                    to="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3"
                    >
                        <FaHome className="w-5 h-5" />
                        <span>Back to Home</span>
                    </motion.div>
                </NavLink>
            </div>
        </aside>
    );
}
