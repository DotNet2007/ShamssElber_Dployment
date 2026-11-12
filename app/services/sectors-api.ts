import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const videosDropdownAPI = createApi({
  reducerPath: "videosDropdownAPI",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,

    prepareHeaders: (headers) => {
      // Get JWT token
      const token = localStorage.getItem("userToken");

      if (token) {
        headers.set(
          "Authorization",
          `Bearer ${token}`
        );
      }

      headers.set(
        "Content-Type",
        "application/json"
      );

      headers.set("ngrok-skip-browser-warning", "true");

      return headers;
    },
  }),

  endpoints: (builder) => ({

    // =====================================================
    // PRODUCT ENTITY ONE
    // =====================================================
    getProductEntityOne: builder.query<any[], void>({
      query: () => "/api/dropdown/product-entity-one",
    }),

    addProductEntityOne: builder.mutation<any, { DescA: string }>({
      query: (body) => ({
        url: "/api/dropdown/admin/product-entity-one",
        method: "POST",
        body,
      }),
    }),

    updateProductEntityOne: builder.mutation<any, { code: number; DescA: string }>({
      query: ({ code, DescA }) => ({
        url: `/api/dropdown/admin/product-entity-one/${code}`,
        method: "PATCH",
        body: { DescA },
      }),
    }),

    deleteProductEntityOne: builder.mutation<any, number>({
      query: (code) => ({
        url: `/api/dropdown/admin/product-entity-one/${code}`,
        method: "DELETE",
      }),
    }),


    // =====================================================
    // PRODUCT ENTITY TWO
    // =====================================================
    getProductEntityTwo: builder.query<any[], void>({
      query: () => "/api/dropdown/product-entity-two",
    }),

    addProductEntityTwo: builder.mutation<any, { DescA: string }>({
      query: (body) => ({
        url: "/api/dropdown/admin/product-entity-two",
        method: "POST",
        body,
      }),
    }),

    updateProductEntityTwo: builder.mutation<any, { code: number; DescA: string }>({
      query: ({ code, DescA }) => ({
        url: `/api/dropdown/admin/product-entity-two/${code}`,
        method: "PATCH",
        body: { DescA },
      }),
    }),

    deleteProductEntityTwo: builder.mutation<any, number>({
      query: (code) => ({
        url: `/api/dropdown/admin/product-entity-two/${code}`,
        method: "DELETE",
      }),
    }),


    // =====================================================
    // SECTORS
    // =====================================================
    getSectors: builder.query<any[], void>({
      query: () => "/api/dropdown/sectors",
    }),

    addSector: builder.mutation<any, { DescA: string }>({
      query: (body) => ({
        url: "/api/dropdown/admin/sectors",
        method: "POST",
        body,
      }),
    }),

    updateSector: builder.mutation<any, { code: number; DescA: string }>({
      query: ({ code, DescA }) => ({
        url: `/api/dropdown/admin/sectors/${code}`,
        method: "PATCH",
        body: { DescA },
      }),
    }),

    deleteSector: builder.mutation<any, number>({
      query: (code) => ({
        url: `/api/dropdown/admin/sectors/${code}`,
        method: "DELETE",
      }),
    }),


    // =====================================================
    // ITEM TYPES
    // =====================================================
    getItemTypes: builder.query<any[], void>({
      query: () => "/api/dropdown/item-types",
    }),

    addItemType: builder.mutation<any, { DescA: string }>({
      query: (body) => ({
        url: "/api/dropdown/admin/item-types",
        method: "POST",
        body,
      }),
    }),

    updateItemType: builder.mutation<any, { code: number; DescA: string }>({
      query: ({ code, DescA }) => ({
        url: `/api/dropdown/admin/item-types/${code}`,
        method: "PATCH",
        body: { DescA },
      }),
    }),

    deleteItemType: builder.mutation<any, number>({
      query: (code) => ({
        url: `/api/dropdown/admin/item-types/${code}`,
        method: "DELETE",
      }),
    }),

    // =====================================================
    // EVENT TYPES
    // =====================================================
    getEventTypes: builder.query<any[], void>({
      query: () => "/api/dropdown/event-types",
    }),

    addEventType: builder.mutation<any, { DescA: string }>({
      query: (body) => ({
        url: "/api/dropdown/admin/event-types",
        method: "POST",
        body,
      }),
    }),

    updateEventType: builder.mutation<any, { code: number; DescA: string }>({
      query: ({ code, DescA }) => ({
        url: `/api/dropdown/admin/event-types/${code}`,
        method: "PATCH",
        body: { DescA },
      }),
    }),

    deleteEventType: builder.mutation<any, number>({
      query: (code) => ({
        url: `/api/dropdown/admin/event-types/${code}`,
        method: "DELETE",
      }),
    }),


    // =====================================================
    // PRODUCT LINES
    // =====================================================
    getProdLines: builder.query<any[], void>({
      query: () => "/api/dropdown/product-lines",
    }),

    addProdLine: builder.mutation<any, { DescA: string }>({
      query: (body) => ({
        url: "/api/dropdown/admin/product-lines",
        method: "POST",
        body,
      }),
    }),

    updateProdLine: builder.mutation<any, { code: number; DescA: string }>({
      query: ({ code, DescA }) => ({
        url: `/api/dropdown/admin/product-lines/${code}`,
        method: "PATCH",
        body: { DescA },
      }),
    }),

    deleteProdLine: builder.mutation<any, number>({
      query: (code) => ({
        url: `/api/dropdown/admin/product-lines/${code}`,
        method: "DELETE",
      }),
    }),


    // =====================================================
    // EVENTS
    // =====================================================
    getEvents: builder.query<any[], void>({
      query: () => "/api/dropdown/events",
    }),

    addEvent: builder.mutation<any, { DescA: string }>({
      query: (body) => ({
        url: "/api/dropdown/events",
        method: "POST",
        body,
      }),
    }),

    updateEvent: builder.mutation<any, { code: number; DescA: string; }>({
      query: ({ code, DescA }) => ({
        url: `/api/dropdown/events/${code}`,
        method: "PATCH",
        body: {
          DescA,
        },
      }),
    }),

    deleteEvent: builder.mutation<any, number>({
      query: (code) => ({
        url: `/api/dropdown/events/${code}`,
        method: "DELETE",
      }),
    }),


    // =====================================================
    // SONGS
    // =====================================================
    getSongs: builder.query<any[], void>({
      query: () => "/api/dropdown/songs",
    }),

    addSong: builder.mutation<any, { DescA: string }>({
      query: (body) => ({
        url: "/api/dropdown/admin/songs",
        method: "POST",
        body,
      }),
    }),

    updateSong: builder.mutation<any, { code: number; DescA: string }>({
      query: ({ code, DescA }) => ({
        url: `/api/dropdown/admin/songs/${code}`,
        method: "PATCH",
        body: { DescA },
      }),
    }),

    deleteSong: builder.mutation<any, number>({
      query: (code) => ({
        url: `/api/dropdown/admin/songs/${code}`,
        method: "DELETE",
      }),
    }),


    // =====================================================
    // SPEAKERS
    // =====================================================
    getSpeakers: builder.query<any[], void>({
      query: () => "/api/dropdown/speakers",
    }),

    addSpeaker: builder.mutation<any, { DescA: string }>({
      query: (body) => ({
        url: "/api/dropdown/admin/speakers",
        method: "POST",
        body,
      }),
    }),

    updateSpeaker: builder.mutation<any, { code: number; DescA: string }>({
      query: ({ code, DescA }) => ({
        url: `/api/dropdown/admin/speakers/${code}`,
        method: "PATCH",
        body: { DescA },
      }),
    }),

    deleteSpeaker: builder.mutation<any, number>({
      query: (code) => ({
        url: `/api/dropdown/admin/speakers/${code}`,
        method: "DELETE",
      }),
    }),


    // =====================================================
    // ITEMS
    // =====================================================
    getItems: builder.query<any[], void>({
      query: () => "/api/dropdown/items",
    }),

    addItem: builder.mutation<any, { DescA: string }>({
      query: (body) => ({
        url: "/api/dropdown/admin/items",
        method: "POST",
        body,
      }),
    }),

    updateItem: builder.mutation<any, { code: number; DescA: string }>({
      query: ({ code, DescA }) => ({
        url: `/api/dropdown/admin/items/${code}`,
        method: "PATCH",
        body: { DescA },
      }),
    }),

    deleteItem: builder.mutation<any, number>({
      query: (code) => ({
        url: `/api/dropdown/admin/items/${code}`,
        method: "DELETE",
      }),
    }),


    // =====================================================
    // ITEMS SERIALIZATION 
    // =====================================================
    getItemsSer: builder.query<any[], void>({
      query: () => "/api/dropdown/items-ser",
    }),

    addItemSer: builder.mutation<any, { DescA: string }>({
      query: (body) => ({
        url: "/api/dropdown/admin/items-ser",
        method: "POST",
        body,
      }),
    }),

    updateItemSer: builder.mutation<any, { code: number; DescA: string }>({
      query: ({ code, DescA }) => ({
        url: `/api/dropdown/admin/items-ser/${code}`,
        method: "PATCH",
        body: { DescA },
      }),
    }),

    deleteItemSer: builder.mutation<any, number>({
      query: (code) => ({
        url: `/api/dropdown/admin/items-ser/${code}`,
        method: "DELETE",
      }),
    }),


    // =====================================================
    // TRANSLATIONS
    // =====================================================
    getTranslations: builder.query<any[], void>({
      query: () => "/api/dropdown/translations",
    }),

    addTranslation: builder.mutation<any, { DescA: string }>({
      query: (body) => ({
        url: "/api/dropdown/admin/translations",
        method: "POST",
        body,
      }),
    }),
    
    updateTranslation: builder.mutation<any, { code: number; DescA: string }>({
      query: ({ code, DescA }) => ({
        url: `/api/dropdown/admin/translations/${code}`,
        method: "PATCH",
        body: { DescA },
      }),
    }),

    deleteTranslation: builder.mutation<any, number>({
      query: (code) => ({
        url: `/api/dropdown/admin/translations/${code}`,
        method: "DELETE",
      }),
    }),

    // =====================================================
    // CHANNELS
    // =====================================================

    getChannels: builder.query<any[], void>({
      query: () => "/api/dropdown/channels",
    }),

    addChannel: builder.mutation<any, { DescA: string }>({
      query: (body) => ({
        url: "/api/dropdown/admin/channels",
        method: "POST",
        body,
      }),
    }),

    updateChannel: builder.mutation<any, { code: number; DescA: string }>({
      query: ({ code, DescA }) => ({
        url: `/api/dropdown/admin/channels/${code}`,
        method: "PATCH",
        body: { DescA },
      }),
    }),

    deleteChannel: builder.mutation<any, number>({
      query: (code) => ({
        url: `/api/dropdown/admin/channels/${code}`,
        method: "DELETE",
      }),
    }),

    // =====================================================
    // CONTENT TYPES
    // Admin Only
    // =====================================================

    getContentTypes: builder.query<any[], void>({
      query: () => "/api/dropdown/content-types",
    }),

  }),
});

