import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function HeroAnnonces() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(null);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === 'create') {
            navigate('/Annonces/createAnnonce');
        } else {
            navigate('/Annonces');
        }
    };

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

                {/* Title */}
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

                {/* Tab Selector with original style */}
                <div className="flex justify-center mb-8">
                    <div className="relative bg-gray-100 p-1  inline-flex">
                        <motion.div 
                            layout
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className={`absolute top-1 bottom-1 left-1 bg-white shadow-sm  transition-all duration-300 ${activeTab === 'view' ? 'translate-x-0' : activeTab === 'create' ? 'translate-x-full' : 'translate-x-0'}`}
                            style={{ width: 'calc(50% - 0.25rem)' }}
                        />
                        <button
                            onClick={() => handleTabClick('view')}
                            className={`relative px-6 py-2 text-sm font-medium  z-10 transition-colors ${activeTab === 'view' ? 'text-black' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            View
                        </button>
                        <button
                            onClick={() => handleTabClick('create')}
                            className={`relative px-6 py-2 text-sm font-medium  z-10 transition-colors ${activeTab === 'create' ? 'text-black' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Create
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
