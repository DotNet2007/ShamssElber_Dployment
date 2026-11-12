// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// import VideoHeader from "@/app/components/videos/VideoHeader";

// import {
//   useGetAllVideosQuery,
//   useGetMyVideosQuery,
// } from "@/app/services/videos-api";

// import VideosCard, {
//   SortColumn,
//   SortDirection,
//   VideoColumnSearch,
// } from "./VideosCard";

// export default function VideosPage() {
//   const router = useRouter()

//   // =========================================================
//   // ACTIVE FILTER
//   // =========================================================

//   const [activeFilter, setActiveFilter] =
//     useState<"all" | "mine">("all");

//   // =========================================================
//   // GENERAL SEARCH
//   // =========================================================

//   const [searchText, setSearchText] =
//     useState("");

//   // =========================================================
//   // DATE FILTER
//   // =========================================================

//   const [dateFrom, setDateFrom] =
//     useState("");

//   const [dateTo, setDateTo] =
//     useState("");

//   // =========================================================
//   // COLUMN SEARCH
//   // =========================================================

//   const [columnSearch, setColumnSearch] =
//     useState<VideoColumnSearch>({
//       video: "",
//       item: "",
//       sector: "",
//       production: "",
//     });

//   // =========================================================
//   // SORT
//   // =========================================================

//   const [sortBy, setSortBy] =
//     useState<SortColumn>("Item");

//   const [sortOrder, setSortOrder] =
//     useState<SortDirection>("asc");

//   // =========================================================
//   // PAGINATION
//   // =========================================================

//   const [currentPage, setCurrentPage] =
//     useState(1);

//   const itemsPerPage = 10;

//   // =========================================================
//   // GET ALL VIDEOS
//   // =========================================================

//   const {
//     data: allVideosData,
//     isLoading: isLoadingAll,
//     isFetching: isFetchingAll,
//     isError: isAllError,
//     // error: allError,
//     refetch: refetchAll,
//   } = useGetAllVideosQuery(
//     {
//       page: currentPage,
//       limit: itemsPerPage,

//       search: searchText,

//       dateFrom,
//       dateTo,

//       sortBy,
//       sortOrder,

//       videoSearch: columnSearch.video,
//       itemSearch: columnSearch.item,
//       sectorSearch: columnSearch.sector,
//       productionSearch: columnSearch.production,
//     },
//     {
//       skip: activeFilter !== "all",
//     }
//   );

//   // =========================================================
//   // GET MY VIDEOS
//   // =========================================================

//   const {
//     data: myVideosData,
//     isLoading: isLoadingMy,
//     isFetching: isFetchingMy,
//     isError: isMyError,
//     // error: myError,
//     refetch: refetchMy,
//   } = useGetMyVideosQuery(
//     {
//       page: currentPage,
//       limit: itemsPerPage,

//       search: searchText,

//       dateFrom,
//       dateTo,

//       sortBy,
//       sortOrder,

//       videoSearch: columnSearch.video,
//       itemSearch: columnSearch.item,
//       sectorSearch: columnSearch.sector,
//       productionSearch: columnSearch.production,
//     },
//     {
//       skip: activeFilter !== "mine",
//     }
//   );

//   // =========================================================
//   // API DATA
//   // =========================================================

//   const allVideos =
//     allVideosData?.data ?? [];

//   const myVideos =
//     myVideosData?.data ?? [];

//   // =========================================================
//   // DISPLAYED VIDEOS
//   // =========================================================

//   const displayedVideos =
//     activeFilter === "all"
//       ? allVideos
//       : myVideos;

//   // =========================================================
//   // ACTIVE API DATA
//   // =========================================================

//   const activeData =
//     activeFilter === "all"
//       ? allVideosData
//       : myVideosData;

//   // =========================================================
//   // PAGINATION DATA
//   // =========================================================

//   const pagination =
//     activeData?.pagination;

//   const totalItems =
//     pagination?.total ?? 0;

