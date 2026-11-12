"use client";

import { useState } from "react";


import VideoHeader from "@/app/components/videos/VideoHeader";
import VideoSearchCard from "@/app/components/videos/VideoSearchCard";
import VideosCard from "@/app/components/videos/VideosCard";
import VideoPlayerModal from "@/app/components/videos/VideoPlayerModal";
import { useGetSectorsQuery } from "@/app/services/sectors-api";



export default function VideosPage() {
  const [showVideoModal, setShowVideoModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const { data: sectors, isError } = useGetSectorsQuery();

  const [activeFilter] = useState<"all" | "mine">("all");

  
  
  console.log(sectors)
  console.log(isError)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleViewVideo = (video: any) => {
    setSelectedVideo(video);
    setShowVideoModal(true);
  };

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
      {/* ========================================= */}
      {/* HEADER                                    */}
      {/* ========================================= */}

      <VideoHeader />

      {/* ========================================= */}
      {/* VIDEO SEARCH                              */}
      {/* ========================================= */}

      <VideoSearchCard />

      {/* ========================================= */}
      {/* VIDEOS                                    */}
      {/* ========================================= */}

      <div className="mt-6 w-full">
        <VideosCard
          activeFilter={activeFilter}
          onAddVideo={() => {
            console.log("Add video");
          }}
          onView={(video) => {
            handleViewVideo(video);
          }}
          onDownload={(video) => {
            console.log("Download:", video);
          }}
          onDelete={(video) => {
            console.log("Delete:", video);
          }}
        />
      </div>

      {/* ========================================= */}
      {/* VIDEO PLAYER                              */}
      {/* ========================================= */}

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