"use client";

import { RefObject } from "react";
import {
  FileVideo,
  Trash2,
  UploadCloud,
} from "lucide-react";

import {
  formatDuration,
  formatFileSize,
} from "@/app/helpers/videoHelper";

type VideoFileSectionProps = {
  videoInputRef: RefObject<HTMLInputElement | null>;

  videoFile: File | null;
  videoUrl: string;
  videoDuration: string;

  handleVideoSelect: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;

  handleRemoveVideo: () => void;
};

export default function VideoFileSection({
  videoInputRef,
  videoFile,
  videoUrl,
  videoDuration,
  handleVideoSelect,
  handleRemoveVideo,
}: VideoFileSectionProps) {
  return (
    <section
      className="
        mb-[22px]
        overflow-hidden
        rounded-[14px]
        border
        border-[#e6eaf0]
        bg-white
        shadow-[0_5px_20px_rgba(15,23,42,0.035)]
      "
    >
      {/* ==================================================
          HEADER
          ================================================== */}

      <div
        className="
          flex
          min-h-[78px]
          items-center
          justify-between
          gap-3
          border-b
          border-[#e6eaf0]
          px-6
          py-5
          max-[600px]:flex-col
          max-[600px]:items-start
          max-[600px]:px-4
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-[38px]
              w-[38px]
              items-center
              justify-center
              rounded-[10px]
              bg-red-50
              text-red-500
            "
          >
            <FileVideo size={20} />
          </div>

          <div>
            <h3 className="text-[15px] font-bold text-[#172033]">
              ملف الفيديو
            </h3>

            <span className="mt-0.5 block text-[11px] text-[#718096]">
              اختر ملف الفيديو المراد إضافته للأرشيف
            </span>
          </div>
        </div>

        <span className="text-xs text-[#718096]">
          {videoFile
            ? videoFile.name
            : "لم يتم اختيار فيديو"}
        </span>
      </div>

      {/* ==================================================
          BODY
          ================================================== */}

      <div className="p-6 max-[600px]:p-4">
        <input
          ref={videoInputRef}
          type="file"
          accept="video/mp4,video/webm,video/ogg,.mkv,.avi,.mov"
          onChange={handleVideoSelect}
          hidden
        />

        {/* ==================================================
            NO VIDEO
            ================================================== */}

        {!videoFile ? (
          <button
            type="button"
            onClick={() =>
              videoInputRef.current?.click()
            }
            className="
              flex
              min-h-[230px]
              w-full
              flex-col
              items-center
              justify-center
              rounded-xl
              border
              border-dashed
              border-[#cbd5e1]
              bg-[#f8fafc]
              px-5
              text-center
              transition
              hover:border-blue-400
              hover:bg-[#eff6ff]
            "
          >
            <div
              className="
                mb-4
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                bg-[#dbeafe]
                text-[#2563eb]
              "
            >
              <UploadCloud size={30} />
            </div>

            <h3 className="mb-1 text-sm font-bold text-[#334155]">
              لم يتم اختيار ملف فيديو
            </h3>

            <p className="text-xs text-[#64748b]">
              اضغط هنا لاختيار الفيديو من جهازك
            </p>

            <span className="mt-3 text-[11px] text-[#94a3b8]">
              MP4 · WebM · MOV · AVI · MKV
            </span>
          </button>
        ) : (
          /* ==================================================
             VIDEO SELECTED
             ================================================== */

          <div className="overflow-hidden rounded-xl border border-[#e6eaf0] bg-[#0f172a]">

            {/* VIDEO PREVIEW */}

            <div className="flex min-h-[250px] items-center justify-center bg-black">
              <video
                src={videoUrl}
                controls
                className="
                  max-h-[500px]
                  w-full
                  object-contain
                "
              />
            </div>

            {/* VIDEO INFORMATION */}

            <div
              className="
                flex
                items-center
                justify-between
                gap-4
                bg-white
                p-4
                max-[600px]:flex-col
                max-[600px]:items-stretch
              "
            >
              {/* FILE INFO */}

              <div className="flex min-w-0 items-center gap-3">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-red-50
                    text-red-500
                  "
                >
                  <FileVideo size={21} />
                </div>

                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-[#172033]">
                    {videoFile.name}
                  </div>

                  <div className="mt-1 flex gap-4 text-[11px] text-[#94a3b8]">
                    <span>
                      {formatFileSize(videoFile.size)}
                    </span>

                    {videoDuration && (
                      <span>
                        {videoDuration}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* REMOVE BUTTON */}

              <button
                type="button"
                onClick={handleRemoveVideo}
                className="
                  inline-flex
                  h-9
                  shrink-0
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  border
                  border-red-200
                  bg-white
                  px-3
                  text-xs
                  font-semibold
                  text-red-500
                  transition
                  hover:bg-red-50
                "
              >
                <Trash2 size={15} />

                حذف الفيديو
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}