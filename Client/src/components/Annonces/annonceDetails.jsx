import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaHome,
  FaRulerCombined,
  FaBed,
  FaBath,
  FaUtensils,
  FaCouch,
  FaShare,
  FaHeart,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaStar,
  FaTimes,
  FaCheck
} from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import AnnonceMap from './annonceMap.jsx';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../context/userContext.jsx';
import { ToastContainer } from "react-toastify";
import { showToast } from "../../utils/toastUtils.jsx";

export default function AnnonceDetails() {
  const { annonceId } = useParams();
  const navigate = useNavigate();
  const [annonce, setAnnonce] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [showVisitForm, setShowVisitForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { user } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (!annonceId) {
      setError('No annonce ID provided');
      setLoading(false);
      return;
    }

    const fetchAnnonceDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/findannonce/${annonceId}`);
        setAnnonce(response.data.annonce);
      } catch (error) {
        console.error('Error fetching annonce:', error);
        setError('Failed to load annonce details');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnonceDetails();
  }, [annonceId]);

  const handlePrevImage = () => {
    setActiveImageIndex(prev =>
        prev === 0 ? annonce.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setActiveImageIndex(prev =>
        prev === annonce.images.length - 1 ? 0 : prev + 1
    );
  };

  const onSubmitVisitForm = async (data) => {
    try {
      const payload = {
        date_visite: new Date(data.dateEnvoi).toISOString().slice(0, 19).replace("T", " "),
        user_id: parseInt(user.id),
        annonce_id: parseInt(annonceId),
      };

      await axios.post("http://127.0.0.1:8000/api/visit", payload);

      await axios.post("http://127.0.0.1:8000/api/notification", {
        annonce_id: annonce.id,
        user_id: annonce.proprietaire_id,
        title:"Nouvelle demande de visite",
        contenu:"Votre demande de visite a été enregistrée avec succès.",
        dateEnvoi:new Date().toISOString().slice(0, 19).replace("T", " ")
      })

      setIsSubmitted(true);
      showToast("success", "Visit scheduled successfully");
    } catch {
      showToast("error", "Failed to schedule visit");
    }
  };

  if (loading) return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
  );

  if (error) return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="bg-white p-8 border border-gray-200 max-w-md mx-auto">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-light text-gray-900 mb-2">Error Loading Property</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
              onClick={() => navigate('/properties')}
              className="px-6 py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors"
          >
            Browse Properties
          </button>
        </div>
      </div>
  );

  if (!annonce) return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="bg-white p-8 border border-gray-200 max-w-md mx-auto">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-light text-gray-900 mb-2">Property Not Found</h2>
          <p className="text-gray-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <button
              onClick={() => navigate('/properties')}
              className="px-6 py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors"
          >
            Browse Available Properties
          </button>
        </div>
      </div>
  );

  return (
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-50 min-h-screen"
      >
        <ToastContainer />
        {/* Visit Schedule Form Modal */}
        {showVisitForm && (
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50">
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-gray-200 max-w-md w-full p-8 relative"
              >
                <button
                    onClick={() => {
                      setShowVisitForm(false);
                      reset();
                      setIsSubmitted(false);
                    }}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>

                {isSubmitted ? (
                    <div className="text-center py-6">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaCheck className="text-gray-800 text-2xl" />
                      </div>
                      <h3 className="text-lg font-light text-gray-900 mb-1">Visit Scheduled!</h3>
                      <p className="text-gray-600">Your visit has been successfully scheduled.</p>
                      <button
                          onClick={() => {
                            setShowVisitForm(false);
                            setIsSubmitted(false);
                          }}
                          className="mt-4 px-4 py-2 bg-black text-white font-medium hover:bg-gray-800 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                ) : (
                    <>
                      <h2 className="text-2xl font-light text-gray-900 mb-6">Schedule a Visit</h2>
                      <form onSubmit={handleSubmit(onSubmitVisitForm)} className="space-y-4">
                        <div>
                          <label className="block text-gray-600 mb-2 flex items-center">
                            <FaCalendarAlt className="mr-2 text-gray-500" />
                            Select Visit Date & Time
                          </label>
                          <input
                              type="datetime-local"
                              {...register('dateEnvoi', {
                                required: 'Date is required',
                                validate: value => {
                                  const selectedDate = new Date(value);
                                  const now = new Date();
                                  return selectedDate > now || 'Date must be in the future';
                                }
                              })}
                              className={`w-full px-4 py-2 border ${errors.dateEnvoi ? 'border-red-500' : 'border-gray-300'} focus:border-black`}
                          />
                          {errors.dateEnvoi && (
                              <p className="text-red-500 text-sm mt-1">{errors.dateEnvoi.message}</p>
                          )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white font-medium py-3 px-6 hover:bg-gray-800 transition-colors"
                        >
                          Schedule Visit
                        </button>
                      </form>
                    </>
                )}
              </motion.div>
            </div>
        )}

        {/* Back button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <FaChevronLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Back to results</span>
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Title and Price Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-white p-6 border border-gray-200">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center flex-wrap gap-2 mb-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                annonce.transaction === 'location' ? 'bg-gray-100 text-gray-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {annonce.transaction === 'location' ? 'For Rent' : 'For Sale'}
              </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
                {annonce.category.nom}
              </span>
                <span className="text-sm text-gray-600">
                Listed {new Date(annonce.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-2">{annonce.titre}</h1>
              <div className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="mr-2 text-gray-500" />
                <span className="font-medium">{annonce.quartier.nom}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-3xl font-light text-gray-900">
                {annonce.prix.toLocaleString()} {annonce.transaction === 'location' ? '/mois' : ''}
              </div>
              {annonce.ancienPrix && (
                  <span className="text-lg line-through text-gray-600">
                {annonce.ancienPrix.toLocaleString()}
              </span>
              )}
            </div>
          </div>

          {/* Image Gallery */}
          <div className="relative mb-10 overflow-hidden border border-gray-200">
            <div className="relative h-[500px] w-full">
              <img
                  src={`http://localhost:8000/storage/${annonce.images[activeImageIndex]?.url}`}
                  alt={annonce.titre}
                  className="w-full h-full object-cover transition-opacity duration-300"
              />

              {/* Navigation arrows */}
              <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110"
              >
                <FaChevronLeft className="text-gray-800" />
              </button>
              <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110"
              >
                <FaChevronRight className="text-gray-800" />
              </button>

              {/* Image counter */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-1 rounded-full text-sm font-medium">
                {activeImageIndex + 1} / {annonce.images.length}
              </div>

              {/* Action buttons */}
              <div className="absolute top-6 right-6 flex space-x-3">
                <button
                    className="p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all transform hover:scale-110"
                    onClick={() => setIsFavorite(!isFavorite)}
                >
                  <FaHeart className={isFavorite ? "text-red-500" : "text-gray-600"} />
                </button>
                <button className="p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all transform hover:scale-110">
                  <FaShare className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Key Features */}
              <div className="bg-white p-8 border border-gray-200">
                <h2 className="text-2xl font-light text-gray-900 mb-6 pb-4 border-b border-gray-200">
                  Property Features
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gray-100 mr-4">
                      <FaHome className="text-xl text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Property Type</p>
                      <p className="font-medium text-gray-900">{annonce.category.nom}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gray-100 mr-4">
                      <FaRulerCombined className="text-xl text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Area</p>
                      <p className="font-medium text-gray-900">{annonce.superficie} m²</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gray-100 mr-4">
                      <FaBed className="text-xl text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Bedrooms</p>
                      <p className="font-medium text-gray-900">{annonce.salles.find(s => s.type === 'chambre')?.nombre || 0}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gray-100 mr-4">
                      <FaBath className="text-xl text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Bathrooms</p>
                      <p className="font-medium text-gray-900">{annonce.salles.find(s => s.type === 'salle de bain')?.nombre || 0}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gray-100 mr-4">
                      <FaUtensils className="text-xl text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Kitchens</p>
                      <p className="font-medium text-gray-900">{annonce.salles.find(s => s.type === 'cuisine')?.nombre || 0}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gray-100 mr-4">
                      <FaCouch className="text-xl text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Living Rooms</p>
                      <p className="font-medium text-gray-900">{annonce.salles.find(s => s.type === 'salon')?.nombre || 0}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white p-8 border border-gray-200">
                <h2 className="text-2xl font-light text-gray-900 mb-6 pb-4 border-b border-gray-200">
                  Property Description
                </h2>
                <div className="text-gray-600">
                  {annonce.description.split('\n').map((paragraph, i) => (
                      <p key={i} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              {annonce.tags && annonce.tags.length > 0 && (
                  <div className="bg-white p-8 border border-gray-200">
                    <h2 className="text-2xl font-light text-gray-900 mb-6 pb-4 border-b border-gray-200">
                      Amenities
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {annonce.tags.slice(0, showAllAmenities ? annonce.tags.length : 6).map((tag, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                              <FaStar className="text-xs text-gray-600" />
                            </div>
                            <span className="text-gray-900">{tag.nom}</span>
                          </div>
                      ))}
                    </div>
                    {annonce.tags.length > 6 && (
                        <button
                            onClick={() => setShowAllAmenities(!showAllAmenities)}
                            className="mt-4 text-gray-600 hover:text-gray-900 font-medium text-sm"
                        >
                          {showAllAmenities ? 'Show Less' : `Show All (${annonce.tags.length})`}
                        </button>
                    )}
                  </div>
              )}

              {/* Map */}
              <div className="bg-white p-8 border border-gray-200">
                <h2 className="text-2xl font-light text-gray-900 mb-6 pb-4 border-b border-gray-200">
                  Location
                </h2>
                <div className="h-96 overflow-hidden mb-6 border border-gray-200">
                  <AnnonceMap lat={annonce.latitude} lng={annonce.longitude} />
                </div>
                <div className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="mr-3 text-gray-500 text-xl" />
                  <span className="text-lg font-medium">{annonce.quartier.nom}</span>
                </div>
              </div>
            </div>

            {/* Right Column - Owner & Contact */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-white p-8 sticky top-6 border border-gray-200">
                <h2 className="text-2xl font-light text-gray-900 mb-6 pb-4 border-b border-gray-200">
                  Contact Agent
                </h2>

                <div className="flex items-center mb-8">
                  <img
                      src={annonce.proprietaire.profile_image || `https://ui-avatars.com/api/?name=${annonce.proprietaire.firstName}+${annonce.proprietaire.lastName}&background=random`}
                      alt={annonce.proprietaire.firstName}
                      className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-gray-200"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">
                      {annonce.proprietaire.firstName} {annonce.proprietaire.lastName}
                    </h3>
                    <p className="text-gray-600">Property Owner</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <a
                      href={`tel:${annonce.telephone}`}
                      className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors group"
                  >
                    <div className="p-3 bg-gray-100 mr-4 group-hover:bg-gray-200 transition-colors">
                      <FaPhone className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium text-gray-900">{annonce.telephone}</p>
                    </div>
                  </a>

                  <a
                      href={`mailto:${annonce.email}`}
                      className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors group"
                  >
                    <div className="p-3 bg-gray-100 mr-4 group-hover:bg-gray-200 transition-colors">
                      <FaEnvelope className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">{annonce.email}</p>
                    </div>
                  </a>
                </div>
                {user?.id !== annonce.proprietaire_id ? (
                    <>
                      <button
                          onClick={() => setShowVisitForm(true)}
                          className="w-full bg-black text-white font-medium py-4 px-6 hover:bg-gray-800 transition-colors mb-8 flex items-center justify-center gap-3"
                      >
                        <FaCalendarAlt />
                        <span>Schedule a Visit</span>
                      </button>

                      <div className="border-t border-gray-200 pt-8">
                        <h3 className="font-medium text-gray-900 mb-6 text-lg">Send a Message</h3>
                        <form className="space-y-4">
                          <div>
                        <textarea
                            rows="4"
                            placeholder="Your Message"
                            className="w-full px-4 py-3 border border-gray-300 focus:border-black"
                        ></textarea>
                          </div>
                          <button
                              type="submit"
                              className="w-full bg-black text-white font-medium py-4 px-6 hover:bg-gray-800 transition-colors"
                          >
                            Send Message
                          </button>
                        </form>
                      </div>
                    </>
                ):(<></>)}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
  );
}