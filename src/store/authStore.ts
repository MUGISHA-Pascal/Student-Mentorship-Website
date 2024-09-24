import { create } from 'zustand';
import axios from 'axios';

interface AuthState {
    email: string;
    password: string;
    isAuthenticated: boolean;
    isSubmitting: boolean;
    login: (email: string, password: string) => Promise<void>;
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
    //   const response = await axios.post('https://api.goyoungafrica.org/api/v1/auth/login', { email, password });
    const response = await axios.post('http://localhost:3000/api/v1/auth/login', { email, password });
      localStorage.setItem('authToken', response.data.token);
      set({ isAuthenticated: true });        
    } catch (error) {
        console.error("Login failed", error);
        set({ isAuthenticated: false });
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