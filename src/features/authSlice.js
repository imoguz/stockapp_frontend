import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  tokenData: null,
  loading: false,
  error: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },

    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.user = payload.user;
      state.tokenData = payload.tokenData;
    },

    logoutSuccess: (state) => {
      state.loading = false;
      state.error = false;
      state.user = null;
      state.tokenData = null;
    },

    registerSuccess: (state) => {
      state.loading = false;
      state.error = false;
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  fetchFail,
} = authSlice.actions;

export default authSlice.reducer;
