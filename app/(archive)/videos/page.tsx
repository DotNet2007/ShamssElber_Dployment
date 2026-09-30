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
    isError: isAllError,
    error: allError,
    refetch: refetchAll,
  } = useGetAllVideosQuery();

  /* =========================================================
     GET MY VIDEOS
     ========================================================= */

  const {
    data: myVideosData,
    isLoading: isLoadingMy,
    isError: isMyError,
    error: myError,
    refetch: refetchMy,
  } = useGetMyVideosQuery();

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

  const totalItems =
    displayedVideos.length;

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const paginatedVideos =
    displayedVideos.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  /* =========================================================
     VIEW VIDEO
     ========================================================= */

  const handleViewVideo = (video: any) => {
    setSelectedVideo(video);
    setShowVideoModal(true);
  };

  /* =========================================================
     LOADING
     ========================================================= */

  const isLoading =
    activeFilter === "all"
      ? isLoadingAll
      : isLoadingMy;

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

        <VideoSearchCard />

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
    console.error(
      "Get videos error:",
      currentError
    );

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

        <VideoSearchCard />

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
              if (activeFilter === "all") {
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

      <VideoSearchCard />

      {/* =====================================================
          VIDEOS
          ===================================================== */}

      <div className="mt-6 w-full">
        <VideosCard
          videos={paginatedVideos}

          activeFilter={activeFilter}

          onAllVideos={() => {
            setActiveFilter("all");
            setCurrentPage(1);
          }}

          onMyVideos={() => {
            setActiveFilter("mine");
            setCurrentPage(1);
          }}

          onAddVideo={() => {
            console.log("Add video");
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
            PAGINATION
            =================================================== */}

        {totalItems > 0 && (
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
          />
        )}
      </div>

      {/* =====================================================
          VIDEO PLAYER
          ===================================================== */}

      <VideoPlayerModal
        open={showVideoModal}
        video={selectedVideo}
        onClose={() => {
          setShowVideoModal(false);
          setSelectedVideo(null);
        }}
      />
    </main>
  );
}