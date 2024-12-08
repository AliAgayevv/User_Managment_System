import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/slices/users/userSlice"; // Correct import path for the reducer

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
