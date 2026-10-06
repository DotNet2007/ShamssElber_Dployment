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
    // ADD PRODUCT ENTITY ONE
    // =====================================================

    addProductEntityOne: builder.mutation<any, { DescA: string }>({
      query: (body) => ({
        url: "/api/dropdown/admin/product-entity-one",
        method: "POST",
        body,
      }),
    }),

    // =====================================================
    // PRODUCT ENTITY TWO
    // =====================================================

    getProductEntityTwo: builder.query<any[], void>({
      query: () => "/api/dropdown/product-entity-two",
    }),

    // =====================================================
    // ADD PRODUCT ENTITY TWO
    // =====================================================

    addProductEntityTwo: builder.mutation<any, { DescA: string }>({
      query: (body) => ({
        url: "/api/dropdown/admin/product-entity-two",
        method: "POST",
        body,
      }),
    }),

    // =====================================================
    // SECTORS
    // =====================================================

    getSectors: builder.query<any[], void>({
      query: () => "/api/dropdown/sectors",
    }),

    // =====================================================
    // ADD SECTOR
    // =====================================================

    addSector: builder.mutation<any, { DescA: string }>({
      query: (body) => ({
        url: "/api/dropdown/admin/sectors",
        method: "POST",
        body,
      }),
    }),

    // =====================================================
    // ITEM TYPES
    // =====================================================

    getItemTypes: builder.query<any[], void>({
      query: () => "/api/dropdown/item-types",
    }),

    // =====================================================
    // ADD ITEM TYPE
    // =====================================================

    addItemType: builder.mutation<any, { DescA: string }>({
      query: (body) => ({
        url: "/api/dropdown/admin/item-types",
        method: "POST",
        body,
      }),
    }),

    // =====================================================
    // EVENT TYPES
    // =====================================================

    getEventTypes: builder.query<any[], void>({
      query: () => "/api/dropdown/event-types",
    }),

    // =====================================================
    // ADD EVENT TYPE
    // =====================================================

    addEventType: builder.mutation<any, { DescA: string }>({
      query: (body) => ({
        url: "/api/dropdown/admin/event-types",
        method: "POST",
        body,
      }),
    }),

    // =====================================================
    // PRODUCT LINES
    // =====================================================

    getProdLines: builder.query<any[], void>({
      query: () => "/api/dropdown/product-lines",
    }),

    // =====================================================
    // ADD PRODUCT LINE
    // =====================================================

    addProdLine: builder.mutation<any, { DescA: string }>({
      query: (body) => ({
        url: "/api/dropdown/admin/product-lines",
        method: "POST",
        body,
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



    // =====================================================
    // SONGS
    // =====================================================

    getSongs: builder.query<any[], void>({
      query: () => "/api/dropdown/songs",
    }),

    // =====================================================
    // ADD SONG
    // =====================================================

    addSong: builder.mutation<any, { DescA: string }>({
      query: (body) => ({
        url: "/api/dropdown/admin/songs",
        method: "POST",
        body,
      }),
    }),


    // =====================================================
    // SPEAKERS
    // =====================================================

    getSpeakers: builder.query<any[], void>({
      query: () => "/api/dropdown/speakers",
    }),

    // =====================================================
    // ADD SPEAKER
    // =====================================================

    addSpeaker: builder.mutation<any, { DescA: string }>({
      query: (body) => ({
        url: "/api/dropdown/admin/speakers",
        method: "POST",
        body,
      }),
    }),


    // =====================================================
    // ITEMS
    // =====================================================

    getItems: builder.query<any[], void>({
      query: () => "/api/dropdown/items",
    }),

    // =====================================================
    // ADD ITEM
    // =====================================================

    addItem: builder.mutation<any, { DescA: string }>({
      query: (body) => ({
        url: "/api/dropdown/admin/items",
        method: "POST",
        body,
      }),
    }),

    // =====================================================
    // ITEMS SERIALIZATION 
    // =====================================================

    getItemsSer: builder.query<any[], void>({
      query: () => "/api/dropdown/items-ser",
    }),

    // =====================================================
    // ADD ITEM SERIAL
    // =====================================================

    addItemSer: builder.mutation<any, { DescA: string }>({
      query: (body) => ({
        url: "/api/dropdown/admin/items-ser",
        method: "POST",
        body,
      }),
    }),

    // =====================================================
    // TRANSLATIONS
    // =====================================================

    getTranslations: builder.query<any[], void>({
      query: () => "/api/dropdown/translations",
    }),

    // =====================================================
    // ADD TRANSLATION
    // =====================================================

    addTranslation: builder.mutation<any, { DescA: string }>({
      query: (body) => ({
        url: "/api/dropdown/admin/translations",
        method: "POST",
        body,
      }),
    }),

    // =====================================================
    // CHANNELS
    // =====================================================

    getChannels: builder.query<any[], void>({
      query: () => "/api/dropdown/channels",
    }),

    // =====================================================
    // ADD CHANNEL
    // =====================================================

    addChannel: builder.mutation<any, { DescA: string }>({
      query: (body) => ({
        url: "/api/dropdown/admin/channels",
        method: "POST",
        body,
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
  useAddSongMutation,
  useAddSpeakerMutation,
  useAddItemMutation,
  useAddItemSerMutation,
  useAddTranslationMutation,
  useAddChannelMutation,

} = videosDropdownAPI;