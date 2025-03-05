import Navbar from "../sections/Navbar"
import Hero from "../sections/homeSections/Hero"
import SpecialOffers from "../sections/homeSections/specialOffers"
import Process from "../sections/homeSections/Process.jsx";
import Footer from "../sections/homeSections/Footer.jsx";
import Newsletter from "../sections/homeSections/Newsletter.jsx";

function Home() {
  return (
    <div className="flex flex-col w-full" >
        <Navbar/>
        <Hero/>
        <SpecialOffers/>
        <Process/>
        <Newsletter/>
        <Footer/>
    </div>
  )
}

export default Home