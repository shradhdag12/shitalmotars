import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import Toast from '../components/Toast';
import api from '../services/api';
import { Save, Building, Phone, MessageSquare, MapPin, Mail } from 'lucide-react';

const AdminSettingsPage = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const [settings, setSettings] = useState({
    businessName: 'SHITAL MOTORS',
    tagline: 'Used Cars Buying & Selling',
    contactPerson: 'Yogesh Ghongade',
    phone: '8552085279',
    whatsapp: '9764706002',
    email: 'shitalmotors@gmail.com',
    address: 'Near Bus Stand, Main Highway Road, Maharashtra',
    googleMapsUrl: 'https://maps.google.com/?q=Shital+Motors',
    currency: '₹',
    recentDaysThreshold: 30
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await api.get('/settings');
      if (res.data.success && res.data.data) {
        setSettings(res.data.data);
      }
    } catch (err) {
      console.error('Error loading settings', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.put('/settings', settings);
      if (res.data.success) {
        setToast({ message: 'Dealership settings saved successfully!', type: 'success' });
      }
    } catch (err) {
      setToast({ message: 'Failed to update settings', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-slate-100 flex">
      <AdminSidebar mobileOpen={mobileSidebarOpen} setMobileOpen={setMobileSidebarOpen} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <AdminHeader
          title="Dealership Business Settings"
          subtitle="Configure phone numbers, WhatsApp, contact person and maps link"
          onMobileToggle={() => setMobileSidebarOpen(true)}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl">
          
          <form onSubmit={handleSubmit} className="bg-[#121216] border border-dark-border rounded-2xl p-6 space-y-6 shadow-xl text-xs">
            <h3 className="text-base font-bold text-white border-b border-dark-border pb-3">Business Profile & Contacts</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Business Name</label>
                <input
                  type="text"
                  value={settings.businessName}
                  onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                  className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl px-3 py-2.5 text-white focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Tagline / Subtitle</label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl px-3 py-2.5 text-white focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Contact Person Name</label>
                <input
                  type="text"
                  value={settings.contactPerson}
                  onChange={(e) => setSettings({ ...settings, contactPerson: e.target.value })}
                  className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl px-3 py-2.5 text-white focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Phone Number (Call Buttons)</label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl px-3 py-2.5 text-white focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">WhatsApp Number</label>
                <input
                  type="text"
                  value={settings.whatsapp}
                  onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                  className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl px-3 py-2.5 text-white focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Email Address</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl px-3 py-2.5 text-white focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-semibold text-slate-300">Showroom Address</label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl px-3 py-2.5 text-white focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-semibold text-slate-300">Google Maps URL</label>
                <input
                  type="url"
                  value={settings.googleMapsUrl}
                  onChange={(e) => setSettings({ ...settings, googleMapsUrl: e.target.value })}
                  className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl px-3 py-2.5 text-white focus:border-gold-500 focus:outline-none"
                />
              </div>

            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className="gold-button px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-gold-500/20"
              >
                <Save className="w-4 h-4" />
                <span>{loading ? 'SAVING...' : 'SAVE SETTINGS'}</span>
              </button>
            </div>

          </form>

        </main>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </div>
  );
};

export default AdminSettingsPage;
