import { useContext } from "react";
import { informationContext } from "../../App";
// import {icons} from "../../utils/utils.js";

export default function Process() {

    const {t} = useContext(informationContext);
    return (
        <section className="py-10 px-[120px] max-lg:px-[16px] bg-gray-100">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">{t('process.title')}</h2>

            <div className="grid md:grid-cols-3 gap-6 justify-center">
                {t('process.steps', { returnObjects: true }).map((item, i) => (
                    <div
                        className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {item.title}
                            </h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {item.description}
                        </p>
                        <a
                           className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            {item.button}
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                    </div>
                ))}
            </div>
        </section>
    )
}
