import { create } from 'zustand';
import axios from 'axios';

interface AuthState {
  email: string;
  password: string;
  isAuthenticated: boolean;
  isSubmitting: boolean;
  login: (email: string, password: string) => Promise<{ user: { role: string } }>;
  logout: () => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  checkAuth: () => void; // New function to verify authentication on app load
}

export const useAuthStore = create<AuthState>((set) => ({
  email: '',
  password: '',
  isAuthenticated: !!localStorage.getItem('authToken'), // Check if token exists
  isSubmitting: false,

  login: async (email, password) => {
    set({ isSubmitting: true });
    try {
      const response = await axios.post('https://api.goyoungafrica.org/api/v1/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('email', email);
      localStorage.setItem('authToken', token);
      set({ isAuthenticated: true });

      return { user };
    } catch (error) {
      console.error("Login failed", error);
      set({ isAuthenticated: false });
      throw error;
    } finally {
      set({ isSubmitting: false });
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
    set({ isAuthenticated: false, email: '', password: '' });
  },

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),

  // Function to check if user is authenticated on app start
  checkAuth: () => {
    const token = localStorage.getItem('authToken');
    set({ isAuthenticated: !!token });
  },
}));
