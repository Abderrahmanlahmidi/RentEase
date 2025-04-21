import Logo from "../assets/img/home.svg";
import { useState, useContext } from 'react';
import Menu from '../components/Menu';
import { informationContext } from "../App";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import UserDropdown from "../components/navbarComponents/userDropdown.jsx";
import UserNotification from "../components/navbarComponents/userNotification.jsx";
import { motion } from 'framer-motion';

function Navbar() {
    const { t, i18n } = useContext(informationContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleLanguageChange = (event) => {
        i18n.changeLanguage(event.target.value);
    };

    const logoutHandler = () => {
        setUser(null);
        navigate('/');
    };

    const routing = ["/", "/Properties", "/About", "/Contact"];

    return (
        <nav className="bg-white fixed top-0 w-full border-b border-gray-200 z-50 px-4 sm:px-8 lg:px-16 xl:px-32 py-3">
            <div className="flex items-center justify-between">
                {/* Logo/Brand */}
                <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-2"
                >
                    <img className="w-6 h-6" src={Logo} alt="RentEase Logo" />
                    <NavLink
                        to="/"
                        className="text-2xl font-light text-gray-900 hover:text-black transition-colors"
                    >
                        RentEase
                    </NavLink>
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    <ul className="flex space-x-6">
                        {t('navbar_links', { returnObjects: true }).map((link, index) => (
                            <li key={index}>
                                <NavLink
                                    to={routing[index]}
                                    className={({ isActive }) =>
                                        `py-2 px-1 ${isActive ? 'text-black font-medium border-b border-black' : 'text-gray-600'} hover:text-black transition-colors`
                                    }
                                >
                                    {link}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* User/Auth Section */}
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <UserNotification />
                                <UserDropdown logoutHandler={logoutHandler} />
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to="/Login"
                                    className="text-sm text-gray-600 hover:text-black transition-colors"
                                >
                                    {t('login')}
                                </NavLink>
                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <NavLink
                                        to="/Register"
                                        className="text-sm px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors border border-black"
                                    >
                                        {t("register")}
                                    </NavLink>
                                </motion.div>
                            </>
                        )}

                        {/* Language Selector */}
                        <select
                            onChange={handleLanguageChange}
                            defaultValue={i18n.language}
                            className="bg-white border border-gray-300 text-gray-600 text-sm px-3 py-1.5 focus:ring-1 focus:ring-black focus:border-black outline-none"
                        >
                            <option value='en'>EN</option>
                            <option value="fr">FR</option>
                        </select>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center space-x-4">
                    <UserNotification />
                    <UserDropdown logoutHandler={logoutHandler} />
                    <select
                        onChange={handleLanguageChange}
                        defaultValue={i18n.language}
                        className="bg-white border border-gray-300 text-gray-600 text-sm px-2 py-1 focus:outline-none"
                    >
                        <option value='en'>EN</option>
                        <option value="fr">FR</option>
                    </select>
                    <motion.button
                        onClick={toggleMenu}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-gray-600 hover:text-black focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> 
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <Menu
                    t={t}
                    toggleMenu={toggleMenu}
                    routing={routing}
                    user={user}
                    logoutHandler={logoutHandler}
                />
            )}
        </nav>
    );
}

export default Navbar;