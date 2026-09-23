import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Car, 
  Phone, 
  MessageSquare, 
  Heart, 
  Moon, 
  Sun, 
  Globe, 
  User, 
  Menu, 
  X, 
  LayoutDashboard,
  LogOut
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { lang, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { count: wishlistCount } = useWishlist();
  const { isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const phone = '8552085279';
  const whatsapp = '9764706002';
  const contactPerson = 'Yogesh Ghongade';

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/cars', label: t('nav.availableStock') },
    { path: '/rental', label: t('nav.rental') },
    { path: '/services', label: t('nav.services') },
    { path: '/about', label: t('nav.about') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0A0A0C]/90 backdrop-blur-md border-b border-dark-border">
      {/* Top Banner with Business Contacts */}
      <div className="bg-[#121216] border-b border-dark-border/50 py-1.5 px-4 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-gold-500">{contactPerson}</span>
            <a href={`tel:${phone}`} className="flex items-center gap-1 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-gold-500" />
              <span>{phone}</span>
            </a>
            <a 
              href={`https://wa.me/91${whatsapp}`} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{whatsapp}</span>
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4 text-slate-400">
            <span>✨ Used Cars Buying & Selling</span>
            <span>📍 Maharashtra</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-black font-extrabold shadow-lg shadow-gold-500/20 group-hover:scale-105 transition-transform">
              <Car className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                SHITAL <span className="text-gold-500">MOTORS</span>
              </div>
              <div className="text-[10px] tracking-wider text-slate-400 uppercase font-medium">
                Used Cars Buying & Selling
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#121216]/60 p-1.5 rounded-full border border-dark-border">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-gold-500 text-black shadow-md shadow-gold-500/20 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Wishlist Icon */}
            <Link 
              to="/wishlist" 
              className="relative p-2.5 rounded-xl bg-[#121216] border border-dark-border text-slate-300 hover:text-white hover:border-gold-500/50 transition-all"
              title="Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gold-500 text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#121216] border border-dark-border text-xs font-semibold text-slate-200 hover:border-gold-500/50 transition-all"
              title="Toggle Language"
            >
              <Globe className="w-4 h-4 text-gold-500" />
              <span>{lang === 'en' ? 'EN | मराठी' : 'मराठी | EN'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-[#121216] border border-dark-border text-slate-300 hover:text-gold-500 transition-all"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-gold-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>

            {/* Admin Login / Dashboard */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/admin"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-500/10 border border-gold-500/40 text-gold-400 text-sm font-semibold hover:bg-gold-500 hover:text-black transition-all"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-800/40 text-rose-400 hover:bg-rose-900/60 transition-all"
                  title="Logout Admin"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#16161C] border border-dark-border text-slate-300 text-sm font-semibold hover:text-white hover:border-gold-500/50 transition-all"
              >
                <User className="w-4 h-4 text-gold-500" />
                <span>Admin</span>
              </Link>
            )}
          </div>

          {/* Mobile Right Quick Action & Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to="/wishlist"
              className="relative p-2.5 rounded-xl bg-[#121216] border border-dark-border text-slate-300"
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-500 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-gold-500 text-black font-bold focus:outline-none"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D0D11] border-b border-dark-border px-4 pt-2 pb-6 space-y-3">
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 min-h-[44px] rounded-xl text-base font-semibold transition-all ${
                  isActive(link.path)
                    ? 'bg-gold-500 text-black'
                    : 'text-slate-200 hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-dark-border grid grid-cols-2 gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center gap-2 py-3 min-h-[44px] rounded-xl bg-[#16161C] border border-dark-border text-sm font-semibold text-slate-200"
            >
              <Globe className="w-4 h-4 text-gold-500" />
              <span>{lang === 'en' ? 'EN | मराठी' : 'मराठी | EN'}</span>
            </button>

            <button
              onClick={toggleTheme}
              className="flex items-center justify-center gap-2 py-3 min-h-[44px] rounded-xl bg-[#16161C] border border-dark-border text-sm font-semibold text-slate-200"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-gold-400" /> : <Moon className="w-4 h-4" />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <a
              href={`tel:${phone}`}
              className="flex items-center justify-center gap-2 py-3 min-h-[44px] rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-semibold text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Call</span>
            </a>
            <a
              href={`https://wa.me/91${whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-3 min-h-[44px] rounded-xl bg-emerald-600 text-white font-semibold text-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="pt-2">
            {isAuthenticated ? (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 min-h-[44px] rounded-xl bg-gold-500 text-black font-bold text-sm"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </Link>
            ) : (
              <Link
                to="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 min-h-[44px] rounded-xl bg-[#16161C] border border-dark-border text-slate-300 font-semibold text-sm"
              >
                <User className="w-4 h-4 text-gold-500" />
                <span>Admin Login</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
