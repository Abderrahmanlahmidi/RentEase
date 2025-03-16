import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside className="w-64 h-screen bg-white border-r border-gray-200 shadow-md dark:bg-gray-900 dark:border-gray-700">
            <div className="h-full px-4 py-6 overflow-y-auto">
                <h2 className="text-xl font-bold text-gray-800 mb-6 px-2 dark:text-white">Admin Panel</h2>
                <ul className="space-y-2 font-medium">
                    <li>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200
                 ${isActive ? "bg-blue-100 text-blue-700 dark:bg-blue-600 dark:text-white" : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"}`
                            }
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 22 21">
                                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                            </svg>
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/users"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200
                 ${isActive ? "bg-blue-100 text-blue-700 dark:bg-blue-600 dark:text-white" : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"}`
                            }
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                            </svg>
                            <span>Users</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
