import { motion } from "framer-motion";
import { FaSearch} from 'react-icons/fa';
import {UserContext} from "../../../context/userContext.jsx";
import {useContext, useState} from "react";

export default function AnnoncesDashboard() {

    const {announcements} = useContext(UserContext);
    const [filtered, setFiletered] = useState([]);
    const [search, setSearch] = useState("");


        const SearchAnnoncment = (searchValue) => {
        setSearch(searchValue);
        if (searchValue !== "") {
            const filteredAnnonce = announcements.filter((item) =>
                Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            )
            setFiletered(filteredAnnonce);
        }
    }

    const displayedAnnonces = search === "" ? announcements : filtered;

    return (
        <div className="relative overflow-x-auto w-full sm:rounded-lg">
            <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Gestion des Annonces
                </h2>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FaSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                        onChange={(e) => {
                            SearchAnnoncment(e.target.value);
                        }}
                        type="text"
                        placeholder="Rechercher une annonce..."
                        className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                </div>
            </div>

            <div className="relative overflow-auto max-h-[600px] w-full sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="sticky top-0 z-10 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">Titre</th>
                        <th className="px-6 py-3">Prix</th>
                        <th className="px-6 py-3">Localisation</th>
                        <th className="px-6 py-3">Catégorie</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {displayedAnnonces.map((item) => (
                            <motion.tr
                                key={item.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white truncate max-w-xs">
                                    {item.titre}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                                    {item.prix}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                                    {item.quartier.nom}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                                    {item.category.nom}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                                     {new Date(item.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-center space-x-2">
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 cursor-pointer rounded hover:bg-red-600 text-xs"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </motion.tr>
                    ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
}
