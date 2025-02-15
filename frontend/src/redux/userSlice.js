import { createSlice } from '@reduxjs/toolkit';

// Load saved user from localStorage
const savedUser = JSON.parse(localStorage.getItem('user')) || null;
const savedToken = localStorage.getItem('token') || null;

const userSlice = createSlice({
  name: 'user',
  initialState: { user: savedUser, token: savedToken },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(state.user));
      localStorage.setItem('token', state.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;

      // Remove from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
