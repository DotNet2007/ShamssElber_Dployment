"use client";

import {
  X,
  Video,
  CalendarDays,
  Clock,
} from "lucide-react";

type VideoPlayerModalProps = {
  open: boolean;
  video?: {
    id: number;
    fileName: string;
    title: string;
    classification: string;
    duration: string;
    date: string;
    thumbnail?: string;
    videoUrl?: string;
  } | null;
  onClose: () => void;
};

export default function VideoPlayerModal({
  open,
  video,
  onClose,
}: VideoPlayerModalProps) {
  if (!open || !video) {
    return null;
  }

  return (
    <div
      dir="rtl"
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-slate-950/70
        p-4
        backdrop-blur-sm
        md:p-6
      "
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="
          relative
          flex
          max-h-[92vh]
          w-full
          max-w-[1000px]
          flex-col
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl
        "
      >
        {/* HEADER */}

        <div
          className="
            flex
            min-h-[64px]
            items-center
            justify-between
            gap-4
            border-b
            border-slate-200
            px-4
            py-3
            md:px-5
          "
        >
          {/* TITLE */}

          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-red-50
                text-red-600
              "
            >
              <Video size={18} />
            </div>

            <div className="min-w-0">
              <h2
                className="
                  truncate
                  text-[14px]
                  font-bold
                  text-slate-800
                "
                title={video.title}
              >
                {video.title}
              </h2>

              <p
                className="
                  mt-0.5
                  truncate
                  text-[10px]
                  text-slate-400
                "
              >
                {video.fileName}
              </p>
            </div>
          </div>

          {/* CLOSE */}

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-lg
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
            "
          >
            <X size={19} />
          </button>
        </div>

        {/* VIDEO */}

        <div
          className="
            flex
            min-h-0
            flex-1
            items-center
            justify-center
            bg-black
          "
        >
          {video.videoUrl ? (
            <video
              src={video.videoUrl}
              controls
              autoPlay
              className="
                max-h-[65vh]
                w-full
                object-contain
              "
            />
          ) : (
            <div
              className="
                flex
                aspect-video
                w-full
                items-center
                justify-center
                bg-gradient-to-br
                from-slate-900
                to-black
              "
            >
              <div className="text-center">
                <Video
                  size={52}
                  strokeWidth={1.3}
                  className="
                    mx-auto
                    text-slate-600
                  "
                />

                <p
                  className="
                    mt-4
                    text-sm
                    text-slate-400
                  "
                >
                  معاينة الفيديو غير متاحة
                </p>

                <p
                  className="
                    mt-1
                    text-[10px]
                    text-slate-600
                  "
                >
                  سيتم ربط الفيديو عند إضافة مسار الملف
                </p>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}

        <div
          className="
            flex
            flex-wrap
            items-center
            justify-between
            gap-3
            border-t
            border-slate-200
            bg-white
            px-4
            py-3
            md:px-5
          "
        >
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-4
              text-[10px]
              text-slate-500
            "
          >
            {/* DATE */}

            <div className="flex items-center gap-1.5">
              <CalendarDays size={13} />

              <span>
                {video.date}
              </span>
            </div>

            {/* DURATION */}

            <div className="flex items-center gap-1.5">
              <Clock size={13} />

              <span>
                {video.duration}
              </span>
            </div>

            {/* CLASSIFICATION */}

            <span
              className="
                rounded-md
                bg-slate-100
                px-2
                py-1
                text-[9px]
              "
            >
              {video.classification}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              h-9
              rounded-lg
              border
              border-slate-200
              px-4
              text-[11px]
              font-medium
              text-slate-600
              transition
              hover:bg-slate-50
            "
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}