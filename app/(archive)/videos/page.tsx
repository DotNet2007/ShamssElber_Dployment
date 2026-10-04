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

    error: allError,

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

    error: myError,

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

  const currentError =
    activeFilter === "all"
      ? allError
      : myError;

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
     VIEW VIDEO
     ========================================================= */

  const handleViewVideo = (
    video: any
  ) => {
    setSelectedVideo(video);

    setShowVideoModal(true);
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
          max-w-[1200px]
          px-5
          py-[70px]

          max-[768px]:px-3
          max-[768px]:py-[35px]
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
            min-h-[300px]
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
          max-w-[1200px]
          px-5
          py-[70px]

          max-[768px]:px-3
          max-[768px]:py-[35px]
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
            min-h-[300px]
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
        max-w-[1200px]
        px-5
        py-[70px]

        max-[768px]:px-3
        max-[768px]:py-[35px]
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