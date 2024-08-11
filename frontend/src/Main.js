import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home';
import Men from './pages/men';
import Navbar from './pages/navbar';
import Women from './pages/women';
import Footer from './pages/Footer';
import Contact from './pages/contact';
import Rabat from './pages/Rabat';
import Marseille from './pages/MARSEILLE';
import Services from './pages/Services';
import Nosmannequins from './pages/Nosmannequins';
import ModelForm from './pages/postuler';
import LoadingSpinner from './pages/LoadingSpinner';
import WomenDetails from './pages/WomenDetails';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import ImageTable from './pages/admin/dashboard';
import Add from './pages/admin/add';
import ModelsPage from './pages/admin/apply';
import AdminNavbar from './pages/admin/AdminNavbar';
import ProtectedRoute from './pages/Components/ProtectedRoute';
import ResetPassword from './pages/auth/ResetPassword';
import ForgotPassword from './pages/auth/ForgotPassword';

const Main = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div>
      {isAdminRoute ? <AdminNavbar /> : <Navbar />}
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/rabat" element={<Rabat />} />
        <Route path="/marseille" element={<Marseille />} />
        <Route path="/services" element={<Services />} />
        <Route path="/nosmannequins" element={<Nosmannequins />} />
        <Route path="/model" element={<ModelForm />} />
        <Route path="/details/:id" element={<WomenDetails />} />
        <Route path="/tt" element={<LoadingSpinner />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resetPassword/:resetToken" element={<ResetPassword />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<ImageTable />} />
          <Route path="/admin/ajouter" element={<Add />} />
          <Route path="/admin/candidats" element={<ModelsPage />} />
        </Route>
      </Routes>
      {isAdminRoute ? <null /> :  <Footer />}

     
    </div>
  );
};

export default Main;
