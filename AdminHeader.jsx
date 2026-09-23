import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminHeader = ({ title, subtitle, onMobileToggle }) => {
  const { admin } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-[#0A0A0C]/90 backdrop-blur-md border-b border-dark-border px-4 sm:px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileToggle}
          className="lg:hidden p-2 rounded-xl bg-[#121216] border border-dark-border text-slate-300 hover:text-white"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">{title}</h1>
          {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>System Online</span>
        </div>

        <div className="w-9 h-9 rounded-xl bg-gold-500 text-black font-extrabold flex items-center justify-center text-sm shadow-md">
          {admin?.name ? admin.name[0] : 'Y'}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
