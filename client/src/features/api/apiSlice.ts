/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_URL,
    prepareHeaders: async (headers, { getState }) => {
        const token: string | undefined = getState()?.auth?.accessToken ?? undefined;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        return headers;
    },
});

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: async (args, api, extraOptions) => {
        const result = await baseQuery(args, api, extraOptions);

        if (result?.error?.status === 401) {
            api.dispatch(userLoggedOut());
            localStorage.clear();
        }
        return result;
    },
    tagTypes: [],
    endpoints: (_builder) => ({}),
});