// =========================================================
// EXPORT HOOKS
// =========================================================

export const {
    
  useGetProductEntityOneQuery,
  useGetProductEntityTwoQuery,
  useGetSectorsQuery,
  useGetItemTypesQuery,
  useGetEventTypesQuery,
  useGetProdLinesQuery,
  useGetEventsQuery,
  useGetSongsQuery,
  useGetSpeakersQuery,
  useGetItemsQuery,
  useGetItemsSerQuery,
  useGetChannelsQuery,
  useGetTranslationsQuery,
  useGetContentTypesQuery,

  // POST
  useAddProductEntityOneMutation,
  useAddProductEntityTwoMutation,
  useAddSectorMutation,
  useAddItemTypeMutation,
  useAddEventTypeMutation,
  useAddProdLineMutation,
  useAddEventMutation,
  useUpdateEventMutation,
  useAddSongMutation,
  useAddSpeakerMutation,
  useAddItemMutation,
  useAddItemSerMutation,
  useAddTranslationMutation,
  useAddChannelMutation,

  // UPDATE
  useUpdateProductEntityOneMutation,
  useUpdateProductEntityTwoMutation,
  useUpdateSectorMutation,
  useUpdateItemTypeMutation,
  useUpdateEventTypeMutation,
  useUpdateProdLineMutation,
  useUpdateSongMutation,
  useUpdateSpeakerMutation,
  useUpdateItemMutation,
  useUpdateItemSerMutation,
  useUpdateTranslationMutation,
  useUpdateChannelMutation,

  // DELETE
  useDeleteProductEntityOneMutation,
  useDeleteProductEntityTwoMutation,
  useDeleteSectorMutation,
  useDeleteItemTypeMutation,
  useDeleteEventTypeMutation,
  useDeleteProdLineMutation,
  useDeleteEventMutation,
  useDeleteSongMutation,
  useDeleteSpeakerMutation,
  useDeleteItemMutation,
  useDeleteItemSerMutation,
  useDeleteTranslationMutation,
  useDeleteChannelMutation,

} = videosDropdownAPI;