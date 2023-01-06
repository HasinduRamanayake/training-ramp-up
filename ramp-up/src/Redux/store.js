import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Reducer";

export const store = configureStore({
  reducer: {
    auth:authSlice.reducer
  },
});

