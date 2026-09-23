import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import HomePage from './pages/HomePage';
import CarsPage from './pages/CarsPage';
import CarDetailPage from './pages/CarDetailPage';
import RentalPage from './pages/RentalPage';
import ServicesPage from './pages/ServicesPage';
import WishlistPage from './pages/WishlistPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';

import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminVehiclesPage from './pages/AdminVehiclesPage';
import AdminVehicleFormPage from './pages/AdminVehicleFormPage';
import AdminEnquiriesPage from './pages/AdminEnquiriesPage';
import AdminSettingsPage from './pages/AdminSettingsPage';

import NotFoundPage from './pages/NotFoundPage';

// Protected Route Wrapper for Admin Pages
const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0C] flex items-center justify-center text-gold-500 font-bold">
        Verifying admin authorization...
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <WishlistProvider>
          <AuthProvider>
            <Router>
              <Routes>
                {/* Customer Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/cars" element={<CarsPage />} />
                <Route path="/cars/:id" element={<CarDetailPage />} />
                <Route path="/rental" element={<RentalPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutPage />} />

                {/* Admin Auth Route */}
                <Route path="/admin/login" element={<AdminLoginPage />} />

                {/* Protected Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedAdminRoute>
                      <AdminDashboardPage />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/vehicles"
                  element={
                    <ProtectedAdminRoute>
                      <AdminVehiclesPage />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/vehicles/new"
                  element={
                    <ProtectedAdminRoute>
                      <AdminVehicleFormPage />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/vehicles/:id/edit"
                  element={
                    <ProtectedAdminRoute>
                      <AdminVehicleFormPage />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/enquiries"
                  element={
                    <ProtectedAdminRoute>
                      <AdminEnquiriesPage />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/settings"
                  element={
                    <ProtectedAdminRoute>
                      <AdminSettingsPage />
                    </ProtectedAdminRoute>
                  }
                />

                {/* 404 Fallback */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Router>
          </AuthProvider>
        </WishlistProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
