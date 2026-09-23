import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EnquiryModal from '../components/EnquiryModal';
import Toast from '../components/Toast';
import { Phone, MessageSquare, MapPin, Clock, Mail, Send, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ContactPage = () => {
  const { t } = useLanguage();
  const phone = '8552085279';
  const whatsapp = '9764706002';
  const contactPerson = 'Yogesh Ghongade';
  const address = 'Near Bus Stand, Main Highway Road, Maharashtra';
  const mapUrl = 'https://maps.google.com/?q=Shital+Motors';

  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-slate-100 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Page Header */}
        <div className="bg-[#121216] border-b border-dark-border py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-3">
            <div className="text-xs font-bold text-gold-500 uppercase tracking-widest">SHITAL MOTORS CONTACT</div>
            <h1 className="text-3xl font-black text-white">Get In Touch With Us</h1>
            <p className="text-sm text-slate-400 max-w-2xl">
              Visit our dealership showroom, call us directly, or send an enquiry message.
            </p>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Contact Info Cards (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-[#121216] border border-dark-border rounded-2xl p-6 space-y-6 shadow-xl">
                <div>
                  <h3 className="text-xl font-black text-white">SHITAL MOTORS</h3>
                  <p className="text-xs font-semibold text-gold-500">Used Cars Buying & Selling</p>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="p-3 rounded-xl bg-[#0A0A0C] border border-dark-border space-y-1">
                    <span className="text-xs text-slate-400 font-medium">Contact Person</span>
                    <div className="font-bold text-white text-base">{contactPerson}</div>
                  </div>

                  <a
                    href={`tel:${phone}`}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <div className="text-[10px] uppercase font-bold text-emerald-400">Direct Phone Call</div>
                      <div className="text-base font-bold">+91 {phone}</div>
                    </div>
                  </a>

                  <a
                    href={`https://wa.me/91${whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                  >
                    <MessageSquare className="w-5 h-5 shrink-0" />
                    <div>
                      <div className="text-[10px] uppercase font-bold text-white/80">WhatsApp Contact</div>
                      <div className="text-base font-bold">+91 {whatsapp}</div>
                    </div>
                  </a>

                  <div className="p-3.5 rounded-xl bg-[#0A0A0C] border border-dark-border space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-gold-500">
                      <MapPin className="w-4 h-4" />
                      <span>DEALERSHIP LOCATION</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">{address}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0A0A0C] border border-dark-border space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-gold-500">
                      <Clock className="w-4 h-4" />
                      <span>BUSINESS HOURS</span>
                    </div>
                    <p className="text-xs text-slate-300 pt-1">Monday - Sunday: 8:00 AM - 9:00 PM</p>
                  </div>
                </div>

                <button
                  onClick={() => setEnquiryModalOpen(true)}
                  className="gold-button w-full py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>SEND DIRECT ENQUIRY</span>
                </button>
              </div>

            </div>

            {/* Google Map Section (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-[#121216] border border-dark-border rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Showroom Location</h3>
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-gold-400 hover:text-gold-300 flex items-center gap-1"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Map Embed Container with Fallback */}
                <div className="relative aspect-[16/10] bg-[#0A0A0C] rounded-xl overflow-hidden border border-dark-border">
                  <iframe
                    title="Shital Motors Google Map Location"
                    src="https://maps.google.com/maps?q=Shital%20Motors&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                  ></iframe>
                </div>

                <div className="text-xs text-slate-400 p-3 rounded-xl bg-[#0A0A0C] border border-dark-border flex items-center justify-between">
                  <span>📍 Near Bus Stand, Main Highway Road, Maharashtra</span>
                  <a href={mapUrl} target="_blank" rel="noreferrer" className="text-gold-400 font-bold hover:underline">
                    Get Directions →
                  </a>
                </div>
              </div>
            </div>

          </div>

        </main>
      </div>

      <Footer />

      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        vehicle={{ brand: 'General', model: 'Contact Page Inquiry', variant: 'Direct' }}
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

export default ContactPage;
