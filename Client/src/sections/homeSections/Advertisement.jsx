import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

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

    return (
        <section className="py-14 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-light tracking-tight text-gray-900 mb-2">
                        Featured Partners
                    </h2>
                    <p className="text-lg text-gray-600">
                        Discover services and offers from our trusted partners
                    </p>
                </motion.div>

                {ads.length > 0 ? (
                    <div className="relative">
 
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l z-10 pointer-events-none" />
                        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r z-10 pointer-events-none" />

                        <div className="overflow-hidden px-2 sm:px-4">
                            <div className="flex gap-6 pb-8 pl-4 pr-4 overflow-x-auto scroll-smooth snap-x snap-mandatory">
                                {ads.map((ad, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex-shrink-0 w-[320px] snap-start"
                                    >
                                        <div className="bg-white border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-sm h-full flex flex-col">
                                            <div className="relative h-56 overflow-hidden">
                                                <img
                                                    src={ad.image}
                                                    alt={ad.title}
                                                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                                                />
                                                <div className="absolute top-4 left-4 bg-black px-3 py-1 flex items-center">
                                                    <FaStar className="text-white mr-1" />
                                                    <span className="text-sm font-medium text-white">Partner Offer</span>
                                                </div>
                                                <div className="absolute bottom-4 left-4 bg-black/80 px-2 py-1">
                                                    <span className="text-xs text-white">Sponsored by {ad.sponsor}</span>
                                                </div>
                                            </div>
                                            <div className="p-6 flex flex-col flex-grow">
                                                <div className="mb-4">
                                                    <h3 className="text-xl font-medium text-gray-900 mb-1 line-clamp-1">
                                                        {ad.title}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                                                        {ad.description}
                                                    </p>
                                                </div>

                                                <div className="mt-auto pt-4 border-t border-gray-200">
                                                    <div className="flex items-center justify-between">
                                                        <a
                                                            href={ad.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="px-4 py-2 bg-black hover:bg-gray-800 text-white transition-colors flex items-center justify-center border border-black"
                                                        >
                                                            <span>Learn More</span>
                                                            <FiExternalLink className="w-4 h-4 ml-2" />
                                                        </a>
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
                    <div className="text-center mt-12 bg-white border border-gray-200 p-10 max-w-2xl mx-auto">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-none mb-6">
                            <FaStar className="text-3xl text-gray-800" />
                        </div>
                        <h3 className="text-2xl font-light text-gray-800 mb-3">
                            No Partner Offers Available
                        </h3>
                        <p className="text-gray-500 mb-6">
                            We're currently updating our partner offers. Please check back later.
                        </p>
                    </div>
                )}

 
                <div className="mt-16 text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white border border-gray-200 p-8 max-w-2xl mx-auto"
                    >
                        <h2 className="text-2xl font-light text-gray-800 mb-3">
                            Want to advertise with us?
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Reach thousands of potential customers by showcasing your products and services on our platform.
                        </p>
                        <button
                            onClick={() => navigate("/contact")}
                            className="px-6 py-3 bg-black hover:bg-gray-800 text-white transition-colors inline-flex items-center border border-black"
                        >
                            <span>Contact Our Ad Team</span>
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </motion.div>
                </div>
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