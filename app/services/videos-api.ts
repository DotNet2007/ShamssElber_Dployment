

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
  page?: number;
  limit?: number;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: "Code" | "ItemName" | "TDate" | "Item" | "Sector" | "ProdEntity1" | "RecordStatus";
  sortOrder?: "asc" | "desc";
  videoSearch?: string;
  itemSearch?: string;
  sectorSearch?: string;
  productionSearch?: string;
}

export interface ServerVideoFile {
  name: string;
  relativePath: string;
  size: number;
  modifiedAt: string;
}

export interface ServerVideosParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface ServerVideosResponse {
  success: boolean;
  data: {
    currentFolder: string;
    folders: Array<{ name: string; relativePath: string }>;
    videos: ServerVideoFile[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface CreateServerVideoDraftPayload {
  serverRelativePath: string;
  [key: string]: string;
}

export interface VideoUploadProgressHandlers {
  onProgress: (percentage: number) => void;
  onUploadComplete: () => void;
}

// Progress callbacks are kept outside Redux action arguments so RTK's
// serializability checks are not polluted with callback functions.
const uploadProgressListeners = new Map<string, VideoUploadProgressHandlers>();

export function registerVideoUploadProgress(
  uploadId: string,
  handlers: VideoUploadProgressHandlers,
): void {
  uploadProgressListeners.set(uploadId, handlers);
}

export function unregisterVideoUploadProgress(uploadId: string): void {
  uploadProgressListeners.delete(uploadId);
}

interface CreateVideoWithProgressArg {
  formData: FormData;
  uploadId: string;
}

type VideoUploadQueryResult =
  | { data: unknown }
  | { error: { status: number; data: unknown } }
  | { error: { status: "FETCH_ERROR"; error: string } };

function xhrUploadVideo(
  formData: FormData,
  uploadId: string,
): Promise<VideoUploadQueryResult> {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

    if (!baseUrl) {
      resolve({ error: { status: "FETCH_ERROR", error: "NEXT_PUBLIC_API_URL is not configured" } });
      return;
    }

    xhr.open("POST", `${baseUrl}/api/videos`);

    const token = typeof window !== "undefined" ? localStorage.getItem("userToken") : null;
    if (token) xhr.setRequestHeader("Authorization", `Bearer ${token}`);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = Math.min(100, Math.round((event.loaded / event.total) * 100));
        uploadProgressListeners.get(uploadId)?.onProgress(percentage);
      }
    };

    xhr.upload.onload = () => {
      uploadProgressListeners.get(uploadId)?.onProgress(100);
      uploadProgressListeners.get(uploadId)?.onUploadComplete();
    };

    xhr.onload = () => {
      let response: unknown;
      try {
        response = JSON.parse(xhr.responseText);
      } catch {
        response = xhr.responseText;
      }

      if (xhr.status >= 200 && xhr.status < 300) {
        resolve({ data: response });
      } else {
        resolve({ error: { status: xhr.status, data: response } });
      }
    };

    xhr.onerror = () => resolve({ error: { status: "FETCH_ERROR", error: "Network error during video upload" } });
    xhr.onabort = () => resolve({ error: { status: "FETCH_ERROR", error: "Video upload was cancelled" } });
    xhr.send(formData);
  });
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

    // RTK mutation with native XHR upload progress. The Component still uses
    // RTK Query; XMLHttpRequest is encapsulated here to preserve real progress.
    createVideoWithProgress: builder.mutation<any, CreateVideoWithProgressArg>({
      queryFn: async ({ formData, uploadId }) => xhrUploadVideo(formData, uploadId),
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

    getServerVideoFiles: builder.query<ServerVideosResponse, ServerVideosParams>({
      query: ({ page = 1, limit = 30, search = "" }) => ({
        url: "/api/videos/server-files",
        method: "GET",
        params: { page, limit, search },
      }),
    }),

    createServerVideoDraft: builder.mutation<any, CreateServerVideoDraftPayload>({
      query: (body) => ({ url: "/api/videos/server-draft", method: "POST", body }),
      invalidatesTags: ["Videos"],
    }),

    getAllVideos: builder.query<any, VideoListParams>({
      query: ({ page = 1, limit = 20, search = "", dateFrom = "", dateTo = "", sortBy = "Item", sortOrder = "asc", videoSearch = "", itemSearch = "", sectorSearch = "", productionSearch = "" }) => ({
        url: "/api/videos",
        method: "GET",
        params: { page, limit, search, dateFrom, dateTo, sortBy, sortOrder, videoSearch, itemSearch, sectorSearch, productionSearch },
      }),
      providesTags: ["Videos"],
    }),

    getMyVideos: builder.query<any, VideoListParams>({
      query: ({ page = 1, limit = 20, search = "", dateFrom = "", dateTo = "", sortBy = "Item", sortOrder = "asc", videoSearch = "", itemSearch = "", sectorSearch = "", productionSearch = "" }) => ({
        url: "/api/videos/my",
        method: "GET",
        params: { page, limit, search, dateFrom, dateTo, sortBy, sortOrder, videoSearch, itemSearch, sectorSearch, productionSearch },
      }),
      providesTags: ["Videos"],
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
  useCreateVideoMutation,
  useCreateVideoWithProgressMutation,
  useStartAiPreviewMutation,
  useGetAiPreviewStatusQuery,
  useRetryAiPreviewMutation,
  useGetServerVideoFilesQuery,
  useLazyGetServerVideoFilesQuery,
  useCreateServerVideoDraftMutation,
  useGetAllVideosQuery,
  useGetMyVideosQuery,
  useGetVideoByCodeQuery,
  useUpdateVideoMutation,
  useSubmitVideoMutation,
  useDeleteVideoMutation,
  useAdminUpdateVideoMutation,
} = videosApi;













// import { createApi } from "@reduxjs/toolkit/query/react";
// import { baseQueryWithAuthHandling } from "./baseQuery";

// export type AiPreviewStatus = "QUEUED" | "PROCESSING" | "PAUSED" | "COMPLETED" | "FAILED";
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
//   page?: number; limit?: number; search?: string; dateFrom?: string; dateTo?: string;
//   sortBy?: "Code" | "ItemName" | "TDate" | "Item" | "Sector" | "ProdEntity1" | "RecordStatus";
//   sortOrder?: "asc" | "desc"; videoSearch?: string; itemSearch?: string;
//   sectorSearch?: string; productionSearch?: string;
// }

// export const videosApi = createApi({
//   reducerPath: "videosApi",
//   baseQuery: baseQueryWithAuthHandling,
//   tagTypes: ["Videos"],
//   endpoints: (builder) => ({
//     createVideo: builder.mutation<any, FormData>({
//       query: (formData) => ({ url: "/api/videos", method: "POST", body: formData }),
//       invalidatesTags: ["Videos"],
//     }),
//     startAiPreview: builder.mutation<AiPreviewStartResponse, FormData>({
//       query: (formData) => ({ url: "/api/videos/ai-preview", method: "POST", body: formData }),
//     }),
//     getAiPreviewStatus: builder.query<AiPreviewStatusResponse, string>({
//       query: (uploadToken) => `/api/videos/ai-preview/${uploadToken}`,
//     }),
//     retryAiPreview: builder.mutation<AiPreviewStartResponse, string>({
//       query: (uploadToken) => ({ url: `/api/videos/ai-preview/${uploadToken}/retry`, method: "POST" }),
//     }),
//     getAllVideos: builder.query<any, VideoListParams>({
//       query: ({ page = 1, limit = 20, search = "", dateFrom = "", dateTo = "", sortBy = "Item", sortOrder = "asc", videoSearch = "", itemSearch = "", sectorSearch = "", productionSearch = "" }) => ({
//         url: "/api/videos", method: "GET",
//         params: { page, limit, search, dateFrom, dateTo, sortBy, sortOrder, videoSearch, itemSearch, sectorSearch, productionSearch },
//       }), providesTags: ["Videos"],
//     }),
//     getMyVideos: builder.query<any, VideoListParams>({
//       query: ({ page = 1, limit = 20, search = "", dateFrom = "", dateTo = "", sortBy = "Item", sortOrder = "asc", videoSearch = "", itemSearch = "", sectorSearch = "", productionSearch = "" }) => ({
//         url: "/api/videos/my", method: "GET",
//         params: { page, limit, search, dateFrom, dateTo, sortBy, sortOrder, videoSearch, itemSearch, sectorSearch, productionSearch },
//       }), providesTags: ["Videos"],
//     }),
//     getVideoByCode: builder.query<any, number>({
//       query: (code) => ({ url: `/api/videos/${code}`, method: "GET" }),
//       providesTags: (_result, _error, code) => [{ type: "Videos", id: code }],
//     }),
//     updateVideo: builder.mutation<any, { code: number; formData: FormData }>({
//       query: ({ code, formData }) => ({ url: `/api/videos/${code}`, method: "PUT", body: formData }),
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
//       query: ({ code, formData }) => ({ url: `/api/videos/${code}/admin`, method: "PUT", body: formData }),
//       invalidatesTags: ["Videos"],
//     }),
//   }),
// });

// export const {
//   useCreateVideoMutation, useStartAiPreviewMutation, useGetAiPreviewStatusQuery,
//   useRetryAiPreviewMutation, useGetAllVideosQuery, useGetMyVideosQuery,
//   useGetVideoByCodeQuery, useUpdateVideoMutation, useSubmitVideoMutation,
//   useDeleteVideoMutation, useAdminUpdateVideoMutation,
// } = videosApi;
