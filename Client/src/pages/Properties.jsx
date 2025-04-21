import { FiSearch, FiMapPin, FiHome, FiDollarSign } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import Navbar from "../sections/Navbar";
import AnnouncementCard from "../components/Annonces/announcementCard.jsx";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/userContext.jsx";
import { motion } from 'framer-motion';

function Properties() {
    const { announcements } = useContext(UserContext);
    const { register, handleSubmit } = useForm();
    const [filteredAnnouncements, setFilteredAnnouncements] = useState(announcements);

    const prices = [...new Set(announcements.map(annonce => annonce.prix))];
    const categories = [...new Set(announcements.map(annonce => annonce.category?.nom))];
    const locations = [...new Set(announcements.map(annonce => annonce.quartier?.nom))];

    useEffect(() => {
        setFilteredAnnouncements(announcements);
    }, [announcements]);

    const onSubmit = (data) => {
        let filtered = announcements;

        if (data.location) {
            filtered = filtered.filter(item => item.quartier?.nom === data.location);
        }

        if (data.propertyType) {
            filtered = filtered.filter(item => item.category?.nom === data.propertyType);
        }

        if (data.prix) {
            filtered = filtered.filter(item => item.prix == data.prix);
        }

        setFilteredAnnouncements(filtered);
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

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />

            {/* Search Form */}
            <section className="mt-[60px] px-4 sm:px-6 lg:px-8 py-8 border-b border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Main Filters */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Location */}
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiMapPin className="h-5 w-5 text-gray-500" />
                                </div>
                                <select
                                    {...register('location')}
                                    className="block w-full pl-10 pr-4 py-3 border border-gray-300 bg-white text-gray-900 focus:ring-1 focus:ring-black focus:border-black outline-none transition-all appearance-none"
                                >
                                    <option value="">Location</option>
                                    {locations.map((loc, index) => (
                                        <option key={index} value={loc}>{loc}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Property Type */}
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiHome className="h-5 w-5 text-gray-500" />
                                </div>
                                <select
                                    {...register('propertyType')}
                                    className="block w-full pl-10 pr-4 py-3 border border-gray-300 bg-white text-gray-900 focus:ring-1 focus:ring-black focus:border-black outline-none transition-all appearance-none"
                                >
                                    <option value="">All Types</option>
                                    {categories.map((cat, index) => (
                                        <option key={index} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Price Range */}
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiDollarSign className="h-5 w-5 text-gray-500" />
                                </div>
                                <select
                                    {...register('prix')}
                                    className="block w-full pl-10 pr-4 py-3 border border-gray-300 bg-white text-gray-900 focus:ring-1 focus:ring-black focus:border-black outline-none transition-all appearance-none"
                                >
                                    <option value="">All Prices</option>
                                    {prices.map((price, index) => (
                                        <option key={index} value={price}>{price}$</option>
                                    ))}
                                </select>
                            </div>

                            {/* Search Button */}
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-6 py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors flex items-center justify-center border border-black"
                            >
                                <FiSearch className="mr-2" />
                                Search
                            </motion.button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Properties Content */}
            <motion.div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1"
                variants={container}
                initial="hidden"
                animate="show"
            >
                <h1 className="text-3xl text-center font-light tracking-tight text-gray-900 mb-8">
                    Featured Properties
                </h1>
                {filteredAnnouncements.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAnnouncements.map((item) => (
                            <motion.div key={item.id} variants={item}>
                                <AnnouncementCard announcement={item} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center flex flex-col items-center justify-center py-12 bg-gray-50 border border-gray-200">
                        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <FiHome className="text-gray-400 text-3xl" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2 px-4">
                            No properties found
                        </h3>
                        <p className="text-gray-600 max-w-md mx-auto px-4">
                            Try adjusting your search filters to find more properties.
                        </p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}

export default Properties;