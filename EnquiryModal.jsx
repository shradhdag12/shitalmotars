import React, { useState } from 'react';
import { X, Send, Phone, User, Mail, MessageSquare } from 'lucide-react';
import api from '../services/api';

const EnquiryModal = ({ isOpen, onClose, vehicle, onSuccess }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    message: vehicle ? `Hi Shital Motors, I am interested in ${vehicle.brand} ${vehicle.model} ${vehicle.variant || ''}.` : 'Hi Shital Motors, I have a car enquiry.',
    preferredContactMethod: 'WhatsApp'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.customerName.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    try {
      setLoading(true);
      const res = await api.post('/enquiries', {
        ...formData,
        vehicleId: vehicle?._id || null,
        vehicleTitle: vehicle ? `${vehicle.brand} ${vehicle.model} ${vehicle.variant || ''}` : 'General Enquiry'
      });

      if (res.data.success) {
        onSuccess(res.data.message || 'Enquiry submitted successfully!');
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121216] border border-dark-border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl space-y-6 p-6 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-dark-border pb-4">
          <div>
            <h3 className="text-xl font-bold text-white">Send Car Enquiry</h3>
            <p className="text-xs text-gold-400 mt-0.5">
              {vehicle ? `${vehicle.brand} ${vehicle.model} ${vehicle.variant}` : 'Shital Motors Sales Team'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-semibold">
            ⚠️ {error}
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Your Full Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                placeholder="e.g. Ramesh Patil"
                className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:border-gold-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Mobile Phone Number *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 9876543210"
                  className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:border-gold-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Email Address (Optional)</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@gmail.com"
                  className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:border-gold-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Message / Requirements *</label>
            <textarea
              rows={3}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl p-3 text-sm text-white focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Preferred Contact Method</label>
            <div className="flex gap-4 pt-1">
              {['WhatsApp', 'Call', 'Email'].map((method) => (
                <label key={method} className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="preferredContactMethod"
                    value={method}
                    checked={formData.preferredContactMethod === method}
                    onChange={(e) => setFormData({ ...formData, preferredContactMethod: e.target.value })}
                    className="accent-gold-500"
                  />
                  <span>{method}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="gold-button w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20"
            >
              {loading ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>SUBMIT ENQUIRY</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EnquiryModal;
