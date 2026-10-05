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

    // =====================================================
    // PRODUCT ENTITY TWO
    // =====================================================

    getProductEntityTwo: builder.query<any[], void>({
      query: () => "/api/dropdown/product-entity-two",
    }),

    // =====================================================
    // SECTORS
    // =====================================================

    getSectors: builder.query<any[], void>({
      query: () => "/api/dropdown/sectors",
    }),

    // =====================================================
    // ITEM TYPES
    // =====================================================

    getItemTypes: builder.query<any[], void>({
      query: () => "/api/dropdown/item-types",
    }),

    // =====================================================
    // EVENT TYPES
    // =====================================================

    getEventTypes: builder.query<any[], void>({
      query: () => "/api/dropdown/event-types",
    }),

    // =====================================================
    // PRODUCT LINES
    // =====================================================

    getProdLines: builder.query<any[], void>({
      query: () => "/api/dropdown/product-lines",
    }),

    // =====================================================
    // EVENTS
    // =====================================================

    getEvents: builder.query<any[], void>({
      query: () => "/api/dropdown/events",
    }),

    // =====================================================
    // SONGS
    // =====================================================

    getSongs: builder.query<any[], void>({
      query: () => "/api/dropdown/songs",
    }),

    // =====================================================
    // SPEAKERS
    // =====================================================

    getSpeakers: builder.query<any[], void>({
      query: () => "/api/dropdown/speakers",
    }),


    // =====================================================
    // ITEMS
    // =====================================================

    getItems: builder.query<any[], void>({
      query: () => "/api/dropdown/items",
    }),

    // =====================================================
    // ITEMS SERIALIZATION 
    // =====================================================

    getItemsSer: builder.query<any[], void>({
      query: () => "/api/dropdown/items-ser",
    }),

    // =====================================================
    // CHANNELS
    // =====================================================

    getChannels: builder.query<any[], void>({
      query: () => "/api/dropdown/channels",
    }),

    // =====================================================
    // TRANSLATIONS
    // =====================================================

    getTranslations: builder.query<any[], void>({
      query: () => "/api/dropdown/translations",
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
  useGetContentTypesQuery

} = videosDropdownAPI;