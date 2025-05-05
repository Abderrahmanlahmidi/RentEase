import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const Menu = ({ toggleMenu, t, routing }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: '-100%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: '-100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed inset-0 bg-white z-50 p-8 md:hidden"
      >

        <motion.button
          onClick={toggleMenu}
          whileTap={{ scale: 0.95 }}
          className="absolute top-6 right-6 text-gray-800 hover:text-black transition-colors"
          aria-label="Close menu"
        >
          <FaTimes className="w-6 h-6" />
        </motion.button>


        <div className="h-full flex flex-col justify-center">

          <motion.ul className="space-y-4 mb-12">
            {t('navbar_links', { returnObjects: true }).map((link, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <NavLink
                  to={routing[index]}
                  className={({ isActive }) => 
                    `block py-3 px-4 text-lg font-medium text-gray-800 
                    ${isActive ? 'border-l-4 border-black text-black' : 'hover:bg-gray-100'}`
                  }
                  onClick={toggleMenu}
                >
                  {link}
                </NavLink>
              </motion.li>
            ))}
          </motion.ul>


          <motion.div 
            className="flex flex-col space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <NavLink
              to="/Register"
              className="text-center px-6 py-3 bg-black text-white font-medium rounded-none hover:bg-gray-800 transition-colors"
              onClick={toggleMenu}
            >
              {t('register')}
            </NavLink>
            <NavLink
              to="/Login"
              className="text-center px-6 py-3 border-2 border-black text-black font-medium rounded-none hover:bg-gray-100 transition-colors"
              onClick={toggleMenu}
            >
              {t('login')}
            </NavLink>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Menu;