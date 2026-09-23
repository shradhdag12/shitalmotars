import React from 'react';

const StatsCard = ({ title, value, icon: Icon, color = 'gold', description }) => {
  const colorStyles = {
    gold: 'border-gold-500/30 text-gold-400 bg-gold-500/10',
    emerald: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
    rose: 'border-rose-500/30 text-rose-400 bg-rose-500/10',
    blue: 'border-blue-500/30 text-blue-400 bg-blue-500/10'
  };

  return (
    <div className="bg-[#121216] border border-dark-border rounded-2xl p-5 space-y-3 shadow-lg hover:border-dark-hover transition-all">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</span>
        <div className={`p-2.5 rounded-xl border ${colorStyles[color] || colorStyles.gold}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="text-3xl font-black text-white tracking-tight">{value}</div>
      {description && <div className="text-xs text-slate-400">{description}</div>}
    </div>
  );
};

export default StatsCard;
