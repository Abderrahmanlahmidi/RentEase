import { useState, useContext } from "react";
import {UserContext} from "../../context/userContext.jsx";
import {NavLink} from "react-router";



function UserDropdown({logoutHandler}) {
    const {user} = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="relative inline-block text-left">
            {/* Avatar Button */}
            <img
                id="avatarButton"
                onClick={toggleDropdown}
                className="w-12 h-8 rounded-full cursor-pointer"
                src={user?.profile_image}
                alt="User dropdown"
            />

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    id="userDropdown"
                    className="absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600"
                >
                    {/* User Info */}
                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <div>{user?.firstName} {user?.lastName}</div>
                    </div>
                    {/* Menu Links */}
                    {user.role.name === "Admin" && (
                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">

                          <NavLink to="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                              Dashboard
                          </NavLink>
                      </ul>
                    )}
                    {/* Logout */}
                    <div className="py-1">
                        <NavLink to="/Profile"
                            className="block  cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                            Profile
                        </NavLink>
                    </div>
                    {/* Logout */}
                    <div className="py-1">
                        <button
                            onClick={logoutHandler}
                            className="block  cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserDropdown;
