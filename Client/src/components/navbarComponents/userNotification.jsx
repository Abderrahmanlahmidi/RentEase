import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            {/* Notification Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
            >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 0 0-6 6v3.586L3.293 13.293a1 1 0 0 0-.293.707V15a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a1 1 0 0 0-.293-.707L16 11.586V8a6 6 0 0 0-6-6zM8 17a2 2 0 1 0 4 0H8z"/>
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
          3
        </span>
            </button>

            {/* Animated Notification Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="absolute right-0 mt-3 z-20 w-64 bg-white rounded-xl shadow-xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700"
                        role="menu"
                        aria-orientation="vertical"
                    >
                        {/* Notifications Header */}
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                                Notifications
                            </p>
                        </div>

                        {/* Notifications List */}
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                            <li>
                                <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white transition-colors">
                                    🔔 New message received
                                </div>
                            </li>
                            <li>
                                <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white transition-colors">
                                    📢 System update available
                                </div>
                            </li>
                            <li>
                                <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white transition-colors">
                                    🎉 Your profile was viewed
                                </div>
                            </li>
                        </ul>

                        {/* Close Button */}
                        <div className="border-t border-gray-100 dark:border-gray-700 py-2">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-600 dark:text-white dark:hover:text-white transition-colors"
                                role="menuitem"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
