import { createSlice } from "@reduxjs/toolkit";

// Cart is saved in localStorage so it survives a page refresh
const loadCart = () => {
  try {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: loadCart() },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) existing.qty += 1;
      else state.items.push({ ...action.payload, qty: 1 });
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    changeQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) item.qty = Math.max(1, item.qty + action.payload.delta);
    },
    clearCart: (state) => { state.items = []; },
  },
});

export const { addToCart, removeFromCart, changeQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
