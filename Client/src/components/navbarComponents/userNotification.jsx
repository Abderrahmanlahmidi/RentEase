import { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaBell,
    FaRegCalendarAlt,
    FaRegBell,
    FaTimes,
    FaRegClock,
    FaTrash
} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/userContext.jsx";

export default function NotificationButton() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useContext(UserContext);

    const fetchNotifications = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/notifications");
            const userNotifications = response.data.filter(item => item.user_id === user.id);
            setNotifications(userNotifications);
        } catch (err) {
            console.error("Error fetching notifications:", err);
            setError("Failed to load notifications");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user?.id) {
            fetchNotifications();
        }
    }, [user?.id]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = async (id) => {
        try {
            await axios.patch(`http://127.0.0.1:8000/api/notification/${id}/read`);
            setNotifications(notifications.map(n =>
                n.id === id ? { ...n, read: true } : n
            ));
        } catch (err) {
            console.error("Error marking notification as read:", err);
        }
    };

    const markAllAsRead = async () => {
        try {
            await axios.patch(`http://127.0.0.1:8000/api/notifications/mark-all-read`, {
                user_id: user.id
            });
            setNotifications(notifications.map(n => ({ ...n, read: true })));
        } catch (err) {
            console.error("Error marking all as read:", err);
        }
    };

    const removeNotification = async (id, e) => {
        e.stopPropagation();
        try {
            await axios.delete(`http://127.0.0.1:8000/api/notification/delete/${id}`);
            setNotifications(notifications.filter(n => n.id !== id));
        } catch (err) {
            console.error("Error deleting notification:", err);
        }
    };

    const handleNotificationClick = async (notification) => {
        await markAsRead(notification.id);

        if (notification.type === 'visit') {
            navigate(`/annonces/${notification.annonceId}`);
        }

        setIsOpen(false);
    };

    return (
        <div className="relative">
            {/* Notification Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none"
                aria-label="Notifications"
            >
                {unreadCount > 0 ? (
                    <FaBell className="w-5 h-5 text-gray-800" />
                ) : (
                    <FaRegBell className="w-5 h-5 text-gray-600" />
                )}
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-medium rounded-none w-5 h-5 flex items-center justify-center">
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
                        className="absolute right-0 mt-2 z-20 w-80 bg-white border border-gray-200 shadow-sm"
                        role="menu"
                        aria-orientation="vertical"
                    >
                        {/* Notifications Header */}
                        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
                            <h3 className="text-sm font-medium text-gray-900">
                                Notifications
                            </h3>
                            <div className="flex items-center space-x-2">
                                {notifications.length > 0 && (
                                    <button
                                        onClick={markAllAsRead}
                                        className="text-xs text-gray-600 hover:text-black"
                                        disabled={isLoading}
                                    >
                                        Mark all as read
                                    </button>
                                )}
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-600 hover:text-black"
                                    aria-label="Close notifications"
                                >
                                    <FaTimes className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Notifications List */}
                        <div className="max-h-96 overflow-y-auto">
                            {isLoading ? (
                                <div className="px-4 py-6 text-center">
                                    <p className="text-sm text-gray-600">Loading...</p>
                                </div>
                            ) : error ? (
                                <div className="px-4 py-6 text-center">
                                    <p className="text-sm text-gray-600">{error}</p>
                                    <button
                                        onClick={fetchNotifications}
                                        className="mt-2 text-xs text-gray-600 hover:text-black"
                                    >
                                        Retry
                                    </button>
                                </div>
                            ) : notifications.length > 0 ? (
                                <ul className="divide-y divide-gray-200">
                                    {notifications.map((notification) => (
                                        <motion.li
                                            key={notification.id}
                                            initial={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div
                                                className={`flex px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer ${
                                                    !notification.read ? 'bg-gray-100' : ''
                                                }`}
                                                onClick={() => handleNotificationClick(notification)}
                                            >
                                                <div className="flex-shrink-0 mt-1 mr-3 text-lg text-gray-600">
                                                    <FaRegCalendarAlt />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {notification.title}
                                                    </p>
                                                    <p className="text-xs text-gray-600 truncate">
                                                        {notification.contenu}
                                                    </p>
                                                    <div className="flex items-center mt-1 text-xs text-gray-500">
                                                        <FaRegClock className="mr-1" />
                                                        <span>
                                                            {new Date(notification.dateEnvoi).toLocaleString([], {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    {!notification.read && (
                                                        <div className="flex-shrink-0">
                                                            <span className="w-2 h-2 rounded-none bg-black"></span>
                                                        </div>
                                                    )}
                                                    <button
                                                        onClick={(e) => removeNotification(notification.id, e)}
                                                        className="text-gray-600 hover:text-black transition-colors p-1"
                                                        aria-label="Remove notification"
                                                        disabled={isLoading}
                                                    >
                                                        <FaTrash className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="px-4 py-6 text-center">
                                    <p className="text-sm text-gray-600">
                                        No notifications available
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {notifications.length > 0 && !isLoading && !error && (
                            <div className="px-4 py-2 border-t border-gray-200 text-center">
                                <button
                                    className="text-xs font-medium text-gray-600 hover:text-black"
                                    onClick={() => {
                                        navigate('/visits');
                                        setIsOpen(false);
                                    }}
                                >
                                    View all visits
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}