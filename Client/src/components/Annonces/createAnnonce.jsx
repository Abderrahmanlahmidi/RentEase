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
    FaPlus,
    FaTimes,
    FaArrowRight
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

    const addFileField = () => {
        append({ file: null });
    };
    
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues:{
            image_urls:[""]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "image_files",
    });

    const transaction = watch("transaction", "location");
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

    const createAnnonce = async (data) => {
        const formData = new FormData();

        formData.append('titre', data.titre);
        formData.append('description', data.description);
        formData.append('transaction', data.transaction);
        formData.append('prix', data.prix);
        formData.append('superficie', data.superficie);
        formData.append('telephone', data.telephone);
        formData.append('email', data.email);
        formData.append('latitude', data.latitude);
        formData.append('longitude', data.longitude);
        formData.append('category_id', data.category_id);
        formData.append('city', data.city);
        formData.append('quartier_id', data.quartier_id);
        formData.append('proprietaire_id', user?.id);

        data.salle_id.forEach((id) => {
            formData.append('salle_id[]', id);
        });

        data.tag_id.forEach((id) => {
            formData.append('tag_id[]', id);
        });

        data.image_files.forEach((item) => {
            if (item.file && item.file.length > 0) {
                formData.append('image_files[]', item.file[0]);
            }
        });

        try {
            const response = await axios.post("http://localhost:8000/api/annonce", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            showToast('success', "Annonce créée avec succès !");
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
            <div className="bg-white border border-gray-200 p-8 rounded-none">
                <h1 className="text-3xl font-light text-gray-900 mb-8">Créer une nouvelle annonce</h1>
                
                <form onSubmit={handleSubmit(createAnnonce)} className="space-y-8">
                    {/* Titre */}
                    <div>
                        <label htmlFor="titre" className={`block mb-3 text-sm font-medium ${errors.titre ? 'text-red-700' : 'text-gray-700'}`}>
                            Titre *
                        </label>
                        <div className="relative">
                            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                                errors.titre ? 'text-red-500' : 'text-gray-500'
                            }`}>
                                <FaHeading />
                            </div>
                            <input
                                id="titre"
                                {...register("titre", {
                                    required: "Le titre est obligatoire",
                                    pattern: {
                                        value: /^[a-zA-Z0-9\sàâäéèêëîïôöùûüçÀÂÄÉÈÊËÎÏÔÖÙÛÜÇ'",.!?-]{5,100}$/,
                                        message: "Le titre doit contenir entre 5 et 100 caractères"
                                    }
                                })}
                                className={`pl-10 w-full px-4 py-2 text-sm border border-gray-300 focus:outline-none focus:border-black ${
                                    errors.titre
                                        ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700'
                                        : 'border-gray-300'
                                }`}
                                placeholder={errors.titre ? "Erreur de saisie" : "Titre de l'annonce"}
                            />
                        </div>
                        {errors.titre && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.titre.message}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className={`block mb-3 text-sm font-medium ${errors.description ? 'text-red-700' : 'text-gray-700'}`}>
                            Description *
                        </label>
                        <div className="relative">
                            <div className={`absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none ${
                                errors.description ? 'text-red-500' : 'text-gray-500'
                            }`}>
                                <FaAlignLeft />
                            </div>
                            <textarea
                                id="description"
                                {...register("description", {
                                    required: "La description est obligatoire",
                                    minLength: {
                                        value: 20,
                                        message: "Minimum 20 caractères"
                                    },
                                    maxLength: {
                                        value: 2000,
                                        message: "Maximum 2000 caractères"
                                    }
                                })}
                                rows={4}
                                className={`pl-10 w-full px-4 py-2 text-sm border border-gray-300 focus:outline-none focus:border-black ${
                                    errors.description
                                        ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700'
                                        : 'border-gray-300'
                                }`}
                                placeholder={errors.description ? "Erreur de saisie" : "Description détaillée"}
                            ></textarea>
                        </div>
                        {errors.description && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    {/* Transaction Type */}
                    <div>
                        <label htmlFor="transaction" className={`block mb-3 text-sm font-medium ${errors.transaction ? 'text-red-700' : 'text-gray-700'}`}>
                            Type de transaction *
                        </label>
                        <div className="relative">
                            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                                errors.transaction ? 'text-red-500' : 'text-gray-500'
                            }`}>
                                <FaExchangeAlt />
                            </div>
                            <select
                                id="transaction"
                                {...register("transaction", { required: "Le type de transaction est obligatoire" })}
                                className={`pl-10 w-full px-4 py-2 text-sm border border-gray-300 focus:outline-none focus:border-black ${
                                    errors.transaction
                                        ? 'bg-red-50 border-red-500 text-red-900'
                                        : 'border-gray-300'
                                }`}
                            >
                                <option value="">Sélectionnez une option</option>
                                <option value="location">Location</option>
                                <option value="achat">Achat</option>
                            </select>
                        </div>
                        {errors.transaction && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.transaction.message}
                            </p>
                        )}
                    </div>

                    {/* Prix */}
                    <div>
                        <label htmlFor="prix" className={`block mb-3 text-sm font-medium ${errors.prix ? 'text-red-700' : 'text-gray-700'}`}>
                            Prix ({transaction === "location" ? "par mois" : ""}) *
                        </label>
                        <div className="relative">
                            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                                errors.prix ? 'text-red-500' : 'text-gray-500'
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
                                    }
                                })}
                                className={`pl-10 w-full px-4 py-2 text-sm border border-gray-300 focus:outline-none focus:border-black ${
                                    errors.prix
                                        ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700'
                                        : 'border-gray-300'
                                }`}
                                placeholder={errors.prix ? "Erreur de saisie" : transaction === "location" ? "Prix mensuel" : "Prix d'achat"}
                            />
                        </div>
                        {errors.prix && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.prix.message}
                            </p>
                        )}
                    </div>

                    {/* Superficie */}
                    <div>
                        <label htmlFor="superficie" className={`block mb-3 text-sm font-medium ${errors.superficie ? 'text-red-700' : 'text-gray-700'}`}>
                            Superficie (m²) *
                        </label>
                        <div className="relative">
                            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                                errors.superficie ? 'text-red-500' : 'text-gray-500'
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
                                        message: "Minimum 1m²"
                                    },
                                    max: {
                                        value: 10000,
                                        message: "Maximum 10,000m²"
                                    }
                                })}
                                className={`pl-10 w-full px-4 py-2 text-sm border border-gray-300 focus:outline-none focus:border-black ${
                                    errors.superficie
                                        ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700'
                                        : 'border-gray-300'
                                }`}
                                placeholder={errors.superficie ? "Erreur de saisie" : "Superficie en mètres carrés"}
                            />
                        </div>
                        {errors.superficie && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.superficie.message}
                            </p>
                        )}
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Téléphone */}
                        <div>
                            <label htmlFor="telephone" className={`block mb-3 text-sm font-medium ${errors.telephone ? 'text-red-700' : 'text-gray-700'}`}>
                                Numéro de téléphone *
                            </label>
                            <div className="relative">
                                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                                    errors.telephone ? 'text-red-500' : 'text-gray-500'
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
                                            message: "Format invalide"
                                        }
                                    })}
                                    className={`pl-10 w-full px-4 py-2 text-sm border border-gray-300 focus:outline-none focus:border-black ${
                                        errors.telephone
                                            ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700'
                                            : 'border-gray-300'
                                    }`}
                                    placeholder={errors.telephone ? "Erreur de saisie" : "Ex: 0612345678"}
                                />
                            </div>
                            {errors.telephone && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.telephone.message}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className={`block mb-3 text-sm font-medium ${errors.email ? 'text-red-700' : 'text-gray-700'}`}>
                                Email *
                            </label>
                            <div className="relative">
                                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                                    errors.email ? 'text-red-500' : 'text-gray-500'
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
                                            message: "Format d'email invalide"
                                        }
                                    })}
                                    className={`pl-10 w-full px-4 py-2 text-sm border border-gray-300 focus:outline-none focus:border-black ${
                                        errors.email
                                            ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700'
                                            : 'border-gray-300'
                                    }`}
                                    placeholder={errors.email ? "Erreur de saisie" : "Votre adresse email"}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Ville */}
                        <div>
                            <label htmlFor="city" className={`block mb-3 text-sm font-medium ${errors.city ? 'text-red-700' : 'text-gray-700'}`}>
                                Ville *
                            </label>
                            <div className="relative">
                                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                                    errors.city ? 'text-red-500' : 'text-gray-500'
                                }`}>
                                    <FaCity />
                                </div>
                                <select
                                    id="city"
                                    {...register("city", { required: "La ville est obligatoire" })}
                                    className={`pl-10 w-full px-4 py-2 text-sm border border-gray-300 focus:outline-none focus:border-black ${
                                        errors.city
                                            ? 'bg-red-50 border-red-500 text-red-900'
                                            : 'border-gray-300'
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
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.city.message}
                                </p>
                            )}
                        </div>

                        {/* Quartier */}
                        {selectedCity && (
                            <div>
                                <label htmlFor="quartier" className={`block mb-3 text-sm font-medium ${errors.quartier_id ? 'text-red-700' : 'text-gray-700'}`}>
                                    Quartier *
                                </label>
                                <div className="relative">
                                    <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                                        errors.quartier_id ? 'text-red-500' : 'text-gray-500'
                                    }`}>
                                        <FaMapMarkedAlt />
                                    </div>
                                    <select
                                        id="quartier"
                                        {...register("quartier_id", { required: "Le quartier est obligatoire" })}
                                        className={`pl-10 w-full px-4 py-2 text-sm border border-gray-300 focus:outline-none focus:border-black ${
                                            errors.quartier_id
                                                ? 'bg-red-50 border-red-500 text-red-900'
                                                : 'border-gray-300'
                                        }`}
                                    >
                                        <option value="">Sélectionnez un quartier</option>
                                        {filteredQuartiers.map((quartier, index) => (
                                            <option key={index} value={quartier.id}>{quartier.nom}</option>
                                        ))}
                                    </select>
                                </div>
                                {errors.quartier_id && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.quartier_id.message}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Catégorie */}
                    <div>
                        <label htmlFor="categorie" className={`block mb-3 text-sm font-medium ${errors.category_id ? 'text-red-700' : 'text-gray-700'}`}>
                            Catégorie *
                        </label>
                        <div className="relative">
                            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                                errors.category_id ? 'text-red-500' : 'text-gray-500'
                            }`}>
                                <FaList />
                            </div>
                            <select
                                id="categorie"
                                {...register("category_id", { required: "La catégorie est obligatoire" })}
                                className={`pl-10 w-full px-4 py-2 text-sm border border-gray-300 focus:outline-none focus:border-black ${
                                    errors.category_id
                                        ? 'bg-red-50 border-red-500 text-red-900'
                                        : 'border-gray-300'
                                }`}
                            >
                                <option value="">Sélectionnez une catégorie</option>
                                {category.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.nom}</option>
                                ))}
                            </select>
                        </div>
                        {errors.category_id && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.category_id.message}
                            </p>
                        )}
                    </div>

                    {/* Tags */}
                    <div>
                        <label className={`block mb-3 text-sm font-medium ${errors.tag_id ? 'text-red-700' : 'text-gray-700'}`}>
                            Tags (Multi-sélection) *
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {tags.map((tag) => (
                                <div key={tag.id} className="flex items-center">
                                    <input
                                        id={`tag-${tag.id}`}
                                        type="checkbox"
                                        {...register("tag_id", { required: "Au moins un tag est requis" })}
                                        value={tag.id}
                                        className={`h-4 w-4 border-gray-300 rounded focus:ring-0 ${
                                            errors.tag_id ? 'text-red-500' : 'text-gray-700'
                                        }`}
                                    />
                                    <label htmlFor={`tag-${tag.id}`} className="ml-2 text-sm text-gray-700">
                                        {tag.nom}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {errors.tag_id && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.tag_id.message}
                            </p>
                        )}
                    </div>

                    {/* Salles */}
                    <div>
                        <label className={`block mb-3 text-sm font-medium ${errors.salle_id ? 'text-red-700' : 'text-gray-700'}`}>
                            Salles (Multi-sélection) *
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {salles.map((salle) => (
                                <div key={salle.id} className="flex items-center">
                                    <input
                                        id={`salle-${salle.id}`}
                                        type="checkbox"
                                        {...register("salle_id", { required: "Au moins une salle est requise" })}
                                        value={salle.id}
                                        className={`h-4 w-4 border-gray-300 rounded focus:ring-0 ${
                                            errors.salle_id ? 'text-red-500' : 'text-gray-700'
                                        }`}
                                    />
                                    <label htmlFor={`salle-${salle.id}`} className="ml-2 text-sm text-gray-700">
                                        {salle.type}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {errors.salle_id && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.salle_id.message}
                            </p>
                        )}
                    </div>

                    {/* Images */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Images <span className="text-red-500">*</span>
                        </label>
                        
                        <div className="space-y-4">
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex items-center gap-3">
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            id={`file-upload-${index}`}
                                            {...register(`image_files.${index}.file`, {
                                                required: index === 0 ? "Au moins une image est requise" : false
                                            })}
                                        />
                                        <label
                                            htmlFor={`file-upload-${index}`}
                                            className="block w-full px-4 py-3 border border-gray-300 hover:border-gray-400 cursor-pointer"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-gray-700">
                                                    {field.file?.name || `Sélectionner une image ${index + 1}`}
                                                </span>
                                                <FaArrowRight className="text-gray-400" />
                                            </div>
                                        </label>
                                    </div>

                                    {index > 0 && (
                                        <button
                                            type="button"
                                            className="p-2 text-gray-500 hover:text-gray-700"
                                            onClick={() => remove(index)}
                                        >
                                            <FaTimes className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            className="mt-4 flex items-center px-4 py-2 border border-gray-300 hover:border-gray-400 text-gray-700"
                            onClick={addFileField}
                        >
                            <FaPlus className="mr-2" />
                            Ajouter une autre image
                        </button>

                        {errors.image_files && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.image_files[0]?.file?.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-black text-white font-medium hover:bg-gray-800 transition-colors flex items-center"
                        >
                            Publier l'annonce
                            <FaArrowRight className="ml-2" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}