import {useFieldArray, useForm } from "react-hook-form";
import {useEffect, useState, useContext} from "react";
import axios from "axios";
import {showToast} from "../../utils/toastUtils.jsx";
import {ToastContainer} from "react-toastify";
import {UserContext} from "../../context/userContext.jsx";
import {
    FaMoneyBillWave,
    FaExchangeAlt,
    FaHeading,
    FaAlignLeft,
    FaRulerCombined,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaList,
    FaCity,
    FaMapMarkedAlt,
} from 'react-icons/fa';

import {useNavigate} from "react-router-dom";

export default function CreateAnnonce() {
    const [category, setCategory] = useState([]);
    const [tags, setTags] = useState([]);
    const [salles, setSalles]= useState([]);
    const [quartiers, setQuartiers] = useState([]);
    const [selectedCity, setSelectedCity] = useState();
    const {user,announcements,setAnnouncements} = useContext(UserContext);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors }
    } = useForm({
        defaultValues: {
            image_urls: [""]
        }
    });
    const transaction = watch("transaction", "location");

    const { fields, append, remove } = useFieldArray({
        control,
        name: "image_urls"
    });

    const addUrlField = () => {
        append("");
    };
    const uniqueCities = [...new Set(quartiers.map(q => q.city.nom))];
    const filteredQuartiers = quartiers.filter(q => q.city.nom === selectedCity);


    const displayCategories = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/categories");
            setCategory(response.data.categories);
        } catch {
            showToast("error", "Failed to load categories");
        }
    };

    const displayTags = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/tags");
            setTags(response.data.tags);
        } catch (error) {
            console.error(error);
        }
    };

    const displayQuartier = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/quartiers");
            setQuartiers(response.data.data)
        } catch (error) {
            console.error(error);
        }
    }

    const displaySalles = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/salles");
                setSalles(response.data.salles);
            } catch (error) {
                console.error(error);
            }
    }

    useEffect(() => {
        displayCategories();
        displayTags();
        displaySalles();
        displayQuartier()
    }, [])

    // create annonce function
    const createAnnonce = async (data) => {

        const payload = { ...data, proprietaire_id:user.id};
        console.log("Données envoyées :", payload);

        try {
            const response = await axios.post("http://localhost:8000/api/annonce", payload);
            showToast('success', "Annonce créée avec succès !");
            console.log("the server response:", response.data.annonce);
            setAnnouncements([...announcements, response.data.annonce]);
            setTimeout(() => navigate("/properties"), 3000);
        } catch (error) {
            if (error.response) {
                console.error("Erreur lors de l'envoi :", error.response.data);
                showToast('error', "Erreur lors de l'envoi :");
            } else {
                console.error("Erreur inconnue :", error);
                showToast('error', "Erreur lors de l'envoi :");
            }
        }
    };


    return (
        <div className="max-w-4xl mx-auto p-6">
            <ToastContainer/>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Créer une nouvelle annonce</h1>
                <form onSubmit={handleSubmit(createAnnonce)} className="space-y-6">
                    {/* Titre */}
                    <div>
                        <label htmlFor="titre" className={`block mb-2 text-sm font-medium ${errors.titre ? 'text-red-700 dark:text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>
                            Titre *
                        </label>
                        <div className="relative">
                            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                                errors.titre ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
                            }`}>
                                <FaHeading />
                            </div>
                            <input
                                id="titre"
                                {...register("titre", {
                                    required: "Le titre est obligatoire",
                                    pattern: {
                                        value: /^[a-zA-Z0-9\sàâäéèêëîïôöùûüçÀÂÄÉÈÊËÎÏÔÖÙÛÜÇ'",.!?-]{5,100}$/,
                                        message: "Le titre doit contenir entre 5 et 100 caractères (lettres, chiffres, espaces et ,.!?- sont autorisés)"
                                    }
                                })}
                                className={`pl-10 w-full px-4 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 block w-full p-2.5 ${
                                    errors.titre
                                        ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                                        : 'border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600'
                                }`}
                                placeholder={errors.titre ? "Erreur de saisie" : "Titre de l'annonce"}
                            />
                        </div>
                        {errors.titre && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <span className="font-medium">Erreur!</span> {errors.titre.message}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className={`block mb-2 text-sm font-medium ${errors.description ? 'text-red-700 dark:text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>
                            Description *
                        </label>
                        <div className="relative">
                            <div className={`absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none ${
                                errors.description ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
                            }`}>
                                <FaAlignLeft />
                            </div>
                            <textarea
                                id="description"
                                {...register("description", {
                                    required: "La description est obligatoire",
                                    minLength: {
                                        value: 20,
                                        message: "La description doit contenir au minimum 20 caractères"
                                    },
                                    maxLength: {
                                        value: 2000,
                                        message: "La description ne peut pas dépasser 2000 caractères"
                                    }
                                })}
                                rows={4}
                                className={`pl-10 w-full px-4 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 block w-full p-2.5 ${
                                    errors.description
                                        ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                                        : 'border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600'
                                }`}
                                placeholder={errors.description ? "Erreur de saisie" : "Description détaillée"}
                            ></textarea>
                        </div>
                        {errors.description && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <span className="font-medium">Erreur!</span> {errors.description.message}
                            </p>
                        )}
                    </div>

                      {/* Transaction Type */}
                      <div>
                        <label htmlFor="transaction" className={`block mb-2 text-sm font-medium ${errors.transaction ? 'text-red-700 dark:text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>
                            Type de transaction *
                        </label>
                        <div className="relative">
                            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                                errors.transaction ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
                            }`}>
                                <FaExchangeAlt />
                            </div>
                            <select
                                id="transaction"
                                {...register("transaction", { required: "Le type de transaction est obligatoire" })}
                                className={`pl-10 w-full px-4 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 block w-full p-2.5 ${
                                    errors.transaction
                                        ? 'bg-red-50 border border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:border-red-500'
                                        : 'border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600'
                                }`}
                            >
                                <option value="">Sélectionnez une option</option>
                                <option value="location">Location</option>
                                <option value="achat">Achat</option>
                            </select>
                        </div>
                        {errors.transaction && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <span className="font-medium">Erreur!</span> {errors.transaction.message}
                            </p>
                        )}
                    </div>

                    {/* Prix */}
                    <div>
                        <label htmlFor="prix" className={`block mb-2 text-sm font-medium ${errors.prix ? 'text-red-700 dark:text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>
                            Prix ({transaction === "location" ? "par mois" : ""}) *
                        </label>
                        <div className="relative">
                            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                                errors.prix ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
                            }`}>
                                <FaMoneyBillWave />
                            </div>
                            <input
                                id="prix"
                                type="number"
                                {...register("prix", {
                                    required: "Le prix est obligatoire",
                                    min: {
                                        value: 1,
                                        message: "Le prix minimum est de 1€"
                                    },
                                    max: {
                                        value: 10000000,
                                        message: "Le prix maximum est de 10,000,000€"
                                    },
                                    pattern: {
                                        value: /^[1-9]\d*$/,
                                        message: "Veuillez entrer un nombre entier positif"
                                    }
                                })}
                                className={`pl-10 w-full px-4 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 block w-full p-2.5 ${
                                    errors.prix
                                        ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                                        : 'border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600'
                                }`}
                                placeholder={errors.prix ? "Erreur de saisie" : transaction === "location" ? "Prix mensuel" : "Prix d'achat"}
                            />
                        </div>
                        {errors.prix && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <span className="font-medium">Erreur!</span> {errors.prix.message}
                            </p>
                        )}
                    </div>

                    {/* Superficie */}
                    <div>
                        <label htmlFor="superficie" className={`block mb-2 text-sm font-medium ${errors.superficie ? 'text-red-700 dark:text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>
                            Superficie (m²) *
                        </label>
                        <div className="relative">
                            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                                errors.superficie ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
                            }`}>
                                <FaRulerCombined />
                            </div>
                            <input
                                id="superficie"
                                type="number"
                                {...register("superficie", {
                                    required: "La superficie est obligatoire",
                                    min: {
                                        value: 1,
                                        message: "La superficie minimale est de 1m²"
                                    },
                                    max: {
                                        value: 10000,
                                        message: "La superficie maximale est de 10,000m²"
                                    },
                                    pattern: {
                                        value: /^[1-9]\d*$/,
                                        message: "Veuillez entrer un nombre entier positif"
                                    }
                                })}
                                className={`pl-10 w-full px-4 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 block w-full p-2.5 ${
                                    errors.superficie
                                        ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                                        : 'border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600'
                                }`}
                                placeholder={errors.superficie ? "Erreur de saisie" : "Superficie en mètres carrés"}
                            />
                        </div>
                        {errors.superficie && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <span className="font-medium">Erreur!</span> {errors.superficie.message}
                            </p>
                        )}
                    </div>

                    {/* Numéro de téléphone */}
                    <div>
                        <label htmlFor="telephone" className={`block mb-2 text-sm font-medium ${errors.telephone ? 'text-red-700 dark:text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>
                            Numéro de téléphone *
                        </label>
                        <div className="relative">
                            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                                errors.telephone ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
                            }`}>
                                <FaPhone />
                            </div>
                            <input
                                id="telephone"
                                type="tel"
                                {...register("telephone", {
                                    required: "Le numéro de téléphone est obligatoire",
                                    pattern: {
                                        value: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
                                        message: "Format invalide. Exemples valides: 0612345678, +33612345678, 06 12 34 56 78"
                                    }
                                })}
                                className={`pl-10 w-full px-4 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 block w-full p-2.5 ${
                                    errors.telephone
                                        ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                                        : 'border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600'
                                }`}
                                placeholder={errors.telephone ? "Erreur de saisie" : "Ex: 0612345678 ou +33612345678"}
                            />
                        </div>
                        {errors.telephone && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <span className="font-medium">Erreur!</span> {errors.telephone.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className={`block mb-2 text-sm font-medium ${errors.email ? 'text-red-700 dark:text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>
                            Email *
                        </label>
                        <div className="relative">
                            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                                errors.email ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
                            }`}>
                                <FaEnvelope />
                            </div>
                            <input
                                id="email"
                                type="email"
                                {...register("email", {
                                    required: "L'email est obligatoire",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Format d'email invalide. Exemple: exemple@domaine.com"
                                    }
                                })}
                                className={`pl-10 w-full px-4 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 block w-full p-2.5 ${
                                    errors.email
                                        ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                                        : 'border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600'
                                }`}
                                placeholder={errors.email ? "Erreur de saisie" : "Votre adresse email"}
                            />
                        </div>
                        {errors.email && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <span className="font-medium">Erreur!</span> {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Coordonnées */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="latitude" className={`block mb-2 text-sm font-medium ${errors.latitude ? 'text-red-700 dark:text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>
                                Latitude
                            </label>
                            <div className="relative">
                                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                                    errors.latitude ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
                                }`}>
                                    <FaMapMarkerAlt />
                                </div>
                                <input
                                    id="latitude"
                                    {...register("latitude", {
                                        pattern: {
                                            value: /^-?([1-8]?[1-9]|[1-9]0)\.\d{1,6}$/,
                                            message: "Format invalide. Doit être entre -90 et 90 avec 6 décimales max (ex: 48.8566)"
                                        }
                                    })}
                                    className={`pl-10 w-full px-4 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 block w-full p-2.5 ${
                                        errors.latitude
                                            ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                                            : 'border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600'
                                    }`}
                                    placeholder={errors.latitude ? "Erreur de saisie" : "Ex: 48.8566"}
                                />
                            </div>
                            {errors.latitude && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    <span className="font-medium">Erreur!</span> {errors.latitude.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="longitude" className={`block mb-2 text-sm font-medium ${errors.longitude ? 'text-red-700 dark:text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>
                                Longitude
                            </label>
                            <div className="relative">
                                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                                    errors.longitude ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
                                }`}>
                                    <FaMapMarkerAlt />
                                </div>
                                <input
                                    id="longitude"
                                    {...register("longitude", {
                                        pattern: {
                                            value: /^-?([1-9]?[1-9]|[1-2][0-9]|30)\.\d{1,6}$/,
                                            message: "Format invalide. Doit être entre -180 et 180 avec 6 décimales max (ex: 2.3522)"
                                        }
                                    })}
                                    className={`pl-10 w-full px-4 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 block w-full p-2.5 ${
                                        errors.longitude
                                            ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
                                            : 'border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600'
                                    }`}
                                    placeholder={errors.longitude ? "Erreur de saisie" : "Ex: 2.3522"}
                                />
                            </div>
                            {errors.longitude && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    <span className="font-medium">Erreur!</span> {errors.longitude.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Catégorie */}
                    <div>
                        <label htmlFor="categorie" className={`block mb-2 text-sm font-medium ${errors.category_id ? 'text-red-700 dark:text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>
                            Catégorie *
                        </label>
                        <div className="relative">
                            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                                errors.category_id ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
                            }`}>
                                <FaList />
                            </div>
                            <select
                                id="categorie"
                                {...register("category_id", { required: "La catégorie est obligatoire" })}
                                className={`pl-10 w-full px-4 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 block w-full p-2.5 ${
                                    errors.category_id
                                        ? 'bg-red-50 border border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:border-red-500'
                                        : 'border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600'
                                }`}
                            >
                                <option value="">Sélectionnez une catégorie</option>
                                {category.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.nom}</option>
                                ))}
                            </select>
                        </div>
                        {errors.category_id && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <span className="font-medium">Erreur!</span> {errors.category_id.message}
                            </p>
                        )}
                    </div>

                    {/* City */}
                    <div>
                        <label htmlFor="city" className={`block mb-2 text-sm font-medium ${errors.city ? 'text-red-700 dark:text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>
                            Ville *
                        </label>
                        <div className="relative">
                            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                                errors.city ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
                            }`}>
                                <FaCity />
                            </div>
                            <select
                                id="city"
                                {...register("city", { required: "La ville est obligatoire" })}
                                className={`pl-10 w-full px-4 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 block w-full p-2.5 ${
                                    errors.city
                                        ? 'bg-red-50 border border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:border-red-500'
                                        : 'border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600'
                                }`}
                                onChange={(e) => setSelectedCity(e.target.value)}
                            >
                                <option value="">Sélectionnez une ville</option>
                                {uniqueCities.map((city, index) => (
                                    <option key={index} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                        {errors.city && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <span className="font-medium">Erreur!</span> {errors.city.message}
                            </p>
                        )}
                    </div>

                    {selectedCity && (
                        <div>
                            <label htmlFor="quartier" className={`block mb-2 text-sm font-medium ${errors.quartier_id ? 'text-red-700 dark:text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>
                                Quartier *
                            </label>
                            <div className="relative">
                                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                                    errors.quartier_id ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
                                }`}>
                                    <FaMapMarkedAlt />
                                </div>
                                <select
                                    id="quartier"
                                    {...register("quartier_id", { required: "Le quartier est obligatoire" })}
                                    className={`pl-10 w-full px-4 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 block w-full p-2.5 ${
                                        errors.quartier_id
                                            ? 'bg-red-50 border border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:border-red-500'
                                            : 'border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600'
                                    }`}
                                >
                                    <option value="">Sélectionnez un quartier</option>
                                    {filteredQuartiers.map((quartier, index) => (
                                        <option key={index} value={quartier.id}>{quartier.nom}</option>
                                    ))}
                                </select>
                            </div>
                            {errors.quartier_id && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    <span className="font-medium">Erreur!</span> {errors.quartier_id.message}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Tags (Multi-sélection) */}
                    <div>
                        <label className={`block mb-2 text-sm font-medium ${errors.tag_id ? 'text-red-700 dark:text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>
                            Tags (Multi-sélection) *
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {tags.map((tag) => (
                                <div key={tag.id} className="flex items-center">
                                    <input
                                        id={`tag-${tag.id}`}
                                        type="checkbox"
                                        {...register("tag_id", { required: "Au moins un tag est requis" })}
                                        value={tag.id}
                                        className={`h-4 w-4 rounded ${
                                            errors.tag_id
                                                ? 'text-red-600 border-red-500 focus:ring-red-500'
                                                : 'text-blue-600 border-gray-300 focus:ring-blue-500'
                                        }`}
                                    />
                                    <label htmlFor={`tag-${tag.id}`} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                        {tag.nom}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {errors.tag_id && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <span className="font-medium">Erreur!</span> {errors.tag_id.message}
                            </p>
                        )}
                    </div>

                    {/* Salles (Multi-sélection) */}
                    <div>
                        <label className={`block mb-2 text-sm font-medium ${errors.salle_id ? 'text-red-700 dark:text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>
                            Salles (Multi-sélection) *
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {salles.map((salle) => (
                                <div key={salle.id} className="flex items-center">
                                    <input
                                        id={`salle-${salle.id}`}
                                        type="checkbox"
                                        {...register("salle_id", { required: "Au moins une salle est requise" })}
                                        value={salle.id}
                                        className={`h-4 w-4 rounded ${
                                            errors.salle_id
                                                ? 'text-red-600 border-red-500 focus:ring-red-500'
                                                : 'text-blue-600 border-gray-300 focus:ring-blue-500'
                                        }`}
                                    />
                                    <label htmlFor={`salle-${salle.id}`} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                        {salle.type}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {errors.salle_id && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <span className="font-medium">Erreur!</span> {errors.salle_id.message}
                            </p>
                        )}
                    </div>

                    {/* Image URLs (Add multiple) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            URLs des images (Ajouter plusieurs) *
                        </label>
                        <div className="mt-1 px-6 pt-5 pb-6 border-2 border-gray-300 rounded-lg dark:border-gray-600">
                            <div className="space-y-4">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="flex items-center">
                                        <input
                                            type="url"
                                            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                                            placeholder="Entrez l'URL de l'image"
                                            {...register(`image_urls.${index}`, {
                                                required: index === 0 ? "Au moins une URL d'image est requise" : false,
                                            })}
                                        />
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                className="ml-2 px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                onClick={() => remove(index)}
                                            >
                                                Supprimer
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onClick={addUrlField}
                                >
                                    Ajouter une URL
                                </button>
                            </div>
                            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                Formats acceptés: URL
                            </p>
                        </div>
                        {errors.image_urls && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.image_urls[0]?.message || "Une URL d'image valide est requise"}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-800"
                        >
                            Publier l'annonce
                        </button>
                    </div>
                </form>


            </div>
        </div>
    );
}