import { useContext } from "react";
import { informationContext } from "../../App";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const Error = () => {
  const { t } = useContext(informationContext);

  return (
    <section className="bg-white min-h-screen flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-screen-sm text-center px-4 py-8"
      >
        <h1 className="mb-6 text-8xl font-light tracking-tight text-gray-900">
          404
        </h1>
        <h2 className="mb-4 text-3xl font-light text-gray-900">
          {t("error_message.title")}
        </h2>
        <p className="mb-8 text-lg text-gray-600 max-w-md mx-auto">
          {t("error_message.description")}
        </p>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
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

export default Error;