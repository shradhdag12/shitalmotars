import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VehicleCard from '../components/VehicleCard';
import EnquiryModal from '../components/EnquiryModal';
import Toast from '../components/Toast';
import api from '../services/api';
import { useWishlist } from '../context/WishlistContext';
import { useLanguage } from '../context/LanguageContext';
import { Heart, Trash2, Car, ArrowRight } from 'lucide-react';

const WishlistPage = () => {
  const { t } = useLanguage();
  const { wishlistIds, clearWishlist } = useWishlist();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedVehicleForEnquiry, setSelectedVehicleForEnquiry] = useState(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  useEffect(() => {
    fetchWishlistVehicles();
  }, [wishlistIds]);

  const fetchWishlistVehicles = async () => {
    if (wishlistIds.length === 0) {
      setVehicles([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await api.get('/vehicles');
      if (res.data.success) {
        const saved = res.data.data.filter(v => wishlistIds.includes(v._id));
        setVehicles(saved);
      }
    } catch (err) {
      console.error('Wishlist error', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnquiry = (vehicle) => {
    setSelectedVehicleForEnquiry(vehicle);
    setEnquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-slate-100 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Header */}
        <div className="bg-[#121216] border-b border-dark-border py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-gold-500 uppercase tracking-widest">SAVED FAVOURITES</div>
              <h1 className="text-3xl font-black text-white">{t('wishlist.title')}</h1>
            </div>
            {vehicles.length > 0 && (
              <button
                onClick={clearWishlist}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-bold hover:bg-rose-900/60 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>CLEAR WISHLIST</span>
              </button>
            )}
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-80 rounded-2xl bg-[#121216] animate-pulse border border-dark-border"></div>
              ))}
            </div>
          ) : vehicles.length === 0 ? (
            /* Friendly Empty State */
            <div className="text-center py-20 bg-[#121216] border border-dark-border rounded-2xl max-w-2xl mx-auto space-y-5 p-8 shadow-xl">
              <div className="w-16 h-16 rounded-full bg-rose-950/60 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto">
                <Heart className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">{t('wishlist.empty')}</h3>
                <p className="text-xs text-slate-400">
                  Save your favourite pre-owned vehicles to easily compare specifications, prices, and contact our sales team.
                </p>
              </div>
              <Link
                to="/cars"
                className="gold-button px-6 py-3.5 rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-lg shadow-gold-500/20"
              >
                <Car className="w-4 h-4" />
                <span>{t('wishlist.browseBtn')}</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map(vehicle => (
                <VehicleCard
                  key={vehicle._id}
                  vehicle={vehicle}
                  onEnquire={handleEnquiry}
                />
              ))}
            </div>
          )}

        </main>
      </div>

      <Footer />

      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        vehicle={selectedVehicleForEnquiry}
        onSuccess={(msg) => setToast({ message: msg, type: 'success' })}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </div>
  );
};

export default WishlistPage;
