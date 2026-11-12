

// import { createApi } from "@reduxjs/toolkit/query/react";
// import { baseQueryWithAuthHandling } from "./baseQuery";

// export type AiPreviewStatus = "QUEUED" | "PROCESSING" | "COMPLETED" | "FAILED";

// export interface AiPreviewStartResponse {
//   success: boolean;
//   data: { uploadToken: string; status: AiPreviewStatus };
// }

// export interface AiPreviewStatusResponse {
//   success: boolean;
//   data: {
//     uploadToken: string;
//     status: AiPreviewStatus;
//     content4: string | null;
//     content5: string | null;
//     errorMessage: string | null;
//   };
// }

// export interface VideoListParams {
//   page?: number;
//   limit?: number;
//   search?: string;
//   dateFrom?: string;
//   dateTo?: string;
//   sortBy?: "Code" | "ItemName" | "TDate" | "Item" | "Sector" | "ProdEntity1" | "RecordStatus";
//   sortOrder?: "asc" | "desc";
//   videoSearch?: string;
//   itemSearch?: string;
//   sectorSearch?: string;
//   productionSearch?: string;
// }

// export interface ServerVideoFile {
//   fileName: string;
//   fileSize: number;
//   modifiedAt: string;
// }

// export interface ServerVideoFilesResponse {
//   success: boolean;
//   data: ServerVideoFile[];
// }

// export interface ServerVideoStreamTokenResponse {
//   success: boolean;
//   data: {
//     streamUrl: string;
//     expiresAt: string;
//   };
// }

// export type CreateServerFileVideoRequest = Record<string, string> & {
//   uploadToken: string;
//   serverFileName: string;
// };

// export const videosApi = createApi({
//   reducerPath: "videosApi",
//   baseQuery: baseQueryWithAuthHandling,
//   tagTypes: ["Videos"],
//   endpoints: (builder) => ({
//     createVideo: builder.mutation<any, FormData>({
//       query: (formData) => ({
//         url: "/api/videos",
//         method: "POST",
//         body: formData,
//       }),
//       invalidatesTags: ["Videos"],
//     }),

//     startAiPreview: builder.mutation<AiPreviewStartResponse, FormData>({
//       query: (formData) => ({
//         url: "/api/videos/ai-preview",
//         method: "POST",
//         body: formData,
//       }),
//     }),

//     getAiPreviewStatus: builder.query<AiPreviewStatusResponse, string>({
//       query: (uploadToken) => `/api/videos/ai-preview/${uploadToken}`,
//     }),

//     retryAiPreview: builder.mutation<AiPreviewStartResponse, string>({
//       query: (uploadToken) => ({
//         url: `/api/videos/ai-preview/${uploadToken}/retry`,
//         method: "POST",
//       }),
//     }),

//     getAllVideos: builder.query<any, VideoListParams>({
//       query: ({
//         page = 1,
//         limit = 20,
//         search = "",
//         dateFrom = "",
//         dateTo = "",
//         sortBy = "Item",
//         sortOrder = "asc",
//         videoSearch = "",
//         itemSearch = "",
//         sectorSearch = "",
//         productionSearch = "",
//       }) => ({
//         url: "/api/videos",
//         method: "GET",
//         params: {
//           page,
//           limit,
//           search,
//           dateFrom,
//           dateTo,
//           sortBy,
//           sortOrder,
//           videoSearch,
//           itemSearch,
//           sectorSearch,
//           productionSearch,
//         },
//       }),
//       providesTags: ["Videos"],
//     }),

//     getMyVideos: builder.query<any, VideoListParams>({
//       query: ({
//         page = 1,
//         limit = 20,
//         search = "",
//         dateFrom = "",
//         dateTo = "",
//         sortBy = "Item",
//         sortOrder = "asc",
//         videoSearch = "",
//         itemSearch = "",
//         sectorSearch = "",
//         productionSearch = "",
//       }) => ({
//         url: "/api/videos/my",
//         method: "GET",
//         params: {
//           page,
//           limit,
//           search,
//           dateFrom,
//           dateTo,
//           sortBy,
//           sortOrder,
//           videoSearch,
//           itemSearch,
//           sectorSearch,
//           productionSearch,
//         },
//       }),
//       providesTags: ["Videos"],
//     }),

