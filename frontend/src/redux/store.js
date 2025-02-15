import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import adminReducer from "./adminSlice"; // ✅ Import adminSlice
import driverReducer from "./driverSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    products: productReducer,
    admin: adminReducer,
    driver: driverReducer
  },
});
