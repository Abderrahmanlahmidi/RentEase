import { useContext, useRef, useEffect } from "react";
import { informationContext } from "../../App";
import { motion } from "framer-motion";
import {NavLink} from "react-router-dom";

export default function Hero() {
  const { t } = useContext(informationContext);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay prevented:", error);
      });
    }
  }, []);

  return (
      <div className="relative mt-[62px] w-full min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute z-0 w-full h-full object-cover"
        >
          <source src="https://videos.pexels.com/video-files/31389013/13393907_1920_1080_25fps.mp4" type="video/mp4" />
          {/* Fallback image if video doesn't load */}
          <img
              src="https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover"
          />
        </video>

        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/40 z-1"></div>

        <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-100">
              {t('hero.description')}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <NavLink
                  to="/properties"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all focus:ring-4 focus:ring-blue-300 focus:outline-none shadow-lg"
              >
                Browse Properties
              </NavLink>
              <NavLink
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-gray-900 bg-white hover:bg-gray-100 rounded-lg transition-all focus:ring-4 focus:ring-gray-100 focus:outline-none shadow-lg"
              >
                Contact Us
              </NavLink>
            </div>
          </motion.div>
        </div>
      </div>
  );
}