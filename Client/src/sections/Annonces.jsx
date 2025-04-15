import HeroAnnonces from "../components/Annonces/heroAnnonces.jsx";
import {Outlet} from "react-router-dom";

export default function Annonces() {
    return(
        <div className="min-h-screen bg-gray-50">
            <HeroAnnonces/>
            <Outlet/>
       </div>
    )
}