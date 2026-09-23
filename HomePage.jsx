import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Car, 
  ShieldCheck, 
  Tag, 
  Clock, 
  Phone, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle,
  Key,
  Truck,
  MapPin,
  Sparkles
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroCarousel from '../components/HeroCarousel';
import SearchFilters from '../components/SearchFilters';
import VehicleCard from '../components/VehicleCard';
import EnquiryModal from '../components/EnquiryModal';
import Toast from '../components/Toast';
import api from '../services/api';
import { useLanguage } from '../context/LanguageContext';

const HomePage = () => {
  const { t } = useLanguage();
  const [vehicles, setVehicles] = useState([]);
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: '',
    brand: '',
    fuelType: '',
    transmission: '',
    minPrice: '',
    maxPrice: '',
    bodyType: ''
  });

  const [selectedVehicleForEnquiry, setSelectedVehicleForEnquiry] = useState(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const phone = '8552085279';
  const whatsapp = '9764706002';
  const contactPerson = 'Yogesh Ghongade';

  useEffect(() => {
    fetchVehicles();
  }, [filters]);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.brand) params.append('brand', filters.brand);
      if (filters.fuelType) params.append('fuelType', filters.fuelType);
      if (filters.transmission) params.append('transmission', filters.transmission);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.bodyType) params.append('bodyType', filters.bodyType);

      const res = await api.get(`/vehicles?${params.toString()}`);
      if (res.data.success) {
        const all = res.data.data;
        setVehicles(all);
        setRecentlyAdded(all.slice(0, 4));
      }
    } catch (err) {
      console.error('Failed to fetch homepage vehicles', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      brand: '',
      fuelType: '',
      transmission: '',
      minPrice: '',
      maxPrice: '',
      bodyType: ''
    });
  };

  const handleEnquiry = (vehicle) => {
    setSelectedVehicleForEnquiry(vehicle);
    setEnquiryModalOpen(true);
  };

  const popularFilters = [
    { label: 'SUVs', filter: { bodyType: 'SUV' } },
    { label: 'Sedans', filter: { bodyType: 'Sedan' } },
    { label: 'Hatchbacks', filter: { bodyType: 'Hatchback' } },
    { label: 'Diesel Cars', filter: { fuelType: 'Diesel' } },
    { label: 'Petrol Cars', filter: { fuelType: 'Petrol' } },
    { label: 'Automatic Cars', filter: { transmission: 'Automatic' } },
    { label: 'Under ₹5 Lakhs', filter: { maxPrice: '500000' } },
    { label: '₹5 - ₹10 Lakhs', filter: { minPrice: '500000', maxPrice: '1000000' } }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-slate-100 flex flex-col justify-between">
      <div>
        <Navbar />
        
        {/* 1. HERO SECTION */}
        <HeroCarousel />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
          
          {/* 2. SEARCH & FILTERS */}
          <section>
            <SearchFilters
              filters={filters}
              setFilters={setFilters}
              onReset={handleResetFilters}
              totalResults={vehicles.length}
            />
          </section>

          {/* 3. RECENTLY ADDED VEHICLES */}
          {recentlyAdded.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-gold-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-gold-500" />
                    <span>FRESH INVENTORY</span>
                  </div>
                  <h2 className="text-2xl font-black text-white">{t('sec.recentlyAdded')}</h2>
                </div>
                <Link to="/cars" className="text-xs font-bold text-gold-400 hover:text-gold-300 flex items-center gap-1">
                  <span>{t('sec.viewAll')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recentlyAdded.map(vehicle => (
                  <VehicleCard
                    key={vehicle._id}
                    vehicle={vehicle}
                    onEnquire={handleEnquiry}
                  />
                ))}
              </div>
            </section>
          )}

          {/* 4. AVAILABLE STOCK GRID */}
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-dark-border pb-4">
              <div>
                <h2 className="text-2xl font-black text-white">{t('sec.availableStock')}</h2>
                <p className="text-xs text-slate-400">Explore certified pre-owned vehicles with complete service records</p>
              </div>
              <span className="text-xs font-bold text-slate-400 bg-[#121216] px-3 py-1.5 rounded-full border border-dark-border">
                {vehicles.length} Vehicles
              </span>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-80 rounded-2xl bg-[#121216] animate-pulse border border-dark-border"></div>
                ))}
              </div>
            ) : vehicles.length === 0 ? (
              <div className="text-center py-16 bg-[#121216] border border-dark-border rounded-2xl space-y-4">
                <Car className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-white">{t('msg.noResults')}</h3>
                <button
                  onClick={handleResetFilters}
                  className="gold-button px-5 py-2.5 rounded-xl text-xs font-bold"
                >
                  RESET FILTERS
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {vehicles.map(vehicle => (
                  <VehicleCard
                    key={vehicle._id}
                    vehicle={vehicle}
                    onEnquire={handleEnquiry}
                  />
                ))}
              </div>
            )}
          </section>

          {/* 5. POPULAR FILTERS */}
          <section className="bg-[#121216] border border-dark-border rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-gold-500 tracking-wider uppercase">{t('sec.popularFilters')}</h3>
            <div className="flex flex-wrap gap-2.5">
              {popularFilters.map((pop, idx) => (
                <button
                  key={idx}
                  onClick={() => setFilters(prev => ({ ...prev, ...pop.filter }))}
                  className="px-4 py-2 rounded-xl bg-[#0A0A0C] border border-dark-border text-xs font-semibold text-slate-300 hover:border-gold-500/50 hover:text-white transition-all"
                >
                  {pop.label}
                </button>
              ))}
            </div>
          </section>

          {/* 6. WHY CHOOSE US */}
          <section className="space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-3xl font-black text-white">{t('sec.whyChoose')}</h2>
              <p className="text-xs text-slate-400">Shital Motors delivers unmatched trust, certified vehicles, and 100% transparent deals.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#121216] border border-dark-border rounded-2xl p-6 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Quality Checked Vehicles</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every car undergoes rigorous multi-point inspection, engine diagnostics, and document verification before listing.
                </p>
              </div>

              <div className="bg-[#121216] border border-dark-border rounded-2xl p-6 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                  <Tag className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Transparent Best Pricing</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Zero hidden charges. Clear valuation based on fair market value, model year, and actual vehicle condition.
                </p>
              </div>

              <div className="bg-[#121216] border border-dark-border rounded-2xl p-6 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">24/7 Car Rental Support</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Reliable AC & Non-AC rental cars for local trips, outstation journeys, and airport pickup & drop services.
                </p>
              </div>
            </div>
          </section>

          {/* 7. SERVICES SUMMARY */}
          <section className="bg-gradient-to-br from-[#121216] to-[#0A0A0C] border border-dark-border rounded-2xl p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-gold-500 uppercase tracking-wider">COMPLETE AUTOMOTIVE SOLUTION</span>
                <h2 className="text-2xl font-black text-white">{t('sec.ourServices')}</h2>
              </div>
              <Link to="/services" className="gold-button px-5 py-2.5 rounded-xl text-xs font-bold self-start md:self-auto">
                EXPLORE ALL SERVICES
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
              <div className="p-4 rounded-xl bg-[#0A0A0C] border border-dark-border space-y-2">
                <Car className="w-6 h-6 text-gold-500 mx-auto" />
                <div className="text-xs font-bold text-white">Used Car Buying</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0A0A0C] border border-dark-border space-y-2">
                <Key className="w-6 h-6 text-gold-500 mx-auto" />
                <div className="text-xs font-bold text-white">Used Car Selling</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0A0A0C] border border-dark-border space-y-2">
                <Truck className="w-6 h-6 text-gold-500 mx-auto" />
                <div className="text-xs font-bold text-white">Car Rental</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0A0A0C] border border-dark-border space-y-2">
                <MapPin className="w-6 h-6 text-gold-500 mx-auto" />
                <div className="text-xs font-bold text-white">Local Rental</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0A0A0C] border border-dark-border space-y-2">
                <Truck className="w-6 h-6 text-gold-500 mx-auto" />
                <div className="text-xs font-bold text-white">Outstation Rental</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0A0A0C] border border-dark-border space-y-2">
                <Clock className="w-6 h-6 text-gold-500 mx-auto" />
                <div className="text-xs font-bold text-white">Airport Pickup</div>
              </div>
            </div>
          </section>

          {/* 8. CAR RENTAL SERVICES */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-gold-500 uppercase tracking-wider">RENTAL SERVICES</span>
                <h2 className="text-2xl font-black text-white">{t('sec.rentalServices')}</h2>
              </div>
              <Link to="/rental" className="text-xs font-bold text-gold-400 hover:text-gold-300 flex items-center gap-1">
                <span>View Rental Details</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-[#121216] border border-dark-border rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-bold text-white">AC & Non-AC Cars</h3>
                <p className="text-xs text-slate-400">Clean, well-maintained hatchbacks, sedans, and SUVs available for daily and weekly rentals with driver options.</p>
                <Link to="/rental" className="text-xs font-bold text-gold-400 flex items-center gap-1">
                  <span>Enquire Rental</span> →
                </Link>
              </div>

              <div className="bg-[#121216] border border-dark-border rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-bold text-white">Airport Pickup & Drop</h3>
                <p className="text-xs text-slate-400">Punctual 24/7 airport transfer service. Driver arrives on time with clean vehicle for a stress-free travel experience.</p>
                <Link to="/rental" className="text-xs font-bold text-gold-400 flex items-center gap-1">
                  <span>Enquire Rental</span> →
                </Link>
              </div>

              <div className="bg-[#121216] border border-dark-border rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-bold text-white">Outstation Tours</h3>
                <p className="text-xs text-slate-400">Plan family trips across Maharashtra with reliable vehicles, experienced drivers, and transparent kilometer rates.</p>
                <Link to="/rental" className="text-xs font-bold text-gold-400 flex items-center gap-1">
                  <span>Enquire Rental</span> →
                </Link>
              </div>
            </div>
          </section>

          {/* 9. CONTACT CTA & DEALERSHIP DETAILS */}
          <section className="bg-gradient-to-r from-gold-500 to-gold-600 rounded-2xl p-8 text-black flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">LOOKING TO BUY OR SELL A CAR?</h2>
              <p className="text-sm font-medium text-black/80">
                Contact <span className="font-extrabold">{contactPerson}</span> today for the best value on your vehicle deal!
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`tel:${phone}`}
                className="bg-black text-white hover:bg-slate-900 px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg"
              >
                <Phone className="w-4 h-4 text-gold-400" />
                <span>Call {phone}</span>
              </a>

              <a
                href={`https://wa.me/91${whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp {whatsapp}</span>
              </a>
            </div>
          </section>

        </main>
      </div>

      {/* 10. FOOTER */}
      <Footer />

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        vehicle={selectedVehicleForEnquiry}
        onSuccess={(msg) => setToast({ message: msg, type: 'success' })}
      />

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </div>
  );
};

export default HomePage;
