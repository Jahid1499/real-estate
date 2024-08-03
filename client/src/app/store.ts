import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        // other reducer
        // format =>  auth: authSliceReducer
        // auth => reducerName & authSliceReducer => reducer
        auth: authSliceReducer
    },
    devTools: import.meta.env.VITE_ENVIRONMENT_SERVER !== "production",
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares().concat(apiSlice.middleware),
});