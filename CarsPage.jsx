import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VehicleCard from '../components/VehicleCard';
import SearchFilters from '../components/SearchFilters';
import EnquiryModal from '../components/EnquiryModal';
import Toast from '../components/Toast';
import api from '../services/api';
import { Car, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CarsPage = () => {
  const { t } = useLanguage();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('newest');

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

  useEffect(() => {
    fetchVehicles();
  }, [filters, sort]);

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
      
      if (sort === 'price_asc') params.append('sort', 'price_asc');
      if (sort === 'price_desc') params.append('sort', 'price_desc');
      if (sort === 'year_desc') params.append('sort', 'year_desc');
      if (sort === 'km_asc') params.append('sort', 'km_asc');

      const res = await api.get(`/vehicles?${params.toString()}`);
      if (res.data.success) {
        setVehicles(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching car stock', err);
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
    setSort('newest');
  };

  const handleEnquiry = (vehicle) => {
    setSelectedVehicleForEnquiry(vehicle);
    setEnquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-slate-100 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Page Header */}
        <div className="bg-[#121216] border-b border-dark-border py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-gold-500 uppercase tracking-widest">SHITAL MOTORS INVENTORY</div>
              <h1 className="text-3xl font-black text-white">{t('sec.availableStock')}</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold px-4 py-2 rounded-xl bg-[#0A0A0C] border border-dark-border text-gold-400">
                {vehicles.length} Vehicles Available
              </span>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          
          {/* Top Search & Filter Bar */}
          <SearchFilters
            filters={filters}
            setFilters={setFilters}
            onReset={handleResetFilters}
            totalResults={vehicles.length}
          />

          {/* Sorting Bar */}
          <div className="flex items-center justify-between bg-[#121216] border border-dark-border rounded-xl px-4 py-3 text-xs">
            <span className="text-slate-400 font-semibold hidden sm:inline">
              Showing <span className="text-white font-bold">{vehicles.length}</span> matching cars
            </span>

            <div className="flex items-center gap-2 ml-auto">
              <ArrowUpDown className="w-4 h-4 text-gold-500" />
              <span className="text-slate-300 font-semibold">Sort By:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-[#0A0A0C] border border-dark-border rounded-lg px-3 py-1.5 text-white font-semibold focus:border-gold-500 focus:outline-none"
              >
                <option value="newest">Newest Listed First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="year_desc">Model Year: Newest</option>
                <option value="km_asc">KM Driven: Lowest</option>
              </select>
            </div>
          </div>

          {/* Stock Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-80 rounded-2xl bg-[#121216] animate-pulse border border-dark-border"></div>
              ))}
            </div>
          ) : vehicles.length === 0 ? (
            <div className="text-center py-20 bg-[#121216] border border-dark-border rounded-2xl space-y-4">
              <Car className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">No vehicles match your active search filters</h3>
              <p className="text-xs text-slate-400">Try adjusting your budget or selecting different car brands.</p>
              <button
                onClick={handleResetFilters}
                className="gold-button px-6 py-3 rounded-xl text-xs font-bold"
              >
                RESET FILTERS
              </button>
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

export default CarsPage;
