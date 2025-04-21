import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AnnouncementCard = ({ announcement }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const navigate = useNavigate();

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

    return (
        <div className="bg-white border border-gray-200 hover:shadow-sm transition-all duration-300">
            {/* Image Gallery Section */}
            <div className="relative h-56 w-full overflow-hidden">
                {/* Navigation Arrows */}
                <div className="absolute inset-0 flex items-center justify-between z-10 px-2">
                    <button
                        onClick={prevImage}
                        className="p-2 bg-black/30 text-white rounded-none hover:bg-black/40 transition-all"
                        aria-label="Previous image"
                    >
                        <FaChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={nextImage}
                        className="p-2 bg-black/30 text-white rounded-none hover:bg-black/40 transition-all"
                        aria-label="Next image"
                    >
                        <FaChevronRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Animated Images */}
                <AnimatePresence custom={direction} initial={false}>
                    <motion.img
                        key={currentImageIndex}
                        src={`http://localhost:8000/storage/${images[currentImageIndex]}`}
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
                            className={`w-2 h-2 rounded-none transition-all ${index === currentImageIndex ? 'bg-black w-4' : 'bg-gray-400'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-light text-gray-900 line-clamp-1">
                        {announcement.titre}
                    </h2>
                    <span className="text-lg font-light text-gray-900 whitespace-nowrap">
                        ${announcement.prix.toLocaleString()}
                    </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                    {announcement.description}
                </p>

                <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                        <FaMapMarkerAlt className="w-3 h-3 mr-2" />
                        <span>{announcement.quartier.nom}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                        <FaCalendarAlt className="w-3 h-3 mr-2" />
                        <span>Posted: {new Date(announcement.created_at).toLocaleDateString()}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium">
                        {announcement.category.nom}
                    </span>

                    <button
                        onClick={() => navigate(`/properties/annonce/${announcement.id}`)}
                        className="px-4 py-2 text-sm font-medium bg-black text-white hover:bg-gray-800 transition-colors"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementCard;