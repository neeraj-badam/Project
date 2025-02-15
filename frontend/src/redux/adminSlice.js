import { createSlice } from "@reduxjs/toolkit";

// Load saved admin from localStorage
const savedAdmin = JSON.parse(localStorage.getItem("admin")) || null;
const savedAdminToken = localStorage.getItem("adminToken") || null;

const adminSlice = createSlice({
  name: "admin",
  initialState: { admin: savedAdmin, token: savedAdminToken },
  reducers: {
    adminLogin: (state, action) => {
      state.admin = action.payload.admin;
      state.token = action.payload.token;

      // Save to localStorage
      localStorage.setItem("admin", JSON.stringify(state.admin));
      localStorage.setItem("adminToken", state.token);
    },
    adminLogout: (state) => {
      state.admin = null;
      state.token = null;

      // Remove from localStorage
      localStorage.removeItem("admin");
      localStorage.removeItem("adminToken");
    },
  },
});

export const { adminLogin, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
