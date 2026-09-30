import { configureStore } from "@reduxjs/toolkit";
import { videosDropdownAPI } from "../services/sectors-api";



export const store = configureStore({
  reducer: {
    [videosDropdownAPI.reducerPath]: videosDropdownAPI.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      videosDropdownAPI.middleware
    ),
});

export type RootState = ReturnType<
  typeof store.getState
>;

export type AppDispatch = typeof store.dispatch;