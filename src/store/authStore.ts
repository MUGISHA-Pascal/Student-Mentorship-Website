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
}

export const useAuthStore = create<AuthState>((set) => ({
  email: '',
  password: '',
  isAuthenticated: false,
  isSubmitting: false,

  login: async (email, password) => {
    set({ isSubmitting: true });
    try {
      const response = await axios.post('https://api.goyoungafrica.org/api/v1/auth/login', { email, password });

      const user = response.data.user;

      localStorage.setItem('authToken', response.data.token);
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
}));