//   const totalPages =
//     pagination?.totalPages ??
//     Math.ceil(totalItems / itemsPerPage);

//   // =========================================================
//   // LOADING
//   // =========================================================

//   const isLoading =
//     activeFilter === "all"
//       ? isLoadingAll
//       : isLoadingMy;

//   const isFetching =
//     activeFilter === "all"
//       ? isFetchingAll
//       : isFetchingMy;

//   // =========================================================
//   // ERROR
//   // =========================================================

//   const hasError =
//     activeFilter === "all"
//       ? isAllError
//       : isMyError;

//   // const currentError =
//   //   activeFilter === "all"
//   //     ? allError
//   //     : myError;

//   // =========================================================
//   // SEARCH
//   // =========================================================

//   const handleSearch = (value: string) => {
//     setSearchText(value);
//     setCurrentPage(1);
//   };

//   // =========================================================
//   // DATE FROM
//   // =========================================================

//   const handleDateFromChange = (
//     value: string
//   ) => {
//     setDateFrom(value);
//     setCurrentPage(1);
//   };

//   // =========================================================
//   // DATE TO
//   // =========================================================

//   const handleDateToChange = (
//     value: string
//   ) => {
//     setDateTo(value);
//     setCurrentPage(1);
//   };

//   // =========================================================
//   // COLUMN SEARCH
//   // =========================================================

//   const handleColumnSearchChange = (
//     column: keyof VideoColumnSearch,
//     value: string
//   ) => {
//     setColumnSearch((prev) => ({
//       ...prev,
//       [column]: value,
//     }));

//     setCurrentPage(1);
//   };

//   // =========================================================
//   // SORT
//   // =========================================================

//   const handleSort = (
//     column: SortColumn
//   ) => {
//     if (sortBy === column) {
//       setSortOrder((prev) =>
//         prev === "asc"
//           ? "desc"
//           : "asc"
//       );
//     } else {
//       setSortBy(column);
//       setSortOrder("asc");
//     }

//     setCurrentPage(1);
//   };

//   // =========================================================
//   // CLEAR FILTERS
//   // =========================================================

//   const handleClear = () => {
//     setSearchText("");

//     setDateFrom("");

//     setDateTo("");

//     setColumnSearch({
//       video: "",
//       item: "",
//       sector: "",
//       production: "",
//     });

//     setSortBy("Code");

//     setSortOrder("desc");

//     setCurrentPage(1);
//   };

//   // =========================================================
//   // ALL VIDEOS
//   // =========================================================

//   const handleAllVideos = () => {
//     setActiveFilter("all");
//     setCurrentPage(1);
//   };

//   // =========================================================
//   // MY VIDEOS
//   // =========================================================

//   const handleMyVideos = () => {
//     setActiveFilter("mine");
//     setCurrentPage(1);
//   };

//   // =========================================================
//   // LOADING SCREEN
//   // =========================================================

//   if (isLoading) {
//     return (
//       <main
//         dir="rtl"
//         className="
//           mx-auto
//           w-full
//           max-w-300
//           px-5
//           py-17.5
//           max-[768px]:px-3
//           max-[768px]:py-8.75
//         "
//       >
//         <VideoHeader />

//         <div
//           className="
//             mt-6
//             flex
//             min-h-75
//             items-center
//             justify-center
//             rounded-2xl
//             border
//             border-gray-200
//             bg-white
//           "
//         >
//           <div className="text-sm text-gray-500">
//             جاري تحميل الفيديوهات...
//           </div>
//         </div>
//       </main>
//     );
//   }

//   // =========================================================
//   // ERROR SCREEN
//   // =========================================================

//   if (hasError) {
//     return (
//       <main
//         dir="rtl"
//         className="
//           mx-auto
//           w-full
//           max-w-300
//           px-5
//           py-17.5
//           max-[768px]:px-3
//           max-[768px]:py-8.75
//         "
//       >
//         <VideoHeader />

