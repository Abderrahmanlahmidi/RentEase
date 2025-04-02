import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Error from "./pages/error/error";
import {createContext} from "react";
import { useTranslation } from "react-i18next";
import Login from "./pages/authentication/login";
import Register from "./pages/authentication/register";
import {UserProvider} from "./context/userContext";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import HomeDashboard from "./pages/dashboard/dashboardChildrens/homeDashboard.jsx";
import UsersDashboard from "./pages/dashboard/dashboardChildrens/usersDashboard.jsx";
import Unauthorized from "./pages/error/unauthorized.jsx";
import ProtectedDashboard from "./components/ProtectedDashboard.jsx";
import ProtectedProfile from "./components/ProtectedProfile.jsx";
import Profile from "./pages/Profile.jsx";
import RolesDashboard from "./pages/dashboard/dashboardChildrens/roleDashboard.jsx";
import CategoriesDashboard from "./pages/dashboard/dashboardChildrens/categoriesDashboard.jsx";
import CreateAnnonce from "./pages/createAnnonce.jsx";
import SalleDashboard from "./pages/dashboard/dashboardChildrens/salleDashboard.jsx";
import TagsDashboard from "./pages/dashboard/dashboardChildrens/tagDashboard.jsx";


export const informationContext = createContext();

const App = () => {

  const { t, i18n } = useTranslation();

  const contextInformation = {
    t: t,
    i18n: i18n,
  };


  const user = JSON.parse(localStorage.getItem("user"));

  const role = user?.role.name || "";



  return (
      <UserProvider>
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

              <Route element={<ProtectedDashboard role={role} allowedRole="Admin" />}  >
                <Route path="/dashboard" element={<Dashboard />}>
                  <Route index element={<HomeDashboard />} />
                  <Route path="users" element={<UsersDashboard />} />
                  <Route path="roles" element={<RolesDashboard />} />
                  <Route path="categories" element={<CategoriesDashboard />} />
                  <Route path="salles" element={<SalleDashboard />} />
                  <Route path="tags" element={<TagsDashboard />} />
                </Route>
              </Route>

              <Route element={<ProtectedProfile user={user} />} >
                 <Route path='/Profile' element={<Profile />} />
                 <Route path='/createAnnonce' element={<CreateAnnonce/>} />
              </Route>

              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </Router>
        </informationContext.Provider>
      </UserProvider>
  );
};

export default App;
