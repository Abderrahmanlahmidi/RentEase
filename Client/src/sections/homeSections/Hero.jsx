import { useContext } from "react";
import { informationContext } from "../../App";
import { NavLink } from "react-router";

export default function Hero() {
  const { t } = useContext(informationContext);
  return (
    <div
      className="mt-[62px] w-full h-[80vh] background bg-cover bg-center text-white flex items-center justify-center"
    >
      <div className="text-center max-w-4xl px-6 rounded-lg py-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {t('hero.title')}
        </h1>
        <p className="text-lg md:text-xl mb-6">
          {t('hero.description')}
        </p>
        <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 bg-white rounded p-[10px] w-full">
          <select
            id="city"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option selected>city</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>

          <select
            id="property-type"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option selected>property type</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="villa">Villa</option>
          </select>

          <select
            id="price-range"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option selected>price range</option>
            <option value="1000-2000">$1000 - $2000</option>
            <option value="2000-3000">$2000 - $3000</option>
            <option value="3000-4000">$3000 - $4000</option>
            <option value="4000-5000">$4000 - $5000</option>
          </select>

          <select
            id="rooms"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option selected>rooms</option>
            <option value="1">1 Room</option>
            <option value="2">2 Rooms</option>
            <option value="3">3 Rooms</option>
            <option value="4">4 Rooms</option>
            <option value="5+">5+ Rooms</option>
          </select>

          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-3 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            <svg
              className="w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
