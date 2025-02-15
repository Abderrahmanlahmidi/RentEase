import { useState, useEffect } from "react";
import { motion } from "framer-motion";



const ImageCarousel =  ({ images }) =>  {
    const [index, setIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }, [images.length]);
  
    return (
      <div className="relative w-full h-60 overflow-hidden">
        {images.map((img, i) => (
          <motion.img
            key={i}
            src={img}
            alt="Offer Image"
            className="absolute w-full h-60 object-cover rounded-t-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
        ))}
      </div>
    );
  }

export default ImageCarousel;