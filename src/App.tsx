import React from "react";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage'
import { Routes, Route } from "react-router-dom";
import FillExample from './components/layout/MainNavbar';
import LandingPage from "./pages/Landing/LandingPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import GalleryPage from "./pages/Gallery/GalleryPage";
import ProfilPage from "./pages/Settings/SettingsPage";
import Footer from "./components/layout/Footer";
import ResetPassword from "./pages/Auth/ResetPassword";
import NotFoundPage from "./pages/NotFoundPage";


export const App: React.FC = () => {
  return (
     <div className="d-flex flex-column min-vh-100">
       {/* ✅ Barre de navigation globale */}
       <FillExample/>

       {/* ✅ Contenu principal */}
       <main className="flex-fill">
         <Routes>
           {/* Pages publiques */}
           <Route path="/" element={<LandingPage />} />
           <Route path="/login" element={<LoginPage />} />
           <Route path="/signup" element={<SignupPage />} />
           <Route path="/forgot-password" element={<ForgotPasswordPage />} />
           <Route path="/reset-password" element={<ResetPassword/>}/>
            
          {/* Pages protégées */} 
           
           <Route path="/dashboard" element={<DashboardPage />} />
           <Route path="/gallery" element={<GalleryPage />} />
           <Route path="/profil" element={<ProfilPage />} />
          
          {/* Page 404 */} 
           <Route path="*" element={<NotFoundPage />} />
         </Routes>
       </main>

       {/* ✅ Pied de page global */}
       <Footer />
     </div>
  );
};

export default App; 



