import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "/auth/registration",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    localStorage.setItem(
                        "auth",
                        JSON.stringify({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );

                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );
                } catch (err) {
                    // do nothing
                }
            },
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data,
            }),

            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    localStorage.setItem(
                        "auth",
                        JSON.stringify({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );

                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );
                } catch (err) {
                    // do nothing
                }
            },
        }),

        googleLogin: builder.mutation({
            query: (data) => ({
                url: "/auth/google",
                method: "POST",
                body: data,
            }),

            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    localStorage.setItem(
                        "auth",
                        JSON.stringify({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );

                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );
                } catch (err) {
                    // do nothing
                }
            },
        }),

        userUpdate: builder.mutation({
            query: (data) => ({
                url: "/auth/update",
                method: "PUT",
                body: data,
            }),
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    let localStorageOldData = JSON.parse(localStorage.getItem('auth') as string);

                    localStorageOldData = {
                        ...localStorageOldData,
                        user: result.data.user,
                    }

                    localStorage.setItem("auth", JSON.stringify(localStorageOldData));

                    dispatch(userLoggedIn(localStorageOldData));
                } catch (err) {
                    // do nothing
                }
            },
        }),

        userDelete: builder.mutation({
            query: (data) => ({
                url: "/auth/delete",
                method: "delete",
                body: data,
            }),

            async onQueryStarted(_arg, { dispatch }) {
                try {
                    dispatch(userLoggedOut());
                    localStorage.clear();
                } catch (err) {
                    // do nothing
                }
            },
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useGoogleLoginMutation, useUserUpdateMutation, useUserDeleteMutation } = authApi;
