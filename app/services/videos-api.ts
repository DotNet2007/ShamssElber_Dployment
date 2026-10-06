import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthHandling } from "./baseQuery";

export const videosApi = createApi({
  reducerPath: "videosApi",

  baseQuery: baseQueryWithAuthHandling,

  // baseQuery: fetchBaseQuery({
  //   baseUrl: process.env.NEXT_PUBLIC_API_URL,

  //   prepareHeaders: (headers) => {
  //     const token = localStorage.getItem("userToken");

  //     if (token) {
  //       headers.set(
  //         "Authorization",
  //         `Bearer ${token}`
  //       );
  //     }

  //     // Do NOT set Content-Type here.
  //     // FormData will set multipart/form-data automatically.

  //     return headers;
  //   },
  // }),

  tagTypes: ["Videos"],

  endpoints: (builder) => ({

    // ==============================
    // CREATE VIDEO
    // ==============================
    createVideo: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/api/videos",
        method: "POST",
        body: formData,
      }),

      invalidatesTags: ["Videos"],

    }),

    // ==============================
    // GET ALL VIDEOS
    // ==============================
    getAllVideos: builder.query<any, { page?: number; limit?: number; search?: string, dateFrom?: string; dateTo?: string; sortBy?: "Code" | "ItemName" | "TDate" | "Item" | "Sector" | "ProdEntity1"; sortOrder?: "asc" | "desc"; videoSearch?: string; itemSearch?: string; sectorSearch?: string; productionSearch?: string; }>({
      query: ({ page = 1, limit = 20, search = "", dateFrom = "", dateTo = "", sortBy = "Item", sortOrder = "asc", videoSearch = "", itemSearch = "", sectorSearch = "", productionSearch = "", }) => ({
        url: "/api/videos",
        method: "GET",
        params: { page, limit, search, dateFrom , dateTo, sortBy, sortOrder, videoSearch, itemSearch, sectorSearch, productionSearch },
      }),

      providesTags: ["Videos"],

    }),

    /* =====================================================
    GET MY VIDEOS
    GET /api/videos/my
    ===================================================== */
    getMyVideos: builder.query<any, { page?: number; limit?: number; search?: string, dateFrom?: string; dateTo?: string; sortBy?: "Code" | "ItemName" | "TDate" | "Item" | "Sector" | "ProdEntity1"; sortOrder?: "asc" | "desc"; videoSearch?: string; itemSearch?: string; sectorSearch?: string; productionSearch?: string; }>({
      query: ({ page = 1, limit = 20, search = "", dateFrom = "", dateTo = "", sortBy = "Item", sortOrder = "asc", videoSearch = "", itemSearch = "", sectorSearch = "", productionSearch = "", }) => ({
        url: "/api/videos/my",
        method: "GET",
        params: { page, limit, search, dateFrom , dateTo, sortBy, sortOrder, videoSearch, itemSearch, sectorSearch, productionSearch },
      }),

      providesTags: ["Videos"],

    }),

    

    getVideoByCode: builder.query<any, number>({
      query: (code) => ({
        url: `/api/videos/${code}`,
        method: "GET",
      }),

      providesTags: (_result, _error, code) => [
        {
          type: "Videos",
          id: code,
        },
      ],

    }),

    updateVideo: builder.mutation<any, { code: number; formData: FormData }>({
      query: ({ code, formData }) => ({
        url: `/api/videos/${code}`,
        method: "PUT",
        body: formData,
      }),

      invalidatesTags: (_result, _error, { code }) => [
        "Videos",
        {
          type: "Videos",
          id: code,
        },
      ],

    }),

    submitVideo: builder.mutation<any, number>({
      query: (code) => ({
        url: `/api/videos/${code}/submit`,
        method: "POST",
      }),

      invalidatesTags: (_result, _error, code) => [
        "Videos",
        {
          type: "Videos",
          id: code,
        },
      ],

    }),

    deleteVideo: builder.mutation<any, number>({
      query: (code) => ({
        url: `/api/videos/${code}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, code) => [
        "Videos",
        { type: "Videos", id: code },
      ],
    }),


  }),
});

export const {
  useCreateVideoMutation,
  useGetAllVideosQuery,
  useGetMyVideosQuery,
  useGetVideoByCodeQuery,
  useUpdateVideoMutation,
  useSubmitVideoMutation,
  useDeleteVideoMutation
} = videosApi;