//     getVideoByCode: builder.query<any, number>({
//       query: (code) => ({ url: `/api/videos/${code}`, method: "GET" }),
//       providesTags: (_result, _error, code) => [{ type: "Videos", id: code }],
//     }),

//     updateVideo: builder.mutation<any, { code: number; formData: FormData }>({
//       query: ({ code, formData }) => ({
//         url: `/api/videos/${code}`,
//         method: "PUT",
//         body: formData,
//       }),
//       invalidatesTags: (_result, _error, { code }) => ["Videos", { type: "Videos", id: code }],
//     }),

//     submitVideo: builder.mutation<any, number>({
//       query: (code) => ({ url: `/api/videos/${code}/submit`, method: "POST" }),
//       invalidatesTags: (_result, _error, code) => ["Videos", { type: "Videos", id: code }],
//     }),

//     deleteVideo: builder.mutation<any, number>({
//       query: (code) => ({ url: `/api/videos/${code}`, method: "DELETE" }),
//       invalidatesTags: (_result, _error, code) => ["Videos", { type: "Videos", id: code }],
//     }),

//     adminUpdateVideo: builder.mutation<any, { code: number; formData: FormData }>({
//       query: ({ code, formData }) => ({
//         url: `/api/videos/${code}/admin`,
//         method: "PUT",
//         body: formData,
//       }),
//       invalidatesTags: ["Videos"],
//     }),

//     getServerVideoFiles: builder.query<ServerVideoFilesResponse, void>({
//       query: () => "/api/videos/server-files",
//     }),

//     createServerVideoStreamToken: builder.mutation<
//       ServerVideoStreamTokenResponse,
//       { fileName: string }
//     >({
//       query: (body) => ({
//         url: "/api/videos/server-files/stream-token",
//         method: "POST",
//         body,
//       }),
//     }),

//     startServerFileAiPreview: builder.mutation<
//       AiPreviewStartResponse,
//       { fileName: string }
//     >({
//       query: (body) => ({
//         url: "/api/videos/ai-preview/server-file",
//         method: "POST",
//         body,
//       }),
//     }),

//     createServerFileVideo: builder.mutation<any, CreateServerFileVideoRequest>({
//       query: (body) => ({
//         url: "/api/videos",
//         method: "POST",
//         body,
//       }),
//       invalidatesTags: ["Videos"],
//     }),
//   }),
// });

// export const {
//   useCreateVideoMutation,
//   useStartAiPreviewMutation,
//   useGetAiPreviewStatusQuery,
//   useRetryAiPreviewMutation,
//   useGetAllVideosQuery,
//   useGetMyVideosQuery,
//   useGetVideoByCodeQuery,
//   useUpdateVideoMutation,
//   useSubmitVideoMutation,
//   useDeleteVideoMutation,
//   useAdminUpdateVideoMutation,
//   useGetServerVideoFilesQuery,
//   useCreateServerVideoStreamTokenMutation,
//   useStartServerFileAiPreviewMutation,
//   useCreateServerFileVideoMutation,
// } = videosApi;



import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthHandling } from "./baseQuery";

export type AiPreviewStatus = "QUEUED" | "PROCESSING" | "PAUSED" | "COMPLETED" | "FAILED";
export interface AiPreviewStartResponse {
  success: boolean;
  data: { uploadToken: string; status: AiPreviewStatus };
}
export interface AiPreviewStatusResponse {
  success: boolean;
  data: {
    uploadToken: string;
    status: AiPreviewStatus;
    content4: string | null;
    content5: string | null;
    errorMessage: string | null;
  };
}
export interface VideoListParams {
  page?: number; limit?: number; search?: string; dateFrom?: string; dateTo?: string;
  sortBy?: "Code" | "ItemName" | "TDate" | "Item" | "Sector" | "ProdEntity1" | "RecordStatus";
  sortOrder?: "asc" | "desc"; videoSearch?: string; itemSearch?: string;
  sectorSearch?: string; productionSearch?: string;
}

