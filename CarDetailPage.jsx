import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VehicleGallery from '../components/VehicleGallery';
import EnquiryModal from '../components/EnquiryModal';
import Toast from '../components/Toast';
import api from '../services/api';
import { formatCurrency, formatNumber } from '../utils/formatters';
import { useWishlist } from '../context/WishlistContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  Heart, 
  Phone, 
  MessageSquare, 
  Send, 
  Calendar, 
  Gauge, 
  Fuel, 
  SlidersHorizontal, 
  UserCheck, 
  ShieldCheck, 
  CheckCircle,
  ArrowLeft
} from 'lucide-react';

const CarDetailPage = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const phone = '8552085279';
  const whatsapp = '9764706002';

  useEffect(() => {
    fetchVehicleDetail();
  }, [id]);

  const fetchVehicleDetail = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/vehicles/${id}`);
      if (res.data.success) {
        setVehicle(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load vehicle details', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0C] text-slate-100 flex flex-col justify-between">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
          <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-semibold text-slate-400">Loading vehicle specifications...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-[#0A0A0C] text-slate-100 flex flex-col justify-between">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Vehicle Not Found</h2>
          <p className="text-xs text-slate-400">The requested car may have been sold or removed from inventory.</p>
          <Link to="/cars" className="gold-button px-6 py-3 rounded-xl text-xs font-bold inline-block">
            BROWSE AVAILABLE CARS
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isFavorite = isInWishlist(vehicle._id);
  const isAvailable = vehicle.status === 'AVAILABLE';
  const whatsappMessage = `Hello Shital Motors, I am interested in the ${vehicle.brand} ${vehicle.model} ${vehicle.variant || ''} (${vehicle.modelYear}), priced at ${formatCurrency(vehicle.price)}. Please share more details.`;

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-slate-100 flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          
          {/* Breadcrumb / Back Link */}
          <div className="flex items-center justify-between">
            <Link to="/cars" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-gold-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Stock List</span>
            </Link>

            <span className={`px-3 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase border ${
              isAvailable 
                ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50' 
                : 'bg-rose-950/90 text-rose-300 border-rose-500/50'
            }`}>
              {isAvailable ? 'AVAILABLE FOR SALE' : 'VEHICLE SOLD'}
            </span>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: GALLERY (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <VehicleGallery images={vehicle.images} />

              {/* Vehicle Description */}
              <div className="bg-[#121216] border border-dark-border rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-bold text-white border-b border-dark-border pb-3">Vehicle Overview & Description</h3>
                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {vehicle.description || 'Clean pre-owned vehicle inspected by Shital Motors specialists. Excellent condition, accident-free, fully documented.'}
                </p>
              </div>

              {/* Key Features */}
              {vehicle.features && vehicle.features.length > 0 && (
                <div className="bg-[#121216] border border-dark-border rounded-2xl p-6 space-y-4">
                  <h3 className="text-lg font-bold text-white border-b border-dark-border pb-3">Key Features & Options</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-200">
                    {vehicle.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-gold-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: SPECS & CTAS (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Main Info Card */}
              <div className="bg-[#121216] border border-dark-border rounded-2xl p-6 space-y-6 shadow-xl">
                <div>
                  <span className="text-xs font-extrabold text-gold-500 uppercase tracking-widest">{vehicle.brand}</span>
                  <h1 className="text-2xl font-black text-white">{vehicle.model}</h1>
                  <p className="text-sm font-semibold text-slate-400">{vehicle.variant}</p>
                </div>

                {/* Price Display */}
                <div className="bg-[#0A0A0C] p-4 rounded-xl border border-dark-border flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400 font-semibold">Dealership Price</div>
                    <div className="text-3xl font-black text-white tracking-tight">{formatCurrency(vehicle.price)}</div>
                  </div>
                  {vehicle.isNegotiable && (
                    <span className="px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/30 text-xs font-bold">
                      Price Negotiable
                    </span>
                  )}
                </div>

                {/* Specs Table Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#0A0A0C] border border-dark-border space-y-1">
                    <span className="text-slate-400 font-medium">Model Year</span>
                    <div className="font-bold text-white text-sm flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-gold-500" />
                      <span>{vehicle.modelYear}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0A0A0C] border border-dark-border space-y-1">
                    <span className="text-slate-400 font-medium">Registration Year</span>
                    <div className="font-bold text-white text-sm flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-gold-500" />
                      <span>{vehicle.registrationYear || vehicle.modelYear}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0A0A0C] border border-dark-border space-y-1">
                    <span className="text-slate-400 font-medium">KM Driven</span>
                    <div className="font-bold text-white text-sm flex items-center gap-1.5">
                      <Gauge className="w-4 h-4 text-gold-500" />
                      <span>{formatNumber(vehicle.kmDriven)} KM</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0A0A0C] border border-dark-border space-y-1">
                    <span className="text-slate-400 font-medium">Fuel Type</span>
                    <div className="font-bold text-white text-sm flex items-center gap-1.5">
                      <Fuel className="w-4 h-4 text-gold-500" />
                      <span>{vehicle.fuelType}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0A0A0C] border border-dark-border space-y-1">
                    <span className="text-slate-400 font-medium">Transmission</span>
                    <div className="font-bold text-white text-sm flex items-center gap-1.5">
                      <SlidersHorizontal className="w-4 h-4 text-gold-500" />
                      <span>{vehicle.transmission}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0A0A0C] border border-dark-border space-y-1">
                    <span className="text-slate-400 font-medium">Ownership</span>
                    <div className="font-bold text-white text-sm flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-gold-500" />
                      <span>{vehicle.ownerNumber}</span>
                    </div>
                  </div>
                </div>

                {/* Primary Contact Action Buttons */}
                <div className="space-y-3 pt-2">
                  <a
                    href={`https://wa.me/91${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>CHAT ON WHATSAPP ({whatsapp})</span>
                  </a>

                  <a
                    href={`tel:${phone}`}
                    className="w-full py-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 font-bold text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    <span>CALL DEALERSHIP NOW ({phone})</span>
                  </a>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setEnquiryModalOpen(true)}
                      className="gold-button py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>SEND ENQUIRY</span>
                    </button>

                    <button
                      onClick={() => {
                        toggleWishlist(vehicle._id);
                        setToast({
                          message: isFavorite ? 'Removed from wishlist' : 'Saved to wishlist!',
                          type: 'success'
                        });
                      }}
                      className={`py-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                        isFavorite 
                          ? 'bg-rose-950/80 border-rose-500/50 text-rose-300' 
                          : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-400 text-rose-400' : ''}`} />
                      <span>{isFavorite ? 'SAVED' : 'ADD WISHLIST'}</span>
                    </button>
                  </div>
                </div>

                {/* Assurance Box */}
                <div className="p-4 rounded-xl bg-[#0A0A0C] border border-dark-border text-xs text-slate-400 space-y-2">
                  <div className="flex items-center gap-2 text-gold-400 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>SHITAL MOTORS ASSURANCE</span>
                  </div>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>100% Non-accidental verification guarantee</li>
                    <li>Verified RC & insurance documentation</li>
                    <li>Instant vehicle evaluation for buy/exchange</li>
                  </ul>
                </div>

              </div>

            </div>

          </div>

        </main>
      </div>

      <Footer />

      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        vehicle={vehicle}
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

export default CarDetailPage;
