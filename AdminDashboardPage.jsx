import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import StatsCard from '../components/StatsCard';
import api from '../services/api';
import { formatCurrency, formatDate } from '../utils/formatters';
import { 
  Car, 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  MessageSquare, 
  PlusCircle, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

const AdminDashboardPage = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalVehicles: 0,
    availableVehicles: 0,
    soldVehicles: 0,
    newStockVehicles: 0,
    totalEnquiries: 0,
    newEnquiries: 0
  });
  const [recentVehicles, setRecentVehicles] = useState([]);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/dashboard/stats');
      if (res.data.success) {
        setStats(res.data.data);
      }

      const vehRes = await api.get('/vehicles?limit=6');
      if (vehRes.data.success) {
        setRecentVehicles(vehRes.data.data);
      }

      const enqRes = await api.get('/enquiries');
      if (enqRes.data.success) {
        setRecentEnquiries(enqRes.data.data.slice(0, 4));
      }
    } catch (err) {
      console.error('Error fetching dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-slate-100 flex">
      {/* Sidebar */}
      <AdminSidebar mobileOpen={mobileSidebarOpen} setMobileOpen={setMobileSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <AdminHeader
          title="Admin Dashboard"
          subtitle="Shital Motors Inventory & Customer Overview"
          onMobileToggle={() => setMobileSidebarOpen(true)}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl">
          
          {/* Top Statistics Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatsCard
              title="Total Inventory"
              value={stats.totalVehicles}
              icon={Car}
              color="gold"
              description="Vehicles registered in database"
            />
            <StatsCard
              title="Available Stock"
              value={stats.availableVehicles}
              icon={CheckCircle}
              color="emerald"
              description="Ready for sale on website"
            />
            <StatsCard
              title="Sold Vehicles"
              value={stats.soldVehicles}
              icon={XCircle}
              color="rose"
              description="Marked as sold"
            />
            <StatsCard
              title="Customer Enquiries"
              value={stats.totalEnquiries}
              icon={MessageSquare}
              color="blue"
              description={`${stats.newEnquiries || 0} new unread queries`}
            />
          </div>

          {/* Quick Actions Bar */}
          <div className="bg-[#121216] border border-dark-border rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white">Quick Management Actions</h3>
              <p className="text-xs text-slate-400">Add new vehicles, review customer enquiries, or edit business settings.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/admin/vehicles/new"
                className="gold-button px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add New Vehicle</span>
              </Link>

              <Link
                to="/admin/enquiries"
                className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-200 hover:bg-white/10 flex items-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4 text-gold-500" />
                <span>View Enquiries</span>
              </Link>
            </div>
          </div>

          {/* Recently Added Stock Widgets */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-white">Recently Added Stock</h3>
                <p className="text-xs text-slate-400">Latest pre-owned vehicle entries added to inventory</p>
              </div>
              <Link to="/admin/vehicles" className="text-xs font-bold text-gold-400 hover:text-gold-300 flex items-center gap-1">
                <span>View All Inventory</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {recentVehicles.map((v) => (
                <div key={v._id} className="bg-[#121216] border border-dark-border rounded-2xl p-4 flex gap-4 items-center">
                  <img
                    src={v.mainImage || (v.images && v.images[0]?.url) || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=400'}
                    alt={v.model}
                    className="w-20 h-16 object-cover rounded-xl border border-dark-border shrink-0"
                  />
                  <div className="space-y-1 min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-gold-500 uppercase">{v.brand}</span>
                    <h4 className="text-sm font-bold text-white truncate">{v.model}</h4>
                    <div className="text-xs font-black text-slate-200">{formatCurrency(v.price)}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                    v.status === 'AVAILABLE' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-rose-950 text-rose-400 border border-rose-500/40'
                  }`}>
                    {v.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Customer Enquiries */}
          <div className="bg-[#121216] border border-dark-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-dark-border pb-3">
              <h3 className="text-base font-bold text-white">Recent Customer Enquiries</h3>
              <Link to="/admin/enquiries" className="text-xs font-bold text-gold-400">View All →</Link>
            </div>

            {recentEnquiries.length === 0 ? (
              <div className="text-center py-6 text-xs text-slate-400">No customer enquiries received yet.</div>
            ) : (
              <div className="space-y-3">
                {recentEnquiries.map((e) => (
                  <div key={e._id} className="p-3 rounded-xl bg-[#0A0A0C] border border-dark-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <div className="font-bold text-white">{e.customerName} <span className="text-slate-400">({e.phone})</span></div>
                      <div className="text-gold-400 font-semibold">{e.vehicleTitle || 'General Enquiry'}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500">{formatDate(e.createdAt)}</span>
                      <span className="px-2.5 py-1 rounded bg-blue-950 text-blue-300 font-bold uppercase text-[10px]">
                        {e.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
