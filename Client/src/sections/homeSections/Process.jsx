import { useContext } from "react";
import { informationContext } from "../../App";
import { motion } from "framer-motion";
import {
    FaSearch,
    FaHandshake,
    FaHome,
    FaArrowRight
} from "react-icons/fa";
import {NavLink} from "react-router-dom";


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
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {t('process.title')}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
                                className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                            >
                                <div className="flex flex-col h-full">
                                    <div className="mb-6 p-3 w-14 h-14 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                                        <Icon className="w-8 h-8" />
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 mb-6 flex-grow">
                                        {item.description}
                                    </p>
                                    <NavLink
                                       to={item.path}
                                        className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors"
                                    >
                                        {item.button}
                                        <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
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