import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function HeroAnnonces() {
    const navigate = useNavigate();

    return (
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-16 px-6 sm:px-8 lg:px-10">
            <div className="max-w-4xl mx-auto text-center">
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Home
                    </button>
                </div>

                <h1 className="text-4xl font-extrabold tracking-wide text-gray-900 dark:text-white">
                    Announcements
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Manage your announcements or create new ones to reach thousands of potential customers.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                    <button
                        onClick={() => navigate('/Annonces/createAnnonce')}
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-sm  dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition-all  dark:border-gray-200"
                    >
                        Create Announcement
                    </button>
                    <button
                        onClick={() => navigate('/Annonces')}
                        className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-medium rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                    >
                        View My Announcements
                    </button>
                </div>
            </div>
        </div>
    );
}