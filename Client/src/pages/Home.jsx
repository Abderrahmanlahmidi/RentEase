import Navbar from "../sections/Navbar"
import Hero from "../sections/homeSections/Hero"
import SpecialOffers from "../sections/homeSections/specialOffers"
import Process from "../sections/homeSections/Process.jsx";
import Footer from "../sections/homeSections/Footer.jsx";
import Newsletter from "../sections/homeSections/Newsletter.jsx";
import Reviews from "../sections/homeSections/Reviews.jsx";
import Advertisements from "../sections/homeSections/Advertisement.jsx";
import Exclusive from "../sections/homeSections/Exclusive.jsx";


function Home() {
  return (
    <div className="flex flex-col w-full" >
        <Navbar/>
        <Hero/>
        <SpecialOffers/>
        <Advertisements/>
        <Exclusive/>
        <Process/>
        <Reviews/>
        <Newsletter/>
        <Footer/>
    </div>
  )
}

export default Home