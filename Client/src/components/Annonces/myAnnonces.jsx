import { useContext } from "react";
import { UserContext } from "../../context/userContext.jsx";
import CardUserAnnonces from "./userAnnonces.jsx";
import { motion } from "framer-motion";

export default function MyAnnonces() {
    const { announcements, user, setAnnouncements } = useContext(UserContext);

    const userAnnouncements = announcements.filter(
        (announcement) => announcement.proprietaire.id === user.id
    );

    const handleDelete = (id) => {
        const updatedAnnouncements = announcements.filter(announcement => announcement.id !== id);
        setAnnouncements(updatedAnnouncements);
    };


    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Title Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-12"
            >
                <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-2">
                    My Announcements
                </h1>
                <p className="text-gray-600">
                    {userAnnouncements.length} {userAnnouncements.length === 1 ? 'listing' : 'listings'}
                </p>
            </motion.div>

            {/* Announcements Grid */}
            {userAnnouncements.length > 0 ? (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {userAnnouncements.map((announcement) => (
                        <motion.div
                            key={announcement.id}
                            variants={item}
                            transition={{ duration: 0.3 }}
                        >
                            <CardUserAnnonces
                                annonceData={announcement}
                                onDelete={handleDelete}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                >
                    <p className="text-gray-600 mb-6">You haven't created any announcements yet</p>
                </motion.div>
            )}
        </div>
    );
}