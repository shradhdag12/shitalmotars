import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import Toast from '../components/Toast';
import api from '../services/api';
import { formatCurrency, formatNumber, formatDate } from '../utils/formatters';
import { exportVehiclesToExcel, exportVehiclesToPDF } from '../utils/exportUtils';
import { 
  Car, 
  PlusCircle, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  CheckCircle, 
  XCircle, 
  FileSpreadsheet, 
  FileText,
  AlertTriangle
} from 'lucide-react';

const AdminVehiclesPage = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  useEffect(() => {
    fetchVehicles();
  }, [search, statusFilter]);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (statusFilter) params.append('status', statusFilter);

      const res = await api.get(`/vehicles?${params.toString()}`);
      if (res.data.success) {
        setVehicles(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load vehicles for admin', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'AVAILABLE' ? 'SOLD' : 'AVAILABLE';
    try {
      const res = await api.patch(`/vehicles/${id}/status`, { status: newStatus });
      if (res.data.success) {
        setToast({ message: `Vehicle status updated to ${newStatus}`, type: 'success' });
        fetchVehicles();
      }
    } catch (err) {
      setToast({ message: 'Failed to update status', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/vehicles/${id}`);
      if (res.data.success) {
        setToast({ message: 'Vehicle deleted successfully', type: 'success' });
        setDeleteConfirmId(null);
        fetchVehicles();
      }
    } catch (err) {
      setToast({ message: 'Failed to delete vehicle', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-slate-100 flex">
      <AdminSidebar mobileOpen={mobileSidebarOpen} setMobileOpen={setMobileSidebarOpen} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <AdminHeader
          title="Manage Vehicle Inventory"
          subtitle="Add, edit, change status or delete vehicles from stock"
          onMobileToggle={() => setMobileSidebarOpen(true)}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
          
          {/* Action Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#121216] border border-dark-border rounded-2xl p-5 shadow-xl">
            <div className="flex flex-wrap items-center gap-3 flex-1">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search brand, model..."
                  className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl pl-9 pr-3 py-2 text-sm text-white focus:border-gold-500 focus:outline-none"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#0A0A0C] border border-dark-border rounded-xl px-3 py-2 text-sm text-white focus:border-gold-500 focus:outline-none"
              >
                <option value="">All Statuses</option>
                <option value="AVAILABLE">AVAILABLE</option>
                <option value="SOLD">SOLD</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => exportVehiclesToExcel(vehicles)}
                className="px-3.5 py-2 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 text-xs font-bold flex items-center gap-1.5"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Export Excel</span>
              </button>

              <button
                onClick={() => exportVehiclesToPDF(vehicles)}
                className="px-3.5 py-2 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 hover:bg-rose-900/60 text-xs font-bold flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4" />
                <span>Export PDF</span>
              </button>

              <Link
                to="/admin/vehicles/new"
                className="gold-button px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Vehicle</span>
              </Link>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block bg-[#121216] border border-dark-border rounded-2xl overflow-hidden shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0A0A0C] border-b border-dark-border text-xs text-gold-500 font-bold uppercase tracking-wider">
                  <th className="p-4">Vehicle</th>
                  <th className="p-4">Year</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">KM & Specs</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border/60 text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-400">Loading inventory records...</td>
                  </tr>
                ) : vehicles.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-400">No vehicle records found.</td>
                  </tr>
                ) : (
                  vehicles.map((v) => (
                    <tr key={v._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={v.mainImage || (v.images && v.images[0]?.url) || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=300'}
                            alt={v.model}
                            className="w-14 h-11 object-cover rounded-lg border border-dark-border shrink-0"
                          />
                          <div>
                            <div className="font-bold text-white">{v.brand} {v.model}</div>
                            <div className="text-xs text-slate-400">{v.variant}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-xs font-semibold text-slate-300">
                        <div>Model: {v.modelYear}</div>
                        <div className="text-slate-500">Reg: {v.registrationYear}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-gold-400">{formatCurrency(v.price)}</div>
                        {v.isNegotiable && <span className="text-[10px] text-emerald-400 font-semibold">Negotiable</span>}
                      </td>
                      <td className="p-4 text-xs text-slate-300">
                        <div>{formatNumber(v.kmDriven)} KM</div>
                        <div className="text-slate-400">{v.fuelType} • {v.transmission}</div>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleStatus(v._id, v.status)}
                          className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 border transition-all ${
                            v.status === 'AVAILABLE' 
                              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 hover:bg-rose-950 hover:text-rose-300 hover:border-rose-500' 
                              : 'bg-rose-950/80 text-rose-300 border-rose-500/50 hover:bg-emerald-950 hover:text-emerald-300 hover:border-emerald-500'
                          }`}
                          title="Click to toggle status"
                        >
                          {v.status === 'AVAILABLE' ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                          <span>{v.status}</span>
                        </button>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/cars/${v._id}`}
                            target="_blank"
                            className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white"
                            title="View Customer View"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                          <Link
                            to={`/admin/vehicles/${v._id}/edit`}
                            className="p-2 rounded-lg bg-gold-500/10 border border-gold-500/30 text-gold-400 hover:bg-gold-500 hover:text-black transition-colors"
                            title="Edit Vehicle"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => setDeleteConfirmId(v._id)}
                            className="p-2 rounded-lg bg-rose-950/50 border border-rose-500/30 text-rose-400 hover:bg-rose-900 transition-colors"
                            title="Delete Vehicle"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Responsive Cards View */}
          <div className="block md:hidden space-y-4">
            {loading ? (
              <div className="text-center py-8 text-slate-400">Loading...</div>
            ) : (
              vehicles.map((v) => (
                <div key={v._id} className="bg-[#121216] border border-dark-border rounded-2xl p-4 space-y-3 shadow-lg">
                  <div className="flex items-center gap-3">
                    <img
                      src={v.mainImage || (v.images && v.images[0]?.url) || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=300'}
                      alt={v.model}
                      className="w-16 h-12 object-cover rounded-lg border border-dark-border"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-gold-500 uppercase">{v.brand}</div>
                      <h4 className="text-sm font-bold text-white truncate">{v.model} {v.variant}</h4>
                      <div className="text-xs font-black text-slate-200">{formatCurrency(v.price)}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-dark-border/60 text-xs">
                    <span className="text-slate-400">{v.modelYear} • {v.fuelType} • {formatNumber(v.kmDriven)} KM</span>
                    
                    <button
                      onClick={() => handleToggleStatus(v._id, v.status)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        v.status === 'AVAILABLE' ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
                      }`}
                    >
                      {v.status}
                    </button>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <Link
                      to={`/cars/${v._id}`}
                      target="_blank"
                      className="p-2 rounded-lg bg-white/5 text-slate-300"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>

                    <Link
                      to={`/admin/vehicles/${v._id}/edit`}
                      className="p-2 rounded-lg bg-gold-500/10 text-gold-400"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => setDeleteConfirmId(v._id)}
                      className="p-2 rounded-lg bg-rose-950/50 text-rose-400"
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

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121216] border border-dark-border rounded-2xl p-6 max-w-sm w-full space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-950 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Delete Vehicle Entry?</h3>
              <p className="text-xs text-slate-400">Are you sure you want to permanently remove this vehicle from inventory?</p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2.5 rounded-xl bg-white/5 text-slate-300 text-xs font-bold hover:bg-white/10"
              >
                CANCEL
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-500"
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      )}

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </div>
  );
};

export default AdminVehiclesPage;