//         <div
//           className="
//             mt-6
//             flex
//             min-h-75
//             flex-col
//             items-center
//             justify-center
//             gap-4
//             rounded-2xl
//             border
//             border-gray-200
//             bg-white
//           "
//         >
//           <div className="text-sm text-red-500">
//             حدث خطأ أثناء تحميل الفيديوهات
//           </div>

//           <button
//             type="button"
//             onClick={() => {
//               if (activeFilter === "all") {
//                 refetchAll();
//               } else {
//                 refetchMy();
//               }
//             }}
//             className="
//               rounded-xl
//               bg-gray-900
//               px-5
//               py-2.5
//               text-sm
//               text-white
//               transition
//               hover:bg-gray-800
//             "
//           >
//             إعادة المحاولة
//           </button>
//         </div>
//       </main>
//     );
//   }

//   // =========================================================
//   // PAGE
//   // =========================================================

//   return (
//     <main
//       dir="rtl"
//       className="
//         mx-auto
//         w-full
//         max-w-300
//         px-5
//         py-17.5
//         max-[768px]:px-3
//         max-[768px]:py-8.75
//       "
//     >
//       {/* =====================================================
//           HEADER
//           ===================================================== */}

//       <VideoHeader />

//       {/* =====================================================
//           VIDEOS CARD
//           ===================================================== */}

//       <VideosCard
//         videos={displayedVideos}

//         search={searchText}

//         dateFrom={dateFrom}

//         dateTo={dateTo}

//         activeFilter={activeFilter}

//         sortBy={sortBy}

//         sortOrder={sortOrder}

//         total={totalItems}

//         page={currentPage}

//         limit={itemsPerPage}

//         totalPages={totalPages}

//         columnSearch={columnSearch}

//         onSearchChange={handleSearch}

//         onDateFromChange={
//           handleDateFromChange
//         }

//         onDateToChange={
//           handleDateToChange
//         }

//         onColumnSearchChange={
//           handleColumnSearchChange
//         }

//         onSort={handleSort}

//         onPageChange={setCurrentPage}

//         onClear={handleClear}

//         onAllVideos={
//           handleAllVideos
//         }

//         onMyVideos={
//           handleMyVideos
//         }

//         onAddVideo={() => {
//           router.push("/videos/add");
//         }}

//         onView={(video) => {router.push(`/videos/edit/${video.Code}`); }}
//       />

      

//       {/* =====================================================
//           FETCHING
//           ===================================================== */}

//       {isFetching && !isLoading && (
//         <div
//           className="
//             mt-3
//             text-center
//             text-xs
//             text-gray-400
//           "
//         >
//           جاري تحديث النتائج...
//         </div>
//       )}

      
//     </main>
//   );
// }





"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import VideoHeader from "@/app/components/videos/VideoHeader";
import VideoSearchCard from "@/app/components/videos/VideoSearchCard";
import VideosCard from "@/app/components/videos/VideosCard";
import VideoPlayerModal from "@/app/components/videos/VideoPlayerModal";
import Pagination from "@/app/components/common/Pagination";

import {
  useGetAllVideosQuery,
  useGetMyVideosQuery,
} from "@/app/services/videos-api";

