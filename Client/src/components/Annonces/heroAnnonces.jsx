import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroAnnonces() {
    const navigate = useNavigate();

    return (
        <div className="bg-white border-b border-gray-200 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center text-gray-600 hover:text-black transition-colors mb-8"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Home
                    </button>
                </motion.div>

                {/* Title Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-4">
                        Announcements
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Manage your announcements or create new ones to reach thousands of potential customers.
                    </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
                >
                    <button
                        onClick={() => navigate('/Annonces/createAnnonce')}
                        className="px-6 py-3 bg-black text-white font-medium rounded-none hover:bg-gray-800 transition-colors flex items-center justify-center"
                    >
                        Create Announcement
                    </button>
                    <button
                        onClick={() => navigate('/Annonces')}
                        className="px-6 py-3 border border-black text-black font-medium rounded-none hover:bg-gray-100 transition-colors flex items-center justify-center"
                    >
                        View My Announcements
                    </button>
                </motion.div>
            </div>
        </div>
    );
}