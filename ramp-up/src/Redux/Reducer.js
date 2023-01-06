import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    tokens: null,
  },

  reducers: {
    addToken: (state = [], action) => {
      state.tokens = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
