import Navbar from "../sections/Navbar"
import Hero from "../sections/homeSections/Hero"
import SpecialOffers from "../sections/homeSections/specialOffers"

function Home() {
  return (
    <div className="flex flex-col w-full" >
        <Navbar/>
        <Hero/>
        <SpecialOffers/>
    </div>
  )
}

export default Home