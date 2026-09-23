import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Phone, MessageSquare, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const phone = '8552085279';
  const whatsapp = '9764706002';
  const contactPerson = 'Yogesh Ghongade';

  return (
    <footer className="bg-[#070709] border-t border-dark-border pt-16 pb-8 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500 flex items-center justify-center text-black font-extrabold shadow-lg shadow-gold-500/20">
                <Car className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="text-xl font-black text-white">
                SHITAL <span className="text-gold-500">MOTORS</span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Shital Motors is Maharashtra's trusted used car dealership. We specialize in quality certified pre-owned vehicles, transparent buying & selling, and 24/7 car rental services.
            </p>
            <div className="flex items-center gap-3 text-xs text-gold-400 font-semibold">
              <span>✓ Tested Vehicles</span>
              <span>✓ Best Market Prices</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 tracking-wide uppercase">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-gold-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-gold-500" />
                  <span>{t('nav.home')}</span>
                </Link>
              </li>
              <li>
                <Link to="/cars" className="hover:text-gold-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-gold-500" />
                  <span>{t('nav.availableStock')}</span>
                </Link>
              </li>
              <li>
                <Link to="/rental" className="hover:text-gold-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-gold-500" />
                  <span>{t('nav.rental')}</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-gold-500" />
                  <span>{t('nav.services')}</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-gold-500" />
                  <span>{t('nav.about')}</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-gold-500" />
                  <span>{t('nav.contact')}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 tracking-wide uppercase">Our Services</h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">🚗 Used Car Buying</li>
              <li className="flex items-center gap-2">🔑 Used Car Selling</li>
              <li className="flex items-center gap-2">🚕 AC / Non-AC Car Rental</li>
              <li className="flex items-center gap-2">✈️ Airport Pickup & Drop</li>
              <li className="flex items-center gap-2">🗺️ Outstation & Local Tours</li>
              <li className="flex items-center gap-2">⏱️ 24 Hours Service</li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 tracking-wide uppercase">Contact Dealership</h3>
            <div className="space-y-3 text-sm">
              <div className="font-semibold text-white">{contactPerson}</div>
              <a href={`tel:${phone}`} className="flex items-center gap-2 text-slate-300 hover:text-gold-400 transition-colors">
                <Phone className="w-4 h-4 text-gold-500" />
                <span>+91 {phone}</span>
              </a>
              <a href={`https://wa.me/91${whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors">
                <MessageSquare className="w-4 h-4" />
                <span>+91 {whatsapp} (WhatsApp)</span>
              </a>
              <div className="flex items-start gap-2 text-xs text-slate-400 pt-1">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span>Near Bus Stand, Main Highway Road, Maharashtra</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-4 h-4 text-gold-500 shrink-0" />
                <span>Open All Days: 8:00 AM - 9:00 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-dark-border/50 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Shital Motors. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/admin/login" className="hover:text-gold-400 transition-colors">Admin Portal</Link>
            <Link to="/contact" className="hover:text-gold-400 transition-colors">Privacy & Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
