import Navbar from "../sections/Navbar"
import Hero from "../sections/homeSections/Hero"

function Home() {
  return (
    <div className="flex flex-col w-full" >
        <Navbar/>
        <Hero/>
    </div>
  )
}

export default Home