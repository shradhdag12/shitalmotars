import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EnquiryModal from '../components/EnquiryModal';
import Toast from '../components/Toast';
import { Car, Clock, Plane, MapPin, Shield, CheckCircle, Phone, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const RentalPage = () => {
  const { t } = useLanguage();
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Car Rental Service');
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const phone = '8552085279';
  const whatsapp = '9764706002';

  const rentalServices = [
    {
      title: 'AC & Non-AC Cars',
      category: 'AC / Non-AC Rental',
      icon: Car,
      description: 'Comfortable hatchbacks, sedans and 7-seater MUVs available for daily, weekly, or monthly travel requirements.',
      features: ['Air-Conditioned Option', 'Clean Interiors', 'Sanitized Vehicles', 'Self-Drive or Chauffeur']
    },
    {
      title: 'Airport Pickup & Drop',
      category: 'Airport Transfer',
      icon: Plane,
      description: '24/7 reliable airport transfer service. Punctual drivers who ensure seamless flight pickup and drop-offs.',
      features: ['Flight Tracking', 'Zero Delay Guarantee', 'Luggage Assistance', 'Fixed Transparent Fare']
    },
    {
      title: 'Outstation Tours',
      category: 'Outstation Rental',
      icon: MapPin,
      description: 'Explore scenic destinations across Maharashtra with experienced long-distance highway drivers.',
      features: ['Per KM Rates', 'Experienced Drivers', 'Highway Toll Support', '24/7 Emergency Support']
    },
    {
      title: 'Local Hourly Rental',
      category: 'Local Rental',
      icon: Clock,
      description: 'Hire cars for local city tours, wedding events, business meetings, or shopping errands.',
      features: ['Flexible Hour Packs', 'City Route Experts', 'Multiple Stop Support', 'Affordable Packages']
    },
    {
      title: 'AC Car + Professional Driver',
      category: 'Chauffeur Rental',
      icon: Shield,
      description: 'Sit back and relax in premium luxury sedans and SUVs driven by trained, courteous professional chauffeurs.',
      features: ['Professional Uniformed Drivers', 'Luxury Fleet', 'Safety First', 'Flexible Billing']
    },
    {
      title: '24 Hours Emergency Service',
      category: '24 Hours Rental',
      icon: Clock,
      description: 'Emergency car availability round the clock. Contact us anytime for instant vehicle dispatch.',
      features: ['Instant Booking', '24/7 Phone Support', 'Immediate Dispatch', 'All Maharashtra Routes']
    }
  ];

  const handleBook = (category) => {
    setSelectedCategory(category);
    setEnquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-slate-100 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Page Header */}
        <div className="bg-[#121216] border-b border-dark-border py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-3">
            <div className="text-xs font-bold text-gold-500 uppercase tracking-widest">SHITAL MOTORS CAR RENTAL</div>
            <h1 className="text-3xl font-black text-white">Reliable Car Rental Services</h1>
            <p className="text-sm text-slate-400 max-w-2xl">
              24/7 Car Rental in Maharashtra. Choose from AC & Non-AC cars, Outstation tours, Airport Pickup & Drop services.
            </p>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentalServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className="bg-[#121216] border border-dark-border rounded-2xl p-6 flex flex-col justify-between space-y-5 hover:border-gold-500/50 transition-all shadow-lg">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{service.description}</p>
                    
                    <ul className="space-y-1.5 pt-2 text-xs text-slate-300">
                      {service.features.map((f, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleBook(service.title)}
                    className="gold-button w-full py-3 rounded-xl text-xs font-bold"
                  >
                    BOOK / ENQUIRE NOW
                  </button>
                </div>
              );
            })}
          </div>

          {/* Direct Phone Call Banner */}
          <div className="bg-[#121216] border border-dark-border rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-white">Need Urgent Car Rental for Today?</h3>
              <p className="text-xs text-slate-400">Directly contact Yogesh Ghongade for instant rental booking and car availability.</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`tel:${phone}`}
                className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call {phone}</span>
              </a>

              <a
                href={`https://wa.me/91${whatsapp}?text=Hi%20Shital%20Motors,%20I%20need%20a%20car%20rental%20service.`}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp {whatsapp}</span>
              </a>
            </div>
          </div>

        </main>
      </div>

      <Footer />

      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        vehicle={{ brand: 'Car Rental', model: selectedCategory, variant: 'Service' }}
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

export default RentalPage;
