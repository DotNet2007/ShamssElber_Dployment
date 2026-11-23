
"use client";

import { useEffect, useState } from "react";
import { X, Download, Loader2, FileVideo } from "lucide-react";
import type { VideoItem } from "@/app/(archive)/videos/new/VideosCard";

interface Props {
  video: VideoItem | null;
  onClose: () => void;
}

export default function ViewerVideoModal({
  video,
  onClose,
}: Props) {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");

  // Close modal with Escape key
  useEffect(() => {
    if (!video) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [video, onClose]);

  // Download video
  const handleDownload = async () => {
    if (!video || downloading) return;

    try {
      setDownloading(true);
      setError("");

      const token = localStorage.getItem("userToken");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/videos/${video.Code}/download`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      if (!response.ok) {
        throw new Error("فشل تحميل الفيديو.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = video.FileName || `video-${video.Code}.mp4`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 1000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "حدث خطأ أثناء تحميل الفيديو."
      );
    } finally {
      setDownloading(false);
    }
  };

  if (!video) return null;

  const videoUrl = video.FileName
  ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/videos/${encodeURIComponent(video.FileName)}`
  : "";

  return (
    <div
      className="
        fixed inset-0 z-100
        flex items-center justify-center
        bg-black/75 p-4 backdrop-blur-sm
      "
      onClick={onClose}
    >
      <div
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-4xl overflow-hidden
          rounded-2xl bg-white shadow-2xl
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <FileVideo
              size={20}
              className="text-blue-600"
            />

            <h2 className="font-bold text-slate-800">
                {video.ItemName}
            </h2>

            <span className="text-xs text-slate-400">
              #{video.Code}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-full p-2 text-slate-500
              transition hover:bg-slate-100
              hover:text-red-500
            "
            aria-label="إغلاق"
          >
            <X size={20} />
          </button>
        </div>

        {/* VIDEO PLAYER */}
        <div className="flex items-center justify-center bg-black">
          <video
            key={video.Code}
            controls
            autoPlay
            playsInline
            className="
              aspect-video max-h-[65vh]
              w-full object-contain
            "
          >
            <source
              src={videoUrl}
              type="video/mp4"
            />

            متصفحك لا يدعم تشغيل الفيديو.
          </video>
        </div>

        {/* FOOTER */}
        <div className="flex flex-col gap-3 p-5">
          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="
              flex w-full items-center justify-center gap-2
              rounded-xl bg-blue-600 px-5 py-3
              font-semibold text-white transition
              hover:bg-blue-700
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {downloading ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                جاري تحميل الفيديو...
              </>
            ) : (
              <>
                <Download size={18} />
                تحميل الفيديو
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
