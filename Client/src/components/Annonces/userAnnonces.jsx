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
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0
        })
    };

    const formattedPrice = parseFloat(annonceData.prix).toLocaleString('en-US', {
        style: 'decimal',
        maximumFractionDigits: 2
    });

    const formattedDate = new Date(annonceData.created_at).toLocaleDateString();

    const deleteAnnonce = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/annonce/${id}`);
            showToast("success", "Annonce deleted successfully");

            onDelete(id);
        } catch {
            showToast("error", "Failed to delete Annonce");
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-none overflow-hidden hover:shadow-sm transition-all duration-300 w-full">
            <ToastContainer />
            

            <div className="relative h-56 w-full overflow-hidden bg-gray-100">

                <div className="absolute inset-0 flex items-center justify-between z-10 px-2">
                    <button
                        onClick={prevImage}
                        className="p-2 bg-black bg-opacity-30 text-white rounded-none hover:bg-opacity-50 transition-all"
                        aria-label="Previous image"
                    >
                        <FaChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={nextImage}
                        className="p-2 bg-black bg-opacity-30 text-white rounded-none hover:bg-opacity-50 transition-all"
                        aria-label="Next image"
                    >
                        <FaChevronRight className="w-4 h-4" />
                    </button>
                </div>

                <AnimatePresence custom={direction} initial={false}>
                    <motion.img
                        key={currentImageIndex}
                        src={`http://localhost:8000/storage/${annonceData.images[currentImageIndex]?.url}`}
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


                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                    {annonceData.images.map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-none transition-all ${index === currentImageIndex ? 'bg-black w-4' : 'bg-gray-400'}`}
                        />
                    ))}
                </div>
            </div>

            <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-medium text-gray-900 line-clamp-1">
                        {annonceData.titre}
                    </h2>
                    <span className="text-lg font-medium text-gray-900 whitespace-nowrap">
                        ${formattedPrice}
                    </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                    {annonceData.description}
                </p>

                <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                        <FaMapMarkerAlt className="w-3 h-3 mr-2 text-gray-500" />
                        <span>{annonceData.quartier.nom}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                        Posted: {formattedDate}
                    </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-200 gap-2">
                    <button 
                        onClick={() => deleteAnnonce(annonceData.id)} 
                        className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 transition-colors flex-1 min-w-0"
                    >
                        <FaTrash className="w-3 h-3" />
                        <span className="truncate">Remove</span>
                    </button>

                    <button 
                        onClick={() => navigate(`/annonces/update/${annonceData.id}`)}
                        className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-900 border border-gray-300 hover:bg-gray-100 transition-colors flex-1 min-w-0"
                    >
                        <FaEdit className="w-3 h-3" />
                        <span className="truncate">Modify</span>
                    </button>

                    <button 
                        onClick={() => navigate(`/properties/annonce/${annonceData.id}`)} 
                        className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-900 border border-gray-300 hover:bg-gray-100 transition-colors flex-1 min-w-0"
                    >
                        <FaEye className="w-3 h-3" />
                        <span className="truncate">Details</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardUserAnnonces;