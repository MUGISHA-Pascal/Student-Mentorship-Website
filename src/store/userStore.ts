import { create } from "zustand";
import axios from "axios";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  gender: string;
  role: string;
  filledForm: boolean;
  approved: boolean;
  filledProfile: boolean;
  createdAt: string;
  updatedAt: string;
  studentId?: string | null;
}

interface Role {
  id: string;
  userId: string;
  bio?: string | null;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface UserStore {
  user: User | null;
  role: Role | null;
  loading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  role: null,
  loading: false,
  error: null,

  fetchUser: async () => {
    try {
      set({ loading: true, error: null });

      // Retrieve token from local storage
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found.");

      // Fetch user info
      // const userResponse = await axios.get("https://api.goyoungafrica.org/api/v1/user", {
      const userResponse = await axios.get(
        "http://localhost:3000/api/v1/user",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      let user = userResponse.data.user;

      // console.log("User response", userResponse.data.user);

      if (user.role === "MENTOR") {
        user = { ...user, role: "COACH" };
      }
      // Fetch role-specific data
      const roleResponse = await axios.get(
        // `https://api.goyoungafrica.org/api/v1/user/get-entity?table=${user.role.toLowerCase()}`,
        `http://localhost:3000/api/v1/user/get-entity?table=${user.role.toLowerCase()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const role = roleResponse.data;
      // console.log("Role", role);

      // Update store
      set({ user, role, loading: false });
      // console.log("Updated user:", user);
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message, loading: false });
      } else {
        set({ error: "An unknown error occurred", loading: false });
      }
    }
  },
}));
