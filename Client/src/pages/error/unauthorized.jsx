import { useContext } from "react";
import { informationContext } from "../../App";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const Unauthorized = () => {
  const { t } = useContext(informationContext);

  return (
    <section className="bg-white min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md text-center"
      >
        <h1 className="mb-6 text-8xl font-light text-gray-900">401</h1>
        <h2 className="mb-4 text-2xl font-light text-gray-900">
          {t("error_message.title")}
        </h2>
        <p className="mb-8 text-gray-600">
          {t("error_message.description")}
        </p>
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <NavLink
            to="/"
            className="inline-block px-6 py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors border border-black"
          >
            {t("error_message.button")}
          </NavLink>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Unauthorized;