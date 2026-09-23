import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Car, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0C] text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mx-auto">
          <Car className="w-10 h-10" />
        </div>

        <div className="space-y-2 max-w-md mx-auto">
          <h1 className="text-4xl font-black text-white">404 - Page Not Found</h1>
          <p className="text-xs text-slate-400">
            The vehicle or page you are looking for does not exist or has been moved.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link to="/" className="gold-button px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2">
            <Home className="w-4 h-4" />
            <span>GO TO HOMEPAGE</span>
          </Link>

          <Link to="/cars" className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 hover:bg-white/10">
            VIEW AVAILABLE CARS
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
