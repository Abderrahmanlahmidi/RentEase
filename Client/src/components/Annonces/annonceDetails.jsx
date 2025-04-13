import axios from 'axios';
import { useEffect, useState } from 'react';
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
  FaStar
} from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import AnnonceMap from './annonceMap.jsx';
import { motion } from 'framer-motion';

export default function AnnonceDetails() {
  const { annonceId } = useParams();
  const navigate = useNavigate();
  const [annonce, setAnnonce] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);

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

  if (loading) return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
  );

  if (error) return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Property</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
              onClick={() => navigate('/properties')}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-md"
          >
            Browse Properties
          </button>
        </div>
      </div>
  );

  if (!annonce) return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Property Not Found</h2>
          <p className="text-gray-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <button
              onClick={() => navigate('/properties')}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-md"
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
        {/* Back button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <button
              onClick={() => navigate(-1)}
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors group"
          >
            <FaChevronLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Back to results</span>
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Title and Price Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center flex-wrap gap-2 mb-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${annonce.transaction === 'location' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>
                {annonce.transaction === 'location' ? 'For Rent' : 'For Sale'}
              </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {annonce.category.nom}
              </span>
                <span className="text-sm text-gray-500">
                Listed {new Date(annonce.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{annonce.titre}</h1>
              <div className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="mr-2 text-blue-500" />
                <span className="font-medium">{annonce.quartier.nom}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-3xl font-bold text-blue-600">
                {annonce.prix.toLocaleString()} {annonce.transaction === 'location' ? '/mois' : ''}
              </div>
              {annonce.ancienPrix && (
                  <span className="text-lg line-through text-gray-400">
                {annonce.ancienPrix.toLocaleString()}
              </span>
              )}
            </div>
          </div>

          {/* Image Gallery */}
          <div className="relative mb-10 rounded-xl overflow-hidden shadow-sm">
            <div className="relative h-[500px] w-full">
              <img
                  src={annonce.images[activeImageIndex]?.url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'}
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

            {/* Thumbnail strip */}
            <div className="bg-white p-4 flex overflow-x-auto space-x-3 scrollbar-hide">
              {annonce.images.map((img, index) => (
                  <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden transition-all ${activeImageIndex === index ? 'ring-4 ring-blue-500' : 'opacity-70 hover:opacity-100'}`}
                  >
                    <img
                        src={img.url}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                  </button>
              ))}
            </div>
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Key Features */}
              <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">
                  Property Features
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-100 rounded-xl text-blue-600 flex-shrink-0">
                      <FaHome className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Property Type</p>
                      <p className="font-semibold text-gray-800">{annonce.category.nom}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-100 rounded-xl text-blue-600 flex-shrink-0">
                      <FaRulerCombined className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Area</p>
                      <p className="font-semibold text-gray-800">{annonce.superficie} m²</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-100 rounded-xl text-blue-600 flex-shrink-0">
                      <FaBed className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Bedrooms</p>
                      <p className="font-semibold text-gray-800">{annonce.salles.find(s => s.type === 'chambre')?.nombre || 0}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-100 rounded-xl text-blue-600 flex-shrink-0">
                      <FaBath className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Bathrooms</p>
                      <p className="font-semibold text-gray-800">{annonce.salles.find(s => s.type === 'salle de bain')?.nombre || 0}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-100 rounded-xl text-blue-600 flex-shrink-0">
                      <FaUtensils className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Kitchens</p>
                      <p className="font-semibold text-gray-800">{annonce.salles.find(s => s.type === 'cuisine')?.nombre || 0}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-100 rounded-xl text-blue-600 flex-shrink-0">
                      <FaCouch className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Living Rooms</p>
                      <p className="font-semibold text-gray-800">{annonce.salles.find(s => s.type === 'salon')?.nombre || 0}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">
                  Property Description
                </h2>
                <div className="prose max-w-none text-gray-600">
                  {annonce.description.split('\n').map((paragraph, i) => (
                      <p key={i} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              {annonce.tags && annonce.tags.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">
                      Amenities
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {annonce.tags.slice(0, showAllAmenities ? annonce.tags.length : 6).map((tag, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                              <FaStar className="text-blue-500 text-xs" />
                            </div>
                            <span className="text-gray-700">{tag.nom}</span>
                          </div>
                      ))}
                    </div>
                    {annonce.tags.length > 6 && (
                        <button
                            onClick={() => setShowAllAmenities(!showAllAmenities)}
                            className="mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                          {showAllAmenities ? 'Show Less' : `Show All (${annonce.tags.length})`}
                        </button>
                    )}
                  </div>
              )}

              {/* Map */}
              <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">
                  Location
                </h2>
                <div className="h-96 rounded-xl overflow-hidden mb-6 border border-gray-200">
                  <AnnonceMap lat={annonce.latitude} lng={annonce.longitude} />
                </div>
                <div className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="mr-3 text-blue-500 text-xl" />
                  <span className="text-lg font-medium">{annonce.quartier.nom}</span>
                </div>
              </div>
            </div>

            {/* Right Column - Owner & Contact */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-white rounded-xl shadow-lg p-8 sticky top-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">
                  Contact Agent
                </h2>

                <div className="flex items-center mb-8">
                  <img
                      src={annonce.proprietaire.profile_image || `https://ui-avatars.com/api/?name=${annonce.proprietaire.firstName}+${annonce.proprietaire.lastName}&background=random`}
                      alt={annonce.proprietaire.firstName}
                      className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-100"
                  />
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">
                      {annonce.proprietaire.firstName} {annonce.proprietaire.lastName}
                    </h3>
                    <p className="text-gray-500">Property Owner</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <a
                      href={`tel:${annonce.telephone}`}
                      className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
                  >
                    <div className="p-3 bg-blue-100 rounded-xl text-blue-600 mr-4 group-hover:bg-blue-200 transition-colors">
                      <FaPhone />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-semibold text-gray-800">{annonce.telephone}</p>
                    </div>
                  </a>

                  <a
                      href={`mailto:${annonce.email}`}
                      className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
                  >
                    <div className="p-3 bg-blue-100 rounded-xl text-blue-600 mr-4 group-hover:bg-blue-200 transition-colors">
                      <FaEnvelope />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-semibold text-gray-800">{annonce.email}</p>
                    </div>
                  </a>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition duration-200 mb-8 shadow-md flex items-center justify-center gap-3">
                  <FaCalendarAlt />
                  <span>Schedule a Visit</span>
                </button>

                <div className="border-t border-gray-100 pt-8">
                  <h3 className="font-semibold text-gray-800 mb-6 text-lg">Send a Message</h3>
                  <form className="space-y-4">
                    <div>
                      <input
                          type="text"
                          placeholder="Your Name"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                    <div>
                      <input
                          type="email"
                          placeholder="Your Email"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                    <div>
                      <input
                          type="tel"
                          placeholder="Phone Number"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                    <div>
                    <textarea
                        rows="4"
                        placeholder="Your Message"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-4 px-6 rounded-xl transition duration-200 shadow-md"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
  );
}