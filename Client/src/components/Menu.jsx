import { motion, AnimatePresence } from 'framer-motion';

const Menu = ({toggleMenu, t}) => {
    return(
     <AnimatePresence>
       <motion.ul
         initial={{ opacity: 0, x: '-100%' }}
         animate={{ opacity: 1, x: 0 }}
         exit={{ opacity: 0, x: '-100%' }}
         transition={{ duration: 0.3 }}
         className="fixed inset-0 bg-white z-50 flex flex-col justify-center gap-6 p-4 md:hidden"
       >
         <button
           onClick={toggleMenu}
           type="button"
           className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 cursor-pointer"
           aria-label="Close menu"
         >
           <svg
             xmlns="http://www.w3.org/2000/svg"
             fill="none"
             viewBox="0 0 24 24"
             strokeWidth={2}
             stroke="currentColor"
             className="w-6 h-6"
           >
             <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M6 18L18 6M6 6l12 12"
             />
           </svg>
            </button>
            {t('navbar_links', {returnObjects: true }).map((link, index) => (
              <li key={index} >
                <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100">{link}</a>
              </li>
            ))}
            
            <div className="flex w-full items-center space-x-3">
              <button
                type="button"
                className="text-white bg-blue-700 cursor-pointer hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
              >
                {t('register')}
              </button>
              <button
                type="button"
                className="text-gray-900 cursor-pointer bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                {t('login')}
              </button>
            </div>
       </motion.ul>
     </AnimatePresence>

    )
}

export default Menu;
