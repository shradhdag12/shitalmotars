import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EnquiryModal from '../components/EnquiryModal';
import Toast from '../components/Toast';
import { Car, Key, Truck, MapPin, Plane, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ServicesPage = () => {
  const { t } = useLanguage();
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [serviceTitle, setServiceTitle] = useState('Dealership Service');
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const services = [
    {
      icon: Car,
      title: 'USED CAR BUYING',
      desc: 'Browse our certified pre-owned stock of top Indian automotive brands. Complete peace of mind with verified documents, multi-point technical inspection, and transparent pricing.'
    },
    {
      icon: Key,
      title: 'USED CAR SELLING',
      desc: 'Get the highest market valuation for your pre-owned vehicle. Immediate evaluation, hassle-free RC transfer assistance, and spot payment guarantee.'
    },
    {
      icon: Truck,
      title: 'CAR RENTAL SERVICES',
      desc: 'Clean, comfortable AC and Non-AC car rentals for local and long-distance journeys with experienced chauffeurs or self-drive configurations.'
    },
    {
      icon: MapPin,
      title: 'LOCAL & OUTSTATION TOURS',
      desc: 'Customized tour packages across Maharashtra for family vacations, temple tours, business travel, and weekend getaways.'
    },
    {
      icon: Plane,
      title: 'AIRPORT PICKUP & DROP',
      desc: 'Punctual 24/7 airport transfer service. Driver arrives before schedule with clean vehicle for stress-free travel.'
    },
    {
      icon: Clock,
      title: '24 HOURS ASSISTANCE',
      desc: 'Round the clock customer support for vehicle enquiries, urgent car rentals, and emergency roadside assistance.'
    }
  ];

  const handleEnquire = (title) => {
    setServiceTitle(title);
    setEnquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-slate-100 flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="bg-[#121216] border-b border-dark-border py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-3">
            <div className="text-xs font-bold text-gold-500 uppercase tracking-widest">SHITAL MOTORS SERVICES</div>
            <h1 className="text-3xl font-black text-white">Our Dealership & Rental Services</h1>
            <p className="text-sm text-slate-400 max-w-2xl">
              We provide end-to-end buying, selling, evaluation, and car rental services under one roof.
            </p>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={idx} className="bg-[#121216] border border-dark-border rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-gold-500/50 transition-all shadow-lg">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{s.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                  </div>

                  <button
                    onClick={() => handleEnquire(s.title)}
                    className="gold-button w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <span>ENQUIRE ABOUT SERVICE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

        </main>
      </div>

      <Footer />

      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        vehicle={{ brand: 'Service', model: serviceTitle, variant: 'Inquiry' }}
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

export default ServicesPage;
