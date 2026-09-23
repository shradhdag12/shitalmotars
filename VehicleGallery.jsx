import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

const DEFAULT_CAR_IMAGE = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1000';

const VehicleGallery = ({ images = [] }) => {
  const imageList = images.length > 0 ? images.map(img => typeof img === 'string' ? img : img.url) : [DEFAULT_CAR_IMAGE];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleNext = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % imageList.length);
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Display Image */}
      <div 
        className="relative aspect-[16/10] bg-[#0A0A0C] border border-dark-border rounded-2xl overflow-hidden group cursor-pointer"
        onClick={() => setLightboxOpen(true)}
      >
        <img
          src={imageList[selectedIndex]}
          alt={`Vehicle Image ${selectedIndex + 1}`}
          className="w-full h-full object-cover object-center transition-all duration-300 group-hover:scale-105"
          onError={(e) => { e.target.src = DEFAULT_CAR_IMAGE; }}
        />

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="p-3 rounded-full bg-black/70 text-white backdrop-blur-md">
            <Maximize2 className="w-6 h-6" />
          </span>
        </div>

        {imageList.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-gold-500 hover:text-black transition-all backdrop-blur-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-gold-500 hover:text-black transition-all backdrop-blur-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/70 text-white text-xs font-semibold backdrop-blur-md">
          {selectedIndex + 1} / {imageList.length}
        </div>
      </div>

      {/* Thumbnails Row */}
      {imageList.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {imageList.map((url, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative aspect-[16/10] w-24 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                idx === selectedIndex ? 'border-gold-500 scale-105 shadow-md shadow-gold-500/20' : 'border-dark-border opacity-60 hover:opacity-100'
              }`}
            >
              <img src={url} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Popup Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-rose-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <img
            src={imageList[selectedIndex]}
            alt="Full view"
            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
          />

          {imageList.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 text-white hover:bg-gold-500 hover:text-black transition-all"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 text-white hover:bg-gold-500 hover:text-black transition-all"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default VehicleGallery;
