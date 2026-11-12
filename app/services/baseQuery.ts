import { fetchBaseQuery, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

const rawBaseQuery = fetchBaseQuery({

    baseUrl: process.env.NEXT_PUBLIC_API_URL,

    prepareHeaders: (headers) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("userToken");

            if (token) {
            headers.set("Authorization", `Bearer ${token}`);
            }
        }

        headers.set("ngrok-skip-browser-warning", "true");

        return headers;
        },
});

export const baseQueryWithAuthHandling: BaseQueryFn< string | FetchArgs, unknown, FetchBaseQueryError > = 
    async (args, api, extraOptions) => {
        const result = await rawBaseQuery(args, api, extraOptions);

        if (result.error?.status === 401) {
            if (typeof window !== "undefined") {
            localStorage.removeItem("userToken");

            window.location.href = "/sign-in";
            }
        }

  return result;
};