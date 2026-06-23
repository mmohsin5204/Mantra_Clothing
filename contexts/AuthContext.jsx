import { createContext, useContext, useEffect, useState } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from token on mount
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('mantra_token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await authApi.getMe();
        setUser(data.user);
      } catch (error) {
        console.error('Failed to load user:', error);
        localStorage.removeItem('mantra_token');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('mantra_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mantra_user');
    }
  }, [user]);

  const login = async ({ email, password }) => {
    try {
      const data = await authApi.login({ email, password });
      localStorage.setItem('mantra_token', data.token);
      setUser(data.user);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const register = async ({ name, email, password }) => {
    try {
      const data = await authApi.register({ name, email, password });
      localStorage.setItem('mantra_token', data.token);
      setUser(data.user);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('mantra_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
