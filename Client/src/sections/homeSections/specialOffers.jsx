import { motion } from "framer-motion";
import { specialOffers } from "../../utils/utils";
import ImageCarousel from "../../components/homeComponents/ImageCarousel";
import {useContext} from "react";
import {informationContext} from "../../App.jsx";

export default function SpecialOffers() {

    const {t} = useContext(informationContext);

    return (
        <section className="py-10 px-[120px] max-lg:px-[16px] bg-gray-100 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
                {t('specialOffers.title')}
            </h2>
            <motion.div
                className="overflow-hidden cursor-grab"
                whileTap={{ cursor: "grabbing" }}
            >
                <motion.div
                    className="flex gap-6"
                    drag="x"
                    dragConstraints={{ right: 0, left: -((specialOffers.length - 3) * 320) }}
                >
                    {specialOffers.map((offer) => (
                        <motion.div
                            key={offer.id}
                            className="min-w-[400px] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-4"
                        >
                            <ImageCarousel images={offer.images} />
                            <div className="p-5">
                                <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {offer.title}
                                </h3>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    {offer.description}
                                </p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {offer.price}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {offer.location}
                                </p>
                                <button
                                    className={`mt-3 w-full py-2 rounded-lg cursor-pointer ${
                                        offer.isAvailable
                                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                                            : "bg-gray-400 text-gray-700 cursor-not-allowed"
                                    }`}
                                    disabled={!offer.isAvailable}
                                >
                                    {offer.isAvailable ? "View Offer" : "Unavailable"}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
