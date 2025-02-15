import { createSlice } from "@reduxjs/toolkit";

const savedDriver = JSON.parse(localStorage.getItem("driver")) || null;
const savedToken = localStorage.getItem("driverToken") || null;

const driverSlice = createSlice({
  name: "driver",
  initialState: { driver: savedDriver, token: savedToken },
  reducers: {
    driverLogin: (state, action) => {
      state.name = action.payload.name;
      state.driver = action.payload.driver;
      state.token = action.payload.token;
      localStorage.setItem("driver", JSON.stringify(state.driver));
      localStorage.setItem("driverToken", state.token);
    },
    driverLogout: (state) => {
      state.driver = null;
      state.token = null;
      state.name = null;
      localStorage.removeItem("driver");
      localStorage.removeItem("driverToken");
    },
  },
});

export const { driverLogin, driverLogout } = driverSlice.actions;
export default driverSlice.reducer;