export default function VideosPage() {
  const router = useRouter();

  /* =========================================================
     VIDEO MODAL
     ========================================================= */

  const [showVideoModal, setShowVideoModal] =
    useState(false);

  const [selectedVideo, setSelectedVideo] =
    useState<any>(null);

  /* =========================================================
     ACTIVE FILTER
     ========================================================= */

  const [activeFilter, setActiveFilter] =
    useState<"all" | "mine">("all");

  /* =========================================================
     SEARCH
     ========================================================= */

  const [searchText, setSearchText] =
    useState("");

  /* =========================================================
     DATE FILTER
     ========================================================= */

  const [dateFrom, setDateFrom] =
    useState("");

  const [dateTo, setDateTo] =
    useState("");

  /* =========================================================
     PAGINATION
     ========================================================= */

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 10;

  /* =========================================================
     GET ALL VIDEOS
     ========================================================= */

  const {
    data: allVideosData,

    isLoading: isLoadingAll,

    isFetching: isFetchingAll,

    isError: isAllError,


    refetch: refetchAll,

  } = useGetAllVideosQuery(
    {
      page: currentPage,

      limit: itemsPerPage,

      search: searchText,

      dateFrom,

      dateTo,
    },
    {
      skip: activeFilter !== "all",
    }
  );

  /* =========================================================
     GET MY VIDEOS
     ========================================================= */

  const {
    data: myVideosData,

    isLoading: isLoadingMy,

    isFetching: isFetchingMy,

    isError: isMyError,

    refetch: refetchMy,

  } = useGetMyVideosQuery(
    {
      page: currentPage,

      limit: itemsPerPage,

      search: searchText,

      dateFrom,

      dateTo,
    },
    {
      skip: activeFilter !== "mine",
    }
  );

  /* =========================================================
     API DATA
     ========================================================= */

  const allVideos =
    allVideosData?.data ?? [];

  const myVideos =
    myVideosData?.data ?? [];

  /* =========================================================
     DISPLAYED VIDEOS
     ========================================================= */

  const displayedVideos =
    activeFilter === "all"
      ? allVideos
      : myVideos;

  /* =========================================================
     PAGINATION DATA
     ========================================================= */

  const pagination =
    allVideosData?.pagination;

  /*
   * All Videos
   *
   * Pagination is handled by backend.
   */

  const totalItems =
    activeFilter === "all"
      ? pagination?.total ?? 0
      : myVideos.length;

  /* =========================================================
     LOADING
     ========================================================= */

  const isLoading =
    activeFilter === "all"
      ? isLoadingAll
      : isLoadingMy;

  const isFetching =
    activeFilter === "all"
      ? isFetchingAll
      : isFetchingMy;

  /* =========================================================
     ERROR
     ========================================================= */

  const hasError =
    activeFilter === "all"
      ? isAllError
      : isMyError;

  /* =========================================================
     SEARCH
     ========================================================= */

  const handleSearch = (
    value: string
  ) => {
    setSearchText(value);

    // Search starts from first page
    setCurrentPage(1);
  };

  /* =========================================================
     DATE FROM
     ========================================================= */

  const handleDateFromChange = (
    value: string
  ) => {
    setDateFrom(value);

    // New filter starts from first page
    setCurrentPage(1);
  };

  /* =========================================================
     DATE TO
     ========================================================= */

  const handleDateToChange = (
    value: string
  ) => {
    setDateTo(value);

    // New filter starts from first page
    setCurrentPage(1);
  };

  /* =========================================================
     CLEAR SEARCH / FILTERS
     ========================================================= */

  const handleClear = () => {
    setSearchText("");

    setDateFrom("");

    setDateTo("");

    setCurrentPage(1);
  };

  /* =========================================================
     CHANGE ACTIVE FILTER
     ========================================================= */

  const handleAllVideos = () => {
    setActiveFilter("all");

    setCurrentPage(1);
  };

  const handleMyVideos = () => {
    setActiveFilter("mine");

    setCurrentPage(1);
  };



  /* =========================================================
     LOADING SCREEN
     ========================================================= */

  if (isLoading) {
    return (
      <main
        dir="rtl"
        className="
          mx-auto
          w-full
          max-w-300
          px-5
          py-17.5

          max-[768px]:px-3
          max-[768px]:py-8.75
        "
      >
        <VideoHeader />

        <VideoSearchCard
          search={searchText}

          onSearchChange={
            handleSearch
          }

          dateFrom={dateFrom}

          dateTo={dateTo}

          onDateFromChange={
            handleDateFromChange
          }

          onDateToChange={
            handleDateToChange
          }

          onClear={
            handleClear
          }

          onFilter={() => {
            // Filter panel will be added later
          }}
        />

        <div
          className="
            mt-6
            flex
            min-h-75
            items-center
            justify-center
          "
        >
          <div className="text-sm text-gray-500">
            جاري تحميل الفيديوهات...
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     ERROR SCREEN
     ========================================================= */

  if (hasError) {
    return (
      <main
        dir="rtl"
        className="
          mx-auto
          w-full
          max-w-300
          px-5
          py-17.5

          max-[768px]:px-3
          max-[768px]:py-8.75
        "
      >
        <VideoHeader />

        <VideoSearchCard
          search={searchText}

          onSearchChange={
            handleSearch
          }

          dateFrom={dateFrom}

          dateTo={dateTo}

          onDateFromChange={
            handleDateFromChange
          }

          onDateToChange={
            handleDateToChange
          }

          onClear={
            handleClear
          }

          onFilter={() => {
            // Filter panel will be added later
          }}
        />

        <div
          className="
            mt-6
            flex
            min-h-75
            flex-col
            items-center
            justify-center
            gap-4
          "
        >
          <div className="text-sm text-red-500">
            حدث خطأ أثناء تحميل الفيديوهات
          </div>

          <button
            type="button"
            onClick={() => {
              if (
                activeFilter === "all"
              ) {
                refetchAll();
              } else {
                refetchMy();
              }
            }}
            className="
              rounded-lg
              bg-gray-900
              px-5
              py-2
              text-sm
              text-white
              transition
              hover:bg-gray-800
            "
          >
            إعادة المحاولة
          </button>
        </div>
      </main>
    );
  }

  /* =========================================================
     PAGE
     ========================================================= */

  return (
    <main
      dir="rtl"
      className="
        mx-auto
        w-full
        max-w-300
        px-5
        py-17.5

        max-[768px]:px-3
        max-[768px]:py-8.75
      "
    >
      {/* =====================================================
          HEADER
          ===================================================== */}

      <VideoHeader />

      {/* =====================================================
          SEARCH
          ===================================================== */}

      <VideoSearchCard
        search={searchText}

        onSearchChange={
          handleSearch
        }

        dateFrom={dateFrom}

        dateTo={dateTo}

        onDateFromChange={
          handleDateFromChange
        }

        onDateToChange={
          handleDateToChange
        }

        onClear={
          handleClear
        }

        onFilter={() => {
          // Filter panel will be added later
        }}
      />

      {/* =====================================================
          VIDEOS
          ===================================================== */}

      <div className="mt-6 w-full">

        <VideosCard
          videos={displayedVideos}

          activeFilter={activeFilter}

          onAllVideos={
            handleAllVideos
          }

          onMyVideos={
            handleMyVideos
          }

          onAddVideo={() => {
            router.push(
              "/videos/add"
            );
          }}

          onView={(video) => {
            router.push(
              `/videos/edit/${video.Code}`
            );
          }}

          onDownload={(video) => {
            console.log(
              "Download:",
              video
            );
          }}

          onDelete={(video) => {
            console.log(
              "Delete:",
              video
            );
          }}
        />

        {/* ===================================================
            FETCHING
            =================================================== */}

        {isFetching && !isLoading && (
          <div
            className="
              mt-3
              text-center
              text-xs
              text-gray-400
            "
          >
            جاري تحديث النتائج...
          </div>
        )}

        {/* ===================================================
            PAGINATION
            =================================================== */}

        {totalItems > 0 && (
          <Pagination
            currentPage={
              currentPage
            }

            totalItems={
              totalItems
            }

            itemsPerPage={
              itemsPerPage
            }

            onPageChange={(
              page
            ) => {
              setCurrentPage(page);
            }}
          />
        )}

      </div>

      {/* =====================================================
          VIDEO PLAYER
          ===================================================== */}

      <VideoPlayerModal
        open={
          showVideoModal
        }

        video={
          selectedVideo
        }

        onClose={() => {
          setShowVideoModal(
            false
          );

          setSelectedVideo(
            null
          );
        }}
      />

    </main>
  );
}
