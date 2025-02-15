import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage
const savedCart = JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0, discount: 0, coupon: "" };

const cartSlice = createSlice({
  name: 'cart',
  initialState: savedCart,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((item) => item._id === product._id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      state.total = parseFloat((state.total + product.price).toFixed(2));
      localStorage.setItem('cart', JSON.stringify(state));
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item) {
        item.quantity += 1;
        state.total = parseFloat((state.total + item.price).toFixed(2));
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          state.total = parseFloat((state.total - item.price).toFixed(2));
        } else {
          state.items = state.items.filter((product) => product._id !== action.payload);
          state.total = parseFloat((state.total - item.price).toFixed(2));
        }
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.discount = 0;
      state.coupon = "";
      localStorage.removeItem('cart');
    },
    applyCoupon: (state, action) => {
      const coupon = action.payload;
      let discount = 0;

      if (coupon === "SAVE10") discount = state.total * 0.1;
      if (coupon === "SAVE20") discount = state.total * 0.2;

      state.coupon = coupon;
      state.discount = parseFloat(discount.toFixed(2));
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, clearCart, applyCoupon } = cartSlice.actions;
export default cartSlice.reducer;
