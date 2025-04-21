import Logo from "../../assets/img/home.svg";
import { NavLink } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="w-full max-w-7xl mx-auto p-8">
                <div className="md:flex md:items-center md:justify-between">
                    <div className='flex items-center space-x-2 mb-4 md:mb-0'>
                        <img className='w-6 h-6' src={Logo} alt="Logo" />
                        <NavLink to='/' className="flex items-center">
                            <span className="text-2xl font-light tracking-tight text-gray-900">RentEase</span>
                        </NavLink>
                    </div>
                    <ul className="flex flex-wrap items-center text-sm font-medium text-gray-600 space-x-6">
                        <li>
                            <NavLink 
                                to="/" 
                                className="hover:text-black transition-colors"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/properties" 
                                className="hover:text-black transition-colors"
                            >
                                Properties
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/about" 
                                className="hover:text-black transition-colors"
                            >
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/contact" 
                                className="hover:text-black transition-colors"
                            >
                                Contact
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200"/>
                <span className="block text-sm text-gray-500 text-center">
                    © {new Date().getFullYear()} <span className="font-medium">RentEase</span>. All Rights Reserved.
                </span>
            </div>
        </footer>
    )
}