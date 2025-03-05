import Logo from "../../assets/img/home.svg";
import {NavLink} from "react-router";

export default function Footer() {
    return (
        <footer className="bg-white rounded-lg shadow-sm dark:bg-gray-900 border-t border-gray-200">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className='flex items-center space-x-1' >
                        <img className='w-[25px] h-auto' src={Logo} alt="Logo" />
                        <NavLink to='/' className="flex items-center space-x-3 rtl:space-x-reverse">
                            <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#191f3b] ">RentEase</span>
                        </NavLink>
                    </div>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <NavLink to="/"  className="hover:underline me-4 md:me-6">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/properties"  className="hover:underline me-4 md:me-6">Properties</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" className="hover:underline me-4 md:me-6">About</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className="hover:underline">Contact</NavLink>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a
                    className="hover:underline">RentEase™</a>. All Rights Reserved.</span>
            </div>
        </footer>
    )
}