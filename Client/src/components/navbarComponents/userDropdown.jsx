import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext.jsx";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaUserCog,
    FaUser,
    FaSignOutAlt,
    FaListAlt,
    FaStar,
    FaCalendarAlt
} from 'react-icons/fa';

function UserDropdown({ logoutHandler }) {
    const { user } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    return (
        <div className="relative inline-block text-left">

            <button
                onClick={toggleDropdown}
                className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 hover:border-black transition-colors focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <img
                    src={`http://localhost:8000/storage/${user?.profile_image}`}
                    alt="User avatar" 
                    className="w-full h-full object-cover"
                />
            </button>


            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="absolute right-0 mt-2 z-20 w-56 bg-white border border-gray-200 shadow-sm"
                        role="menu"
                        aria-orientation="vertical"
                    >

                        <div className="px-4 py-3 border-b border-gray-200">
                            <p className="text-sm font-medium text-gray-900">
                                {user?.firstName} {user?.lastName}
                            </p>
                            <p className="text-xs text-gray-600 truncate">
                                {user?.email}
                            </p>
                        </div>

                        <ul className="py-1 text-sm text-gray-700">
                            {user?.role?.name === "Admin" && (
                                <li>
                                    <NavLink
                                        to="/dashboard"
                                        className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors"
                                        role="menuitem"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <FaUserCog className="mr-3 text-gray-600" />
                                        Dashboard
                                    </NavLink>
                                </li>
                            )}
                            <li>
                                <NavLink
                                    to="/profile"
                                    className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors"
                                    role="menuitem"
                                    onClick={() => setIsOpen(false)}
                                    >
                                    <FaUser className="mr-3 text-gray-600" />
                                    Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/Annonces"
                                    className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors"
                                    role="menuitem"
                                    onClick={() => setIsOpen(false)}
                                    >
                                    <FaListAlt className="mr-3 text-gray-600" />
                                    My Listings
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/visits"
                                    className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors"
                                    role="menuitem"
                                    onClick={() => setIsOpen(false)}
                                    >
                                    <FaCalendarAlt className="mr-3 text-gray-600" />
                                    My Visits
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/reviews"
                                    className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors"
                                    role="menuitem"
                                    onClick={() => setIsOpen(false)}
                                    >
                                    <FaStar className="mr-3 text-gray-600" />
                                    My Reviews
                                </NavLink>
                            </li>
                        </ul>

                        <div className="border-t border-gray-200 py-1">
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    logoutHandler();
                                }}
                                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                role="menuitem"
                            >
                                <FaSignOutAlt className="mr-3 text-gray-600" />
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