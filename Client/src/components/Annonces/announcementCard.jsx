import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { useState } from "react";
import { useNavigate } from "react-router";

const AnnouncementCard = ({ announcement }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const images = announcement.images.map((item) => item.url);


    const nextImage = () => {
        setDirection(1);
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setDirection(-1);
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0
        })
    };

    const navigate = useNavigate();

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
            {/* Image Gallery Section */}
            <div className="relative h-56 w-full overflow-hidden">
                {/* Navigation Arrows */}
                <div className="absolute inset-0 flex items-center justify-between z-10 px-2">
                    <button
                        onClick={prevImage}
                        className="p-2 bg-black bg-opacity-30 text-white rounded-full hover:bg-opacity-50 transition-all backdrop-blur-sm"
                        aria-label="Previous image"
                    >
                        <FaChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={nextImage}
                        className="p-2 bg-black bg-opacity-30 text-white rounded-full hover:bg-opacity-50 transition-all backdrop-blur-sm"
                        aria-label="Next image"
                    >
                        <FaChevronRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Animated Images */}
                <AnimatePresence custom={direction} initial={false}>
                    <motion.img
                        key={currentImageIndex}
                        src={images[currentImageIndex]}
                        alt={announcement.titre}
                        className="w-full h-full object-cover absolute inset-0"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = Math.abs(offset.x) * velocity.x;
                            if (swipe < -10000) {
                                nextImage();
                            } else if (swipe > 10000) {
                                prevImage();
                            }
                        }}
                    />
                </AnimatePresence>

                {/* Image Indicators */}
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? 'bg-white w-4' : 'bg-white bg-opacity-50'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white line-clamp-1">
                        {announcement.titre}
                    </h2>
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                        ${announcement.prix.toLocaleString()}
                    </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-sm">
                    {announcement.description}
                </p>

                <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FaMapMarkerAlt className="w-3 h-3 mr-2 text-gray-400" />
                        <span>{announcement.quartier.nom}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FaCalendarAlt className="w-3 h-3 mr-2 text-gray-400" />
                        <span>Posted: {new Date(announcement.created_at).toLocaleDateString()}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium rounded-full">
                        {announcement.category.nom}
                    </span>

                    <button
                        onClick={() => navigate(`/properties/annonce/${announcement.id}`)}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementCard;