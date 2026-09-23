import React from 'react';
import { Search, RotateCcw, Filter, SlidersHorizontal } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const BRANDS = ['All', 'Hyundai', 'Maruti Suzuki', 'Honda', 'Toyota', 'Tata', 'Mahindra', 'Kia', 'Ford', 'Volkswagen', 'BMW', 'Mercedes-Benz'];
const FUELS = ['All', 'Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid'];
const TRANSMISSIONS = ['All', 'Manual', 'Automatic', 'AMT', 'CVT', 'DCT'];
const BODY_TYPES = ['All', 'Hatchback', 'Sedan', 'SUV', 'MUV'];

const SearchFilters = ({ filters, setFilters, onReset, totalResults = 0 }) => {
  const { t } = useLanguage();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-[#121216] border border-dark-border rounded-2xl p-5 shadow-xl space-y-5">
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-3 border-b border-dark-border/60">
        <div className="flex items-center gap-2 text-gold-500 font-bold text-base tracking-wide uppercase">
          <SlidersHorizontal className="w-5 h-5 text-gold-500" />
          <span>{t('filter.title')}</span>
        </div>
        {totalResults !== undefined && (
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/30">
            {totalResults} Vehicles Found
          </span>
        )}
      </div>

      {/* Filter Form Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Search Keyword */}
        <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
          <label className="text-xs font-semibold text-slate-300">Search Vehicle</label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="search"
              value={filters.search || ''}
              onChange={handleChange}
              placeholder="e.g. Creta, Swift, Diesel..."
              className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl pl-9 pr-3 py-2 text-sm text-white focus:border-gold-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Brand Dropdown */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">{t('filter.brand')}</label>
          <select
            name="brand"
            value={filters.brand || ''}
            onChange={handleChange}
            className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl px-3 py-2 text-sm text-white focus:border-gold-500 focus:outline-none transition-colors"
          >
            <option value="">{t('filter.allBrands')}</option>
            {BRANDS.slice(1).map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Fuel Type */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">{t('filter.fuel')}</label>
          <select
            name="fuelType"
            value={filters.fuelType || ''}
            onChange={handleChange}
            className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl px-3 py-2 text-sm text-white focus:border-gold-500 focus:outline-none transition-colors"
          >
            <option value="">{t('filter.allFuel')}</option>
            {FUELS.slice(1).map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* Transmission */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">{t('filter.transmission')}</label>
          <select
            name="transmission"
            value={filters.transmission || ''}
            onChange={handleChange}
            className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl px-3 py-2 text-sm text-white focus:border-gold-500 focus:outline-none transition-colors"
          >
            <option value="">{t('filter.allTrans')}</option>
            {TRANSMISSIONS.slice(1).map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Min Price */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">{t('filter.minPrice')}</label>
          <select
            name="minPrice"
            value={filters.minPrice || ''}
            onChange={handleChange}
            className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl px-3 py-2 text-sm text-white focus:border-gold-500 focus:outline-none transition-colors"
          >
            <option value="">No Min Price</option>
            <option value="300000">₹3,00,000</option>
            <option value="500000">₹5,00,000</option>
            <option value="800000">₹8,00,000</option>
            <option value="1000000">₹10,00,000</option>
            <option value="1500000">₹15,00,000</option>
          </select>
        </div>

        {/* Max Price */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">{t('filter.maxPrice')}</label>
          <select
            name="maxPrice"
            value={filters.maxPrice || ''}
            onChange={handleChange}
            className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl px-3 py-2 text-sm text-white focus:border-gold-500 focus:outline-none transition-colors"
          >
            <option value="">No Max Price</option>
            <option value="500000">₹5,00,000</option>
            <option value="800000">₹8,00,000</option>
            <option value="1200000">₹12,00,000</option>
            <option value="2000000">₹20,00,000</option>
            <option value="3500000">₹35,00,000</option>
          </select>
        </div>

        {/* Body Type */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">{t('filter.body')}</label>
          <select
            name="bodyType"
            value={filters.bodyType || ''}
            onChange={handleChange}
            className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl px-3 py-2 text-sm text-white focus:border-gold-500 focus:outline-none transition-colors"
          >
            <option value="">All Body Types</option>
            {BODY_TYPES.slice(1).map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-end gap-2 pt-2 sm:col-span-2 lg:col-span-1">
          <button
            onClick={onReset}
            className="flex-1 px-4 py-2 text-xs font-bold rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('filter.resetBtn')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default SearchFilters;
