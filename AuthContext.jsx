import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('shital_admin_token') || null);
  const [admin, setAdmin] = useState(() => {
    try {
      const savedAdmin = localStorage.getItem('shital_admin_user');
      return savedAdmin ? JSON.parse(savedAdmin) : null;
    } catch (e) {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get('/auth/me');
        if (res.data.success) {
          setAdmin(res.data.admin);
          localStorage.setItem('shital_admin_user', JSON.stringify(res.data.admin));
        } else {
          logout();
        }
      } catch (err) {
        logout();
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [token]);

  const login = (newToken, adminUser) => {
    setToken(newToken);
    setAdmin(adminUser);
    localStorage.setItem('shital_admin_token', newToken);
    localStorage.setItem('shital_admin_user', JSON.stringify(adminUser));
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('shital_admin_token');
    localStorage.removeItem('shital_admin_user');
  };

  return (
    <AuthContext.Provider value={{ token, admin, isAuthenticated: !!token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
