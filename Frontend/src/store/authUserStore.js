import { create } from "zustand";
import api from "../api/axiosConfig";
import { USER_API } from "../api/apiEndPoint";

const useAuthStore = create((set) => ({
  loading: false,
  token: localStorage.getItem("auth_token") || null,
  user: null,
  error: null,
  authReady: false,

  login: async (identifier, password) => {
    set({ loading: true });
    try {
      const res = await api.post(USER_API.USER_LOGIN, identifier, password);
      const { token } = res.data;
      localStorage.setItem("auth_token", token);
      const userRes = await api.get(USER_API.GET_USER_DETAILS);
      set({ user: userRes.data, token });
    } catch (err) {
      set({ error: err });
    } finally {
      set({ loading: false });
    }
  },
  logout: () => {
    localStorage.removeItem("auth_token");
    set({ user: null, token: null });
  },

  getUserData: async () => {
    const token = localStorage.getItem("auth_token");
       if (!token) {
      set({ authReady: true }); 
      return;
    }
    set({ loading: true });
    try {
      const res = await api.get(USER_API.GET_USER_DETAILS);
      set({ user: res.data });
    } catch (err) {
      set({ error: err });
    } finally {
      set({ loading: false,authReady: true });
    }
  },

  register: async (fullname, uname, email, password) => {
    set({ loading: true });
    try {
      const res = await api.post(
        USER_API.USER_REGISTER,
        fullname,
        uname,
        email,
        password
      );
      const { token } = res.data;
      localStorage.setItem("auth_token", token);
      const userRes = await api.get("/users/me");
      set({ user: userRes.data, token });
    } catch (err) {
      set({ error: err });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuthStore;
