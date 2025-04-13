import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext.jsx";
import { NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaUserCog,
    FaUser,
    FaSignOutAlt,
    FaListAlt
} from 'react-icons/fa';

function UserDropdown({ logoutHandler }) {
    const { user } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    return (
        <div className="relative inline-block text-left">
            {/* Avatar Button */}
            <button
                id="avatarButton"
                onClick={toggleDropdown}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 hover:border-blue-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <img
                    src={user?.profile_image}
                    alt="User avatar"
                    className="w-full h-full object-cover"
                />
            </button>

            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id="userDropdown"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="absolute right-0 mt-2 z-20 w-56 bg-white rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                        role="menu"
                        aria-orientation="vertical"
                    >
                        {/* User Info */}
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                                {user?.firstName} {user?.lastName}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {user?.email}
                            </p>
                        </div>

                        {/* Links */}
                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                            {user?.role?.name === "Admin" && (
                                <li>
                                    <NavLink
                                        to="/dashboard"
                                        className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
                                        role="menuitem"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <FaUserCog className="mr-3 text-gray-500 dark:text-gray-400" />
                                        Dashboard
                                    </NavLink>
                                </li>
                            )}
                            <li>
                                <NavLink
                                    to="/profile"
                                    className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
                                    role="menuitem"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <FaUser className="mr-3 text-gray-500 dark:text-gray-400" />
                                    Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/Annonces"
                                    className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
                                    role="menuitem"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <FaListAlt className="mr-3 text-gray-500 dark:text-gray-400" />
                                    My Listings
                                </NavLink>
                            </li>
                        </ul>

                        {/* Sign Out */}
                        <div className="border-t border-gray-100 dark:border-gray-700 py-1">
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    logoutHandler();
                                }}
                                className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 dark:text-red-400 dark:hover:text-white transition-colors"
                                role="menuitem"
                            >
                                <FaSignOutAlt className="mr-3" />
                                Sign out
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default UserDropdown;