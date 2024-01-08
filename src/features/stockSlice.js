import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brands: [],
  firms: [],
  products: [],
  purchases: [],
  sales: [],
  categories: [],
  loading: false,
  error: false,
};

export const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },

    fetchSuccess: (state, { payload: { data, stockName } }) => {
      state.loading = false;
      state.error = false;
      state[stockName] = data;
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFail } = stockSlice.actions;

export default stockSlice.reducer;
