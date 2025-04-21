import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext } from "react";
import { useTranslation } from "react-i18next";
import { UserProvider } from "./context/userContext";

// Public pages
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/authentication/login";
import Register from "./pages/authentication/register";
import Error from "./pages/error/error";
import Unauthorized from "./pages/error/unauthorized";
import AnnonceDetails from "./components/Annonces/annonceDetails";

// Protected pages
import Profile from "./pages/Profile";
import ProtectedDashboard from "./components/ProtectedDashboard";
import ProtectedProfile from "./components/ProtectedProfile";

// Dashboard components
import Dashboard from "./pages/dashboard/Dashboard";
import HomeDashboard from "./pages/dashboard/dashboardChildrens/homeDashboard";
import UsersDashboard from "./pages/dashboard/dashboardChildrens/usersDashboard";
import RolesDashboard from "./pages/dashboard/dashboardChildrens/roleDashboard";
import CategoriesDashboard from "./pages/dashboard/dashboardChildrens/categoriesDashboard";
import SalleDashboard from "./pages/dashboard/dashboardChildrens/salleDashboard";
import TagsDashboard from "./pages/dashboard/dashboardChildrens/tagDashboard";
import ReviewsDashboard from "./pages/dashboard/dashboardChildrens/reviewDashboard.jsx";

// Announcement components
import Annonces from "./sections/Annonces";
import MyAnnonces from "./components/Annonces/myAnnonces";
import CreateAnnonce from "./components/Annonces/createAnnonce";
import AnnoncesDashboard from "./pages/dashboard/dashboardChildrens/annoncesDashboard..jsx";
import AnnoncesVisits from "./components/Annonces/annoncesVisits.jsx";

// Reviews components
import UserReviews from "./components/userReviews.jsx";

export const informationContext = createContext();

const App = () => {
  const { t, i18n } = useTranslation();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role?.name || "";

  const contextInformation = { t, i18n };

  return (
    <UserProvider>
      <informationContext.Provider value={contextInformation}>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/properties/annonce/:annonceId" element={<AnnonceDetails />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected Dashboard Routes */}
            <Route element={<ProtectedDashboard role={role} allowedRole="Admin" />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<HomeDashboard />} />
                <Route path="users" element={<UsersDashboard />} />
                <Route path="roles" element={<RolesDashboard />} />
                <Route path="categories" element={<CategoriesDashboard />} />
                <Route path="salles" element={<SalleDashboard />} />
                <Route path="tags" element={<TagsDashboard />} />
                <Route path="reviews" element={<ReviewsDashboard />} />
                <Route path="annonces" element={<AnnoncesDashboard />} />
              </Route>
            </Route>

            {/* Protected User Routes */}
            <Route element={<ProtectedProfile user={user} />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/annonces" element={<Annonces />}>
                <Route index element={<MyAnnonces />} />
                <Route path="/annonces/createAnnonce" element={<CreateAnnonce />} />
              </Route>
              <Route path="/reviews" element={<UserReviews />} />
              <Route path="/visits" element={<AnnoncesVisits />} />
            </Route>

            {/* Catch-all Route */}
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </informationContext.Provider>
    </UserProvider>
  );
};

export default App;