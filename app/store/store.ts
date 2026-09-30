import { configureStore } from "@reduxjs/toolkit";
import { videosDropdownAPI } from "../services/sectors-api";
import { videosApi } from "../services/videos-api";



export const store = configureStore({
  reducer: {
    [videosDropdownAPI.reducerPath]: videosDropdownAPI.reducer,
    [videosApi.reducerPath]: videosApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      videosApi.middleware,
      videosDropdownAPI.middleware,
    ),
});

export type RootState = ReturnType<
  typeof store.getState
>;

export type AppDispatch = typeof store.dispatch;