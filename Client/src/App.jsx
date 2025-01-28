import Navbar from "./sections/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Error from "./pages/error/error";
import { createContext } from "react";
import { useTranslation } from "react-i18next";
import Login from "./pages/authentication/login";
import Register from "./pages/authentication/register";


export const informationContext = createContext();

const App = () => {
  const { t, i18n } = useTranslation();

  const contextInformation = {
    t: t,
    i18n: i18n,
  };

  return (
    <informationContext.Provider value={contextInformation}>
      
        {/* <Navbar /> */}
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Properties" element={<Properties />} />
            <Route path="/About" element={<About />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/*" element={<Error />} />
          </Routes>
        </Router>
      
    </informationContext.Provider>
  );
};

export default App;
