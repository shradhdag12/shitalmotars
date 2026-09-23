import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ShieldCheck, Award, ThumbsUp, Car, Users, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-slate-100 flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="bg-[#121216] border-b border-dark-border py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-3">
            <div className="text-xs font-bold text-gold-500 uppercase tracking-widest">ABOUT SHITAL MOTORS</div>
            <h1 className="text-3xl font-black text-white">Trusted Used Car Dealership</h1>
            <p className="text-sm text-slate-400 max-w-2xl">
              Delivering certified pre-owned vehicles, transparent pricing, and reliable car rental services in Maharashtra.
            </p>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold text-gold-500 uppercase tracking-wider">OUR MISSION & PROMISE</span>
              <h2 className="text-2xl font-black text-white">Your Trusted Partner in Pre-Owned Automobiles</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                At **Shital Motors**, managed by Yogesh Ghongade, we believe buying or selling a used car should be transparent, straightforward, and rewarding. 
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                Every vehicle in our stock is physically inspected, document-verified, and priced fairly according to market valuation. We also offer 24/7 car rental services for outstation, local, and airport transfers.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link to="/cars" className="gold-button px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2">
                  <Car className="w-4 h-4" />
                  <span>BROWSE OUR CAR STOCK</span>
                </Link>

                <Link to="/contact" className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 hover:bg-white/10">
                  CONTACT US
                </Link>
              </div>
            </div>

            <div className="bg-[#121216] border border-dark-border rounded-2xl p-6 space-y-4 shadow-xl">
              <h3 className="text-lg font-bold text-white border-b border-dark-border pb-3">What Sets Us Apart</h3>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white text-sm">Rigorous Inspection</div>
                    <div>Engine, transmission, electricals and body condition checked thoroughly.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ThumbsUp className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white text-sm">Transparent Valuation</div>
                    <div>No hidden charges or artificial price markups. Negotiable deals available.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white text-sm">Customer First Support</div>
                    <div>Direct contact with dealership management for personal assistance.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
