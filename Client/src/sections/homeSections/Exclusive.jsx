import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaHome, FaPaintRoller } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Exclusive() {
    const [showPopup, setShowPopup] = useState(false);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setShowPopup(true);
    //     }, 6000)
    // }, []);

    const navigate = useNavigate();

    return (
        <AnimatePresence>
            {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative bg-white rounded-none shadow-xl max-w-md w-full border border-gray-900"
                    >
                        <button
                            onClick={() => setShowPopup(false)}
                            className="absolute top-3 right-3 text-gray-900 hover:text-gray-700"
                        >
                            <FaTimes />
                        </button>

                        <div className="p-6">
                            <div className="bg-gray-200 text-gray-900 inline-flex items-center px-3 py-1 rounded-none mb-4 border border-gray-900">
                                <span className="font-medium">Limited Offer</span>
                            </div>

                            <h3 className="text-xl font-bold mb-2 text-gray-900">Free Home Upgrade!</h3>
                            <p className="text-gray-700 mb-4">
                                Buy any property and get $25,000 in renovations included.
                            </p>

                            <div className="flex items-center justify-center gap-6 my-6">
                                <div className="text-center">
                                    <div className="bg-gray-200 w-12 h-12 rounded-none flex items-center justify-center mx-auto mb-2 border border-gray-900">
                                        <FaHome className="text-gray-900" />
                                    </div>
                                    <span className="text-sm text-gray-900">Buy Home</span>
                                </div>
                                <span className="text-2xl font-bold text-gray-900">+</span>
                                <div className="text-center">
                                    <div className="bg-gray-200 w-12 h-12 rounded-none flex items-center justify-center mx-auto mb-2 border border-gray-900">
                                        <FaPaintRoller className="text-gray-900" />
                                    </div>
                                    <span className="text-sm text-gray-900">Get Renovation</span>
                                </div>
                            </div>

                            <button 
                                onClick={() => navigate("/properties")} 
                                className="w-full py-3 bg-black hover:bg-gray-800 text-white rounded-none font-medium border border-gray-900"
                            >
                                View Properties
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}