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
           <select id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
             <option selected>{t('form.city.label')}</option>
             <option value="US">{t('form.city.options.US')}</option>
             <option value="CA">{t('form.city.options.CA')}</option>
             <option value="FR">{t('form.city.options.FR')}</option>
             <option value="DE">{t('form.city.options.DE')}</option>
           </select>
            <select id="property-type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              <option selected>{t('form.propertyType.label')}</option>
              <option value="apartment">{t('form.propertyType.options.apartment')}</option>
              <option value="house">{t('form.propertyType.options.house')}</option>
              <option value="condo">{t('form.propertyType.options.condo')}</option>
              <option value="villa">{t('form.propertyType.options.villa')}</option>
            </select>
            <select id="price-range" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              <option selected>{t('form.priceRange.label')}</option>
              <option value="1000-2000">{t('form.priceRange.options.1000-2000')}</option>
              <option value="2000-3000">{t('form.priceRange.options.2000-3000')}</option>
              <option value="3000-4000">{t('form.priceRange.options.3000-4000')}</option>
              <option value="4000-5000">{t('form.priceRange.options.4000-5000')}</option>
            </select>
            <select id="rooms" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              <option selected>{t('form.rooms.label')}</option>
              <option value="1">{t('form.rooms.options.1')}</option>
              <option value="2">{t('form.rooms.options.2')}</option>
              <option value="3">{t('form.rooms.options.3')}</option>
              <option value="4">{t('form.rooms.options.4')}</option>
              <option value="5+">{t('form.rooms.options.5+')}</option>
            </select>
          <button
            type="submit"
            className="inline-flex cursor-pointer items-center py-2.5 px-3 text-sm font-medium text-white bg-blue-600 rounded-lg border border-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
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
            {t('buttons.search')}
          </button>
        </form>
      </div>
    </div>
  );
}
