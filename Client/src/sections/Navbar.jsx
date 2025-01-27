import Logo from "../assets/img/home.svg";
import {useState, useContext} from 'react';
import Menu from '../components/Menu';
import { informationContext } from "../App";



function Navbar(){

  const {t, i18n} = useContext(informationContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }
  const handleLanguageChange = (event) => {
   i18n.changeLanguage(event.target.value);
  };

  const routing = ["/", "/Properties", "/About", "/Contact"];

  return (
    <nav className="bg-white flex  fixed top-0  border-b-1 border-[#d9dbdc] z-50 px-[120px] max-lg:px-[16px] items-center justify-between w-full">
      <div className='flex items-center space-x-1' >
        <img className='w-[25px] h-auto' src={Logo} alt="Logo" />
        <a href="" className="flex items-center space-x-3 rtl:space-x-reverse py-[15px] ">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#191f3b] ">RentEase</span>
        </a>
      </div>

      <ul className="flex gap-6 max-md:hidden">
        {t('navbar_links', { returnObjects: true }).map((link, index) => (
            <li key={index}><a className='text-[#191f3b] font-medium hover:text-blue-600' href={routing[index]}>{link}</a></li>
        ))}
      </ul>

      

      <div className="flex items-center gap-3" >
          <a href="" className='text-sm  max-md:hidden text-blue-600 hover:underline' >{t('login')}</a>
          <button type="button" className="text-white max-md:hidden bg-blue-600 cursor-pointer hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none">{t('register')}</button>
        <select onChange={handleLanguageChange} defaultValue={i18n.language} className="bg-gray-50 border  border-gray-300 text-[#191f3b] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          <option value='en' selected>English</option>
          <option value="fr">France</option>
        </select>
        <button onClick={toggleMenu} data-collapse-toggle="navbar-hamburger" type="button" className="max-md:inline-flex hidden items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-hamburger" aria-expanded="false">
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
      </div>

      {isMenuOpen && <Menu t={t} toggleMenu={toggleMenu} routing={routing} />}

    </nav> 
  );
};

export default Navbar;
