import { useContext } from "react";
import { informationContext } from "../../App";
import { motion } from "framer-motion";
import {
    FaSearch,
    FaHandshake,
    FaHome,
    FaArrowRight
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const stepIcons = [FaSearch, FaHandshake, FaHome];

export default function Process() {
    const { t } = useContext(informationContext);
    const steps = t('process.steps', { returnObjects: true });

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

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
                        {t('process.title')}
                    </h2>
                    <p className="text-lg text-gray-600">
                        {t('process.subtitle')}
                    </p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-3 gap-8"
                >
                    {steps.map((item, i) => {
                        const Icon = stepIcons[i] || FaHome;
                        return (
                            <motion.div
                                key={i}
                                variants={item}
                                className="group bg-white border border-gray-200 p-8 rounded-none hover:shadow-sm transition-all duration-300 h-full flex flex-col"
                            >
                                <div className="flex flex-col h-full">
                                    <div className="mb-6 p-3 w-14 h-14 rounded-none bg-gray-100 text-gray-800 group-hover:bg-gray-200 transition-colors">
                                        <Icon className="w-8 h-8" />
                                    </div>

                                    <h3 className="text-xl font-medium text-gray-900 mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-6 flex-grow">
                                        {item.description}
                                    </p>
                                    <NavLink
                                        to={item.path}
                                        className="inline-flex items-center text-gray-800 font-medium group-hover:text-black transition-colors border-b border-transparent group-hover:border-black pb-1 self-start"
                                    >
                                        {item.button}
                                        <FaArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                    </NavLink>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}