import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaHome, FaPaintRoller } from "react-icons/fa";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";

export default function Exclusive() {
    const [showPopup, setShowPopup] = useState(false);


    useEffect(() => {
        setTimeout(() => {
            setShowPopup(true);
        }, 6000)
    }, []);

    const navigate = useNavigate();

    return (
        <AnimatePresence>
            {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative bg-white rounded-lg shadow-xl max-w-md w-full"
                    >
                        <button
                            onClick={() => setShowPopup(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                            <FaTimes />
                        </button>

                        <div className="p-6">
                            <div className="bg-blue-100 text-blue-800 inline-flex items-center px-3 py-1 rounded-full mb-4">
                                <span className="font-medium">Limited Offer</span>
                            </div>

                            <h3 className="text-xl font-bold mb-2">Free Home Upgrade!</h3>
                            <p className="text-gray-600 mb-4">
                                Buy any property and get $25,000 in renovations included.
                            </p>

                            <div className="flex items-center justify-center gap-6 my-6">
                                <div className="text-center">
                                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <FaHome className="text-blue-600" />
                                    </div>
                                    <span className="text-sm">Buy Home</span>
                                </div>
                                <span className="text-2xl font-bold text-blue-500">+</span>
                                <div className="text-center">
                                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <FaPaintRoller className="text-blue-600" />
                                    </div>
                                    <span className="text-sm">Get Renovation</span>
                                </div>
                            </div>

                            <button onClick={() => navigate("/properties")} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
                                View Properties
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}