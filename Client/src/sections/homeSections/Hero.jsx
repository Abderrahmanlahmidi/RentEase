import { useContext } from "react";
import { informationContext } from "../../App";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function Hero() {
  const { t } = useContext(informationContext);

  return (
    <div className="relative mt-[62px] w-full min-h-[70vh] flex items-center justify-center overflow-hidden">

      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://cdn.pixabay.com/photo/2014/08/03/23/41/house-409451_1280.jpg"
          alt="Modern property"
          className="w-full h-full object-cover"
        />
      </div>


      <div className="absolute inset-0 bg-black/40 z-1"></div>

      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6 text-white">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-100">
            {t('hero.description')}
          </p>


          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <NavLink
              to="/properties"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-black hover:bg-gray-700 transition-colors focus:outline-none"
            >
              Browse Properties
            </NavLink>
            <NavLink
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-gray-900 bg-white hover:bg-gray-100 transition-colors focus:outline-none"
            >
              Contact Us
            </NavLink>
          </div>
        </motion.div>
      </div>
    </div>
  );
}