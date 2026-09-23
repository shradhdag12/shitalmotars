import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShieldCheck, Tag, Clock, Car } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1600',
    title: 'QUALITY USED CARS & RELIABLE RENTAL SERVICES',
    subtitle: 'Hyundai Creta SX(O) - Top Model with Panoramic Sunroof & Leather Seats',
    tag: 'FEATURED STOCK'
  },
  {
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1600',
    title: 'TRUSTED VEHICLES. TRANSPARENT DEALS.',
    subtitle: 'Toyota Fortuner 4x4 Automatic - Powerful & Command Center Experience',
    tag: 'PREMIUM SUV'
  },
  {
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1600',
    title: 'BEST PRICES FOR BUYING & SELLING',
    subtitle: 'Honda City V CVT Petrol - Executive Comfort & Smooth Automatic Transmission',
    tag: 'LUXURY SEDAN'
  }
];

const HeroCarousel = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % heroSlides.length);
  };

  const handlePrev = () => {
    setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section 
      className="relative min-h-[560px] lg:min-h-[620px] flex items-center bg-[#070709] overflow-hidden border-b border-dark-border"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Dynamic Background Image Carousel */}
      {heroSlides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img 
            src={slide.image} 
            alt={slide.title} 
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000 ease-out"
          />
          {/* Gradients to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0C] via-[#0A0A0C]/85 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-black/40"></div>
        </div>
      ))}

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="max-w-2xl space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold tracking-wider uppercase backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse"></span>
            <span>SHITAL MOTORS • {heroSlides[currentSlide].tag}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.15]">
            {t('hero.headline')}
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            {t('hero.subtext')}
          </p>

          {/* Slide Subtitle */}
          <div className="text-xs sm:text-sm text-gold-400 font-semibold bg-white/5 p-3 rounded-xl border border-white/10 max-w-lg">
            ⚡ {heroSlides[currentSlide].subtitle}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link 
              to="/cars" 
              className="gold-button px-6 py-3.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-gold-500/20"
            >
              <Car className="w-4 h-4 stroke-[2.5]" />
              <span>{t('hero.btnStock')}</span>
            </Link>

            <Link 
              to="/contact" 
              className="px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-white/10 border border-white/20 hover:bg-white/20 backdrop-blur-md transition-all"
            >
              {t('hero.btnContact')}
            </Link>

            <Link 
              to="/rental" 
              className="px-6 py-3.5 rounded-xl text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors"
            >
              {t('hero.btnRental')} →
            </Link>
          </div>

          {/* Feature Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-500 shrink-0" />
              <span>{t('chip.trusted')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-gold-500 shrink-0" />
              <span>{t('chip.bestPrices')}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-500 shrink-0" />
              <span>{t('chip.transparent')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold-500 shrink-0" />
              <span>{t('chip.service247')}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute right-6 bottom-6 z-20 flex items-center gap-2">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full bg-black/60 border border-white/20 text-white hover:bg-gold-500 hover:text-black hover:border-gold-500 transition-all backdrop-blur-md"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="p-3 rounded-full bg-black/60 border border-white/20 text-white hover:bg-gold-500 hover:text-black hover:border-gold-500 transition-all backdrop-blur-md"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-2">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'w-8 bg-gold-500' : 'w-2 bg-white/40 hover:bg-white'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
