import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Car, 
  PlusCircle, 
  MessageSquare, 
  FileSpreadsheet, 
  Settings, 
  LogOut,
  ExternalLink,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminSidebar = ({ mobileOpen, setMobileOpen }) => {
  const location = useLocation();
  const { logout, admin } = useAuth();

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/vehicles', label: 'Manage Stock', icon: Car },
    { path: '/admin/vehicles/new', label: 'Add New Car', icon: PlusCircle },
    { path: '/admin/enquiries', label: 'Customer Enquiries', icon: MessageSquare },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)} 
          className="fixed inset-0 z-40 bg-black/80 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0D0D11] border-r border-dark-border flex flex-col justify-between transition-transform duration-300 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        
        <div className="p-5 space-y-6">
          {/* Header Branding */}
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gold-500 flex items-center justify-center text-black font-black">
                <Car className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <div className="text-base font-black text-white leading-none">SHITAL <span className="text-gold-500">ADMIN</span></div>
                <div className="text-[10px] text-slate-400 font-semibold tracking-wider">DEALERSHIP PANEL</div>
              </div>
            </Link>
            <button 
              onClick={() => setMobileOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Admin User Info */}
          <div className="p-3 rounded-xl bg-[#16161C] border border-dark-border text-xs">
            <div className="text-slate-400">Logged in as:</div>
            <div className="font-bold text-white truncate">{admin?.name || 'Yogesh Ghongade'}</div>
            <div className="text-gold-400 text-[10px] font-semibold uppercase">{admin?.email}</div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    active
                      ? 'bg-gold-500 text-black shadow-md shadow-gold-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-dark-border/60 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#16161C] text-xs font-semibold text-slate-300 hover:text-gold-400 transition-colors"
          >
            <span>View Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl bg-rose-950/40 text-rose-300 hover:bg-rose-900/60 text-xs font-bold transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Account</span>
          </button>
        </div>

      </aside>
    </>
  );
};

export default AdminSidebar;
