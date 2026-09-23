import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Phone, MessageSquare, Calendar, Gauge, Fuel, SlidersHorizontal } from 'lucide-react';
import { formatCurrency, formatNumber } from '../utils/formatters';
import { useWishlist } from '../context/WishlistContext';
import { useLanguage } from '../context/LanguageContext';

const DEFAULT_CAR_IMAGE = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800';

const VehicleCard = ({ vehicle, onEnquire }) => {
  const { t } = useLanguage();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const phone = '8552085279';
  const whatsapp = '9764706002';

  if (!vehicle) return null;

  const isFavorite = isInWishlist(vehicle._id);
  const mainImg = vehicle.mainImage || (vehicle.images && vehicle.images[0]?.url) || DEFAULT_CAR_IMAGE;
  const isAvailable = vehicle.status === 'AVAILABLE';

  const whatsappMessage = `Hello Shital Motors, I am interested in the ${vehicle.brand} ${vehicle.model} ${vehicle.variant || ''} (${vehicle.modelYear}), priced at ${formatCurrency(vehicle.price)}. Is it available?`;

  return (
    <div className="group bg-[#121216] border border-dark-border rounded-2xl overflow-hidden hover:border-gold-500/50 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-gold-500/5">
      
      {/* Top Image Section */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0A0A0C]">
        <img
          src={mainImg}
          alt={`${vehicle.brand} ${vehicle.model}`}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = DEFAULT_CAR_IMAGE; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-transparent opacity-80"></div>

        {/* Badges Container */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
          {/* Status Badge */}
          <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold tracking-wider uppercase border shadow-md ${
            isAvailable 
              ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50' 
              : 'bg-rose-950/90 text-rose-300 border-rose-500/50'
          }`}>
            {isAvailable ? t('card.available') : t('card.sold')}
          </span>

          {/* New Stock Badge */}
          {vehicle.isNewStock && (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold tracking-wider uppercase bg-gold-500 text-black shadow-md">
              {t('card.new')}
            </span>
          )}
        </div>

        {/* Favourite Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(vehicle._id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/60 border border-white/20 text-slate-300 hover:text-rose-500 backdrop-blur-md transition-all"
          title="Add to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'text-rose-500 fill-rose-500' : ''}`} />
        </button>

        {/* Bottom Price on Image Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <div className="text-xl font-black text-white tracking-tight drop-shadow-md">
              {formatCurrency(vehicle.price)}
            </div>
            {vehicle.isNegotiable && (
              <span className="text-[10px] font-bold text-gold-400">
                {t('card.negotiable')}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Middle Specs & Details Section */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-xs font-bold text-gold-500 tracking-wider uppercase mb-0.5">
            {vehicle.brand}
          </div>
          <h3 className="text-base font-bold text-white line-clamp-1 group-hover:text-gold-400 transition-colors">
            {vehicle.model} <span className="text-sm font-normal text-slate-400">{vehicle.variant}</span>
          </h3>
        </div>

        {/* Specs Pills Grid */}
        <div className="grid grid-cols-2 gap-2 py-2 border-y border-dark-border/60 text-xs text-slate-300">
          <div className="flex items-center gap-1.5 bg-[#0A0A0C] px-2.5 py-1.5 rounded-lg border border-dark-border/40">
            <Calendar className="w-3.5 h-3.5 text-gold-500 shrink-0" />
            <span>{vehicle.modelYear}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-[#0A0A0C] px-2.5 py-1.5 rounded-lg border border-dark-border/40">
            <Gauge className="w-3.5 h-3.5 text-gold-500 shrink-0" />
            <span>{formatNumber(vehicle.kmDriven)} KM</span>
          </div>

          <div className="flex items-center gap-1.5 bg-[#0A0A0C] px-2.5 py-1.5 rounded-lg border border-dark-border/40">
            <Fuel className="w-3.5 h-3.5 text-gold-500 shrink-0" />
            <span>{vehicle.fuelType}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-[#0A0A0C] px-2.5 py-1.5 rounded-lg border border-dark-border/40">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gold-500 shrink-0" />
            <span>{vehicle.transmission}</span>
          </div>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="p-4 pt-0 grid grid-cols-3 gap-2">
        <Link
          to={`/cars/${vehicle._id}`}
          className="col-span-1 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold text-slate-200 text-center flex items-center justify-center transition-colors"
        >
          {t('card.viewDetails')}
        </Link>

        <a
          href={`tel:${phone}`}
          className="py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 text-xs font-bold text-center flex items-center justify-center gap-1 transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call</span>
        </a>

        <a
          href={`https://wa.me/91${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`}
          target="_blank"
          rel="noreferrer"
          className="py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold text-center flex items-center justify-center gap-1 transition-colors shadow-md shadow-emerald-900/20"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>
      </div>

    </div>
  );
};

export default VehicleCard;
