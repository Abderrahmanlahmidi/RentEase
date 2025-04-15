import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaTrash, FaEye, FaEdit } from 'react-icons/fa';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../utils/toastUtils.jsx";
import { ToastContainer } from "react-toastify";
import axios from "axios";

const CardUserAnnonces = ({ annonceData, onDelete }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const nextImage = () => {
        setDirection(1);
        setCurrentImageIndex((prevIndex) =>
            prevIndex === annonceData.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const navigate = useNavigate();

    const prevImage = () => {
        setDirection(-1);
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? annonceData.images.length - 1 : prevIndex - 1
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

    // Format price with commas
    const formattedPrice = parseFloat(annonceData.prix).toLocaleString('en-US', {
        style: 'decimal',
        maximumFractionDigits: 2
    });

    // Format date
    const formattedDate = new Date(annonceData.created_at).toLocaleDateString();

    const deleteAnnonce = async (id) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/annonce/${id}`);
            console.log(response);
            showToast("success", "Category deleted successfully");
            onDelete(id);
        } catch {
            showToast("error", "Failed to delete Annonce");
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 w-full max-w-sm">
            <ToastContainer />
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
                        src={annonceData.images[currentImageIndex]?.url}
                        alt={annonceData.description}
                        className="w-full h-full object-cover absolute inset-0"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                    />
                </AnimatePresence>

                {/* Image Indicators */}
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                    {annonceData.images.map((_, index) => (
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
                        {annonceData.titre}
                    </h2>
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                        ${formattedPrice}
                    </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-sm">
                    {annonceData.description}
                </p>

                <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FaMapMarkerAlt className="w-3 h-3 mr-2 text-gray-400" />
                        <span>{annonceData.quartier.nom}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span>Posted: {formattedDate}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700 gap-2">
                    <button onClick={() => deleteAnnonce(annonceData.id)} className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-full transition-colors flex-1 min-w-0">
                        <FaTrash className="w-3 h-3" />
                        <span className="truncate">Remove</span>
                    </button>

                    <button className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 rounded-full transition-colors flex-1 min-w-0">
                        <FaEdit className="w-3 h-3" />
                        <span className="truncate">Modify</span>
                    </button>

                    <button onClick={() => navigate(`/properties/annonce/${annonceData.id}`)} className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors flex-1 min-w-0">
                        <FaEye className="w-3 h-3" />
                        <span className="truncate">Details</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardUserAnnonces;
