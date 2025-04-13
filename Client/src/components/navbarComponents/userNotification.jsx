import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaBell,
    FaRegBell,
    FaTimes,
    FaRegCommentAlt,
    FaRegEnvelope,
    FaRegStar,
    FaRegCheckCircle,
    FaRegClock
} from 'react-icons/fa';

export default function NotificationButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(3);

    const notifications = [
        {
            id: 1,
            icon: <FaRegCommentAlt className="text-blue-500" />,
            title: "New message received",
            description: "You have a new message from John",
            time: "2 min ago",
            read: false
        },
        {
            id: 2,
            icon: <FaRegEnvelope className="text-green-500" />,
            title: "System update available",
            description: "New version v2.5 is ready to install",
            time: "1 hour ago",
            read: false
        },
        {
            id: 3,
            icon: <FaRegStar className="text-yellow-500" />,
            title: "Your profile was viewed",
            description: "Your profile got 15 views today",
            time: "3 hours ago",
            read: true
        },
        {
            id: 4,
            icon: <FaRegCheckCircle className="text-purple-500" />,
            title: "Payment received",
            description: "Your payment of $250 has been processed",
            time: "1 day ago",
            read: true
        }
    ];

    const markAsRead = (id) => {
        setUnreadCount(prev => notifications.filter(n => !n.read && n.id !== id).length);
    };

    const markAllAsRead = () => {
        setUnreadCount(0);
    };

    return (
        <div className="relative">
            {/* Notification Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Notifications"
            >
                {unreadCount > 0 ? (
                    <FaBell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                ) : (
                    <FaRegBell className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                )}
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount}
                    </span>
                )}
            </button>

            {/* Animated Notification Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeInOut" }}
                        className="absolute right-0 mt-2 z-20 w-80 bg-white rounded-lg shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                        role="menu"
                        aria-orientation="vertical"
                    >
                        {/* Notifications Header */}
                        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                                Notifications
                            </h3>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={markAllAsRead}
                                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    Mark all as read
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                    aria-label="Close notifications"
                                >
                                    <FaTimes className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Notifications List */}
                        <div className="max-h-96 overflow-y-auto">
                            {notifications.length > 0 ? (
                                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {notifications.map((notification) => (
                                        <li key={notification.id}>
                                            <div
                                                className={`flex px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer ${!notification.read ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''}`}
                                                onClick={() => markAsRead(notification.id)}
                                            >
                                                <div className="flex-shrink-0 mt-1 mr-3 text-lg">
                                                    {notification.icon}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                        {notification.title}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                        {notification.description}
                                                    </p>
                                                    <div className="flex items-center mt-1 text-xs text-gray-400 dark:text-gray-500">
                                                        <FaRegClock className="mr-1" />
                                                        <span>{notification.time}</span>
                                                    </div>
                                                </div>
                                                {!notification.read && (
                                                    <div className="flex-shrink-0 ml-2">
                                                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                                    </div>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="px-4 py-6 text-center">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        No new notifications
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-center">
                            <button
                                className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                                onClick={() => {
                                    // Handle view all notifications
                                    setIsOpen(false);
                                }}
                            >
                                View all notifications
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}