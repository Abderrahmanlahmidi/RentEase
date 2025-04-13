import { motion } from "framer-motion";
import { FiExternalLink, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRef, useState } from "react";
import {useNavigate} from "react-router-dom";


export default function Advertisement() {

    const navigate = useNavigate();

    const ads = [
        {
            id: 1,
            title: "Mortgage Solutions",
            description: "Low-interest rates for first-time buyers",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            link: "https://www.bankrate.com/mortgages/",
            sponsor: "TrustBank Financial",
            category: "financial",
            promoCode: "RENTEASE10"
        },
        {
            id: 2,
            title: "Home Insurance",
            description: "Get 20% off your first year of premium coverage",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            link: "https://www.safeshieldinsure.co.uk/",
            sponsor: "SafeShield Insurance"
        },
        {
            id: 3,
            title: "Moving Services",
            description: "Professional movers at competitive prices",
            image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            link: "https://quickmove.ubiant.com/store/",
            sponsor: "QuickMove Solutions"
        },
        {
            id: 4,
            title: "Interior Design",
            description: "Transform your space with our expert designers",
            image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            link: "https://www.designhub.co.ke/about.html",
            sponsor: "DesignHub Studio"
        },
        {
            id: 5,
            title: "Home Security",
            description: "Smart security systems for your property",
            image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            link: "https://www.homesecurity.com",
            sponsor: "SafeHome Systems"
        },
        {
            id: 6,
            title: "Furniture Rental",
            description: "Premium furniture for your new home",
            image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            link: "https://www.furniture-rental.com",
            sponsor: "Comfort Living"
        }
    ];

    const scrollRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const scroll = (direction) => {
        const container = scrollRef.current;
        const scrollAmount = direction === 'left' ? -400 : 400;
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });

        // Update arrow visibility after scroll
        setTimeout(() => {
            setShowLeftArrow(container.scrollLeft > 0);
            setShowRightArrow(
                container.scrollLeft < container.scrollWidth - container.clientWidth
            );
        }, 300);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Featured Advertisements</h1>
                    <p className="text-lg text-gray-600">Discover services and offers from our trusted partners</p>
                </motion.div>

                {/* Scrolling Advertisement Cards */}
                <div className="relative">
                    {/* Navigation Arrows */}
                    {showLeftArrow && (
                        <button
                            onClick={() => scroll('left')}
                            className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                            aria-label="Scroll left"
                        >
                            <FiChevronLeft className="w-5 h-5 text-gray-700" />
                        </button>
                    )}
                    {showRightArrow && (
                        <button
                            onClick={() => scroll('right')}
                            className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                            aria-label="Scroll right"
                        >
                            <FiChevronRight className="w-5 h-5 text-gray-700" />
                        </button>
                    )}

                    {/* Cards Container */}
                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto pb-6 -mx-4 px-4"
                        style={{
                            scrollbarWidth: 'none', /* Firefox */
                            msOverflowStyle: 'none', /* IE/Edge */
                            '&::-webkit-scrollbar': { /* Chrome/Safari */
                                display: 'none',
                                width: 0,
                                height: 0,
                                background: 'transparent'
                            }
                        }}
                        onScroll={(e) => {
                            const container = e.target;
                            setShowLeftArrow(container.scrollLeft > 0);
                            setShowRightArrow(
                                container.scrollLeft < container.scrollWidth - container.clientWidth
                            );
                        }}
                    >
                        <div className="flex space-x-6">
                            {ads.map((ad, index) => (
                                <motion.div
                                    key={ad.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="flex-shrink-0 w-80 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={ad.image}
                                            alt={ad.title}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                            <span className="text-xs text-white/80">Sponsored by {ad.sponsor}</span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{ad.title}</h3>
                                        <p className="text-gray-600 mb-4">{ad.description}</p>
                                        <a
                                            href={ad.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            Learn more <FiExternalLink className="ml-1" />
                                        </a>
                                        {ad.promoCode && (
                                            <div className="mt-3 text-sm text-gray-500">
                                                Use code: <span className="font-bold">{ad.promoCode}</span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 bg-white rounded-xl shadow-sm p-6 text-center"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Want to advertise with us?</h2>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        Reach thousands of potential customers by showcasing your products and services on our platform.
                    </p>
                    <button onClick={() => navigate("/contact")} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                        Contact Our Ad Team
                    </button>
                </motion.div>
            </div>
        </div>
    );
}