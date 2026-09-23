import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Car, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('admin@shitalmotors.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        login(res.data.token, res.data.admin);
        navigate('/admin');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#121216] border border-dark-border rounded-2xl p-8 space-y-6 shadow-2xl">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-gold-500 flex items-center justify-center text-black font-extrabold mx-auto shadow-lg shadow-gold-500/20">
            <Car className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">SHITAL <span className="text-gold-500">MOTORS</span></h1>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Admin Management Portal</p>
          </div>
        </div>

        {/* Demo Credentials Alert */}
        <div className="p-3 rounded-xl bg-gold-500/10 border border-gold-500/30 text-xs text-gold-300 space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-gold-500" />
            <span>Default Seed Credentials</span>
          </div>
          <div>Email: <code className="bg-black/40 px-1.5 py-0.5 rounded text-white">admin@shitalmotors.com</code></div>
          <div>Password: <code className="bg-black/40 px-1.5 py-0.5 rounded text-white">admin123</code></div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-semibold">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Admin Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@shitalmotors.com"
                className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:border-gold-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:border-gold-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="gold-button w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>LOG IN TO DASHBOARD</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <Link to="/" className="text-xs text-slate-400 hover:text-white transition-colors">
            ← Return to Customer Website
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AdminLoginPage;
