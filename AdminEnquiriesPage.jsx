import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import Toast from '../components/Toast';
import api from '../services/api';
import { formatDate } from '../utils/formatters';
import { exportEnquiriesToExcel } from '../utils/exportUtils';
import { 
  MessageSquare, 
  Phone, 
  Trash2, 
  FileSpreadsheet,
  Clock,
  User,
  Mail
} from 'lucide-react';

const AdminEnquiriesPage = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await api.get('/enquiries');
      if (res.data.success) {
        setEnquiries(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching enquiries', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await api.patch(`/enquiries/${id}/status`, { status: newStatus });
      if (res.data.success) {
        setToast({ message: 'Enquiry status updated', type: 'success' });
        fetchEnquiries();
      }
    } catch (err) {
      setToast({ message: 'Failed to update enquiry status', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/enquiries/${id}`);
      if (res.data.success) {
        setToast({ message: 'Enquiry deleted', type: 'success' });
        fetchEnquiries();
      }
    } catch (err) {
      setToast({ message: 'Failed to delete enquiry', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-slate-100 flex">
      <AdminSidebar mobileOpen={mobileSidebarOpen} setMobileOpen={setMobileSidebarOpen} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <AdminHeader
          title="Customer Enquiries"
          subtitle="Manage customer sales and rental queries"
          onMobileToggle={() => setMobileSidebarOpen(true)}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
          
          <div className="flex items-center justify-between bg-[#121216] border border-dark-border rounded-2xl p-5 shadow-xl">
            <div>
              <h3 className="text-base font-bold text-white">Enquiry Tracker</h3>
              <p className="text-xs text-slate-400">Total Enquiries Received: {enquiries.length}</p>
            </div>
            <button
              onClick={() => exportEnquiriesToExcel(enquiries)}
              className="px-4 py-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export Excel Report</span>
            </button>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-12 text-slate-400">Loading customer enquiries...</div>
            ) : enquiries.length === 0 ? (
              <div className="bg-[#121216] border border-dark-border rounded-2xl p-12 text-center text-slate-400 text-xs">
                No customer enquiries received yet.
              </div>
            ) : (
              enquiries.map((e) => (
                <div key={e._id} className="bg-[#121216] border border-dark-border rounded-2xl p-5 space-y-4 shadow-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-dark-border/60 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-base">{e.customerName}</span>
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/30">
                          {e.preferredContactMethod || 'WhatsApp'}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-3 pt-1">
                        <span>📞 {e.phone}</span>
                        {e.email && <span>✉️ {e.email}</span>}
                        <span>🗓️ {formatDate(e.createdAt)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-400">Status:</span>
                      <select
                        value={e.status}
                        onChange={(evt) => handleStatusChange(e._id, evt.target.value)}
                        className="bg-[#0A0A0C] border border-dark-border rounded-xl px-3 py-1.5 text-xs text-white font-bold focus:border-gold-500 focus:outline-none"
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="FOLLOW-UP">FOLLOW-UP</option>
                        <option value="CLOSED">CLOSED</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs font-bold text-gold-400">Vehicle Interested: {e.vehicleTitle || 'General Inquiry'}</div>
                    <p className="text-xs text-slate-300 bg-[#0A0A0C] p-3 rounded-xl border border-dark-border leading-relaxed">
                      "{e.message}"
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-1">
                    <a
                      href={`tel:${e.phone}`}
                      className="px-3.5 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Customer</span>
                    </a>

                    <a
                      href={`https://wa.me/91${e.phone}?text=${encodeURIComponent(`Hello ${e.customerName}, regarding your enquiry for ${e.vehicleTitle || 'Shital Motors'}...`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    <button
                      onClick={() => handleDelete(e._id)}
                      className="p-2 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-400 hover:bg-rose-900"
                      title="Delete Enquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

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

export default AdminEnquiriesPage;
