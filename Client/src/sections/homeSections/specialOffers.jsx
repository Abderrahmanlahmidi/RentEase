import { useContext } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaHome, FaStar } from "react-icons/fa";
import { informationContext } from "../../App.jsx";
import { UserContext } from "../../context/userContext.jsx";
import { useNavigate } from "react-router-dom";

export default function SpecialOffers() {

    const { t } = useContext(informationContext);
    const { announcements } = useContext(UserContext);
    const navigate = useNavigate();

    const specialDeals = announcements.filter(annonce => annonce.prix <= 50000);

    return (
        <section className="py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">{t('specialOffers.title')}</h2>
                    <p className="text-lg text-gray-600">Discover limited-time deals on beautiful homes</p>
                </motion.div>

                {specialDeals.length > 0 ? (
                    <div className="relative">
                        {/* Gradient fade effect for scroll indication */}
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-blue-50 to-transparent z-10 pointer-events-none" />
                        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-blue-50 to-transparent z-10 pointer-events-none" />

                        <div className="overflow-hidden px-2 sm:px-4">
                            <div className="flex gap-6 pb-8 pl-4 pr-4 overflow-x-auto scroll-smooth snap-x snap-mandatory">
                                {specialDeals.map((deal, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex-shrink-0 w-[320px] snap-start"
                                    >
                                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col">
                                            <div className="relative h-56 overflow-hidden">
                                                <img
                                                    src={deal.images[0]?.url || "https://via.placeholder.com/400"}
                                                    alt={deal.titre}
                                                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                                                />
                                                <div className="absolute top-4 left-4 bg-yellow-400 px-3 py-1 rounded-full flex items-center shadow-md">
                                                    <FaStar className="text-yellow-700 mr-1" />
                                                    <span className="text-sm font-semibold text-gray-800">Special Deal</span>
                                                </div>
                                            </div>
                                            <div className="p-6 flex flex-col flex-grow">
                                                <div className="mb-4">
                                                    <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">{deal.titre}</h3>
                                                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">{deal.description}</p>
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <FaMapMarkerAlt className="text-blue-500 mr-1" />
                                                        <span>{deal.quartier.nom}</span>
                                                    </div>
                                                </div>

                                                <div className="mt-auto pt-4 border-t border-gray-100">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <span className="text-xl font-bold text-blue-600">
                                                                ${parseFloat(deal.prix).toLocaleString()}
                                                            </span>
                                                            {deal.transaction === 'location' && (
                                                                <span className="ml-1 text-sm text-gray-500">/mo</span>
                                                            )}
                                                        </div>
                                                        <button
                                                            onClick={() => navigate(`/properties/annonce/${deal.id}`)}
                                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 flex items-center justify-center"
                                                        >
                                                            <span>View Details</span>
                                                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center mt-12 bg-white rounded-xl p-10 shadow-md max-w-2xl mx-auto">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
                            <FaHome className="text-3xl text-blue-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">No Special Offers Available</h3>
                        <p className="text-gray-500 mb-6">We're currently updating our special offers. Please check back later or browse our regular listings.</p>
                        <button
                            onClick={() => navigate('/properties')}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 inline-flex items-center"
                        >
                            <span>Browse All Properties</span>
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            <style jsx>{`
                /* Hide scrollbar but keep functionality */
                .overflow-x-auto::-webkit-scrollbar {
                    display: none;
                }
                .overflow-x-auto {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}