export const videosApi = createApi({
  reducerPath: "videosApi",
  baseQuery: baseQueryWithAuthHandling,
  tagTypes: ["Videos"],
  endpoints: (builder) => ({
    createVideo: builder.mutation<any, FormData>({
      query: (formData) => ({ url: "/api/videos", method: "POST", body: formData }),
      invalidatesTags: ["Videos"],
    }),
    startAiPreview: builder.mutation<AiPreviewStartResponse, FormData>({
      query: (formData) => ({ url: "/api/videos/ai-preview", method: "POST", body: formData }),
    }),
    getAiPreviewStatus: builder.query<AiPreviewStatusResponse, string>({
      query: (uploadToken) => `/api/videos/ai-preview/${uploadToken}`,
    }),
    retryAiPreview: builder.mutation<AiPreviewStartResponse, string>({
      query: (uploadToken) => ({ url: `/api/videos/ai-preview/${uploadToken}/retry`, method: "POST" }),
    }),
    getAllVideos: builder.query<any, VideoListParams>({
      query: ({ page = 1, limit = 20, search = "", dateFrom = "", dateTo = "", sortBy = "Item", sortOrder = "asc", videoSearch = "", itemSearch = "", sectorSearch = "", productionSearch = "" }) => ({
        url: "/api/videos", method: "GET",
        params: { page, limit, search, dateFrom, dateTo, sortBy, sortOrder, videoSearch, itemSearch, sectorSearch, productionSearch },
      }), providesTags: ["Videos"],
    }),
    getMyVideos: builder.query<any, VideoListParams>({
      query: ({ page = 1, limit = 20, search = "", dateFrom = "", dateTo = "", sortBy = "Item", sortOrder = "asc", videoSearch = "", itemSearch = "", sectorSearch = "", productionSearch = "" }) => ({
        url: "/api/videos/my", method: "GET",
        params: { page, limit, search, dateFrom, dateTo, sortBy, sortOrder, videoSearch, itemSearch, sectorSearch, productionSearch },
      }), providesTags: ["Videos"],
    }),
    getVideoByCode: builder.query<any, number>({
      query: (code) => ({ url: `/api/videos/${code}`, method: "GET" }),
      providesTags: (_result, _error, code) => [{ type: "Videos", id: code }],
    }),
    updateVideo: builder.mutation<any, { code: number; formData: FormData }>({
      query: ({ code, formData }) => ({ url: `/api/videos/${code}`, method: "PUT", body: formData }),
      invalidatesTags: (_result, _error, { code }) => ["Videos", { type: "Videos", id: code }],
    }),
    submitVideo: builder.mutation<any, number>({
      query: (code) => ({ url: `/api/videos/${code}/submit`, method: "POST" }),
      invalidatesTags: (_result, _error, code) => ["Videos", { type: "Videos", id: code }],
    }),
    deleteVideo: builder.mutation<any, number>({
      query: (code) => ({ url: `/api/videos/${code}`, method: "DELETE" }),
      invalidatesTags: (_result, _error, code) => ["Videos", { type: "Videos", id: code }],
    }),
    adminUpdateVideo: builder.mutation<any, { code: number; formData: FormData }>({
      query: ({ code, formData }) => ({ url: `/api/videos/${code}/admin`, method: "PUT", body: formData }),
      invalidatesTags: ["Videos"],
    }),
  }),
});

export const {
  useCreateVideoMutation, useStartAiPreviewMutation, useGetAiPreviewStatusQuery,
  useRetryAiPreviewMutation, useGetAllVideosQuery, useGetMyVideosQuery,
  useGetVideoByCodeQuery, useUpdateVideoMutation, useSubmitVideoMutation,
  useDeleteVideoMutation, useAdminUpdateVideoMutation,
} = videosApi;
