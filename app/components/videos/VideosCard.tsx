"use client";

import {
  Download,
  Eye,
  MoreVertical,
  Plus,
  Trash2,
  Play,
  CalendarDays,
  Video,
} from "lucide-react";
import Link from "next/link";

export type VideoItem = {
  id: number;
  fileName: string;
  title: string;
  classification: string;
  duration: string;
  date: string;
  thumbnail?: string;
};

type VideosCardProps = {
  videos?: VideoItem[];
  onAddVideo?: () => void;
  onView?: (video: VideoItem) => void;
  onDownload?: (video: VideoItem) => void;
  onDelete?: (video: VideoItem) => void;
};

const defaultVideos: VideoItem[] = [
  {
    id: 1,
    fileName: "https://unsplash.com/photos/a-church-interior-features-stained-glass-windows-and-a-cross-mKF-470xjUc?utm_source=chatgpt.com",
    title: "احتفال الكنيسة",
    classification: "احتفالات",
    duration: "12:35",
    date: "27 سبتمبر 2026",
  },
  {
    id: 2,
    fileName: "https://unsplash.com/photos/a-church-interior-features-stained-glass-windows-and-a-cross-mKF-470xjUc?utm_source=chatgpt.com",
    title: "عظة الأحد",
    classification: "عظات",
    duration: "45:20",
    date: "25 سبتمبر 2026",
  },
  {
    id: 3,
    fileName: "video_003.mp4",
    title: "اجتماع الشباب",
    classification: "اجتماعات",
    duration: "32:14",
    date: "22 سبتمبر 2026",
  },
  {
    id: 4,
    fileName: "video_004.mp4",
    title: "ترنيمة خاصة",
    classification: "ترانيم",
    duration: "06:42",
    date: "20 سبتمبر 2026",
  },
  {
    id: 5,
    fileName: "video_005.mp4",
    title: "مؤتمر الشباب",
    classification: "مؤتمرات",
    duration: "01:24:30",
    date: "18 سبتمبر 2026",
  },
  {
    id: 6,
    fileName: "video_006.mp4",
    title: "احتفال خاص",
    classification: "احتفالات",
    duration: "22:10",
    date: "15 سبتمبر 2026",
  },
];

export default function VideosCard({
  videos = defaultVideos,
  onAddVideo,
  onView,
  onDownload,
  onDelete,
}: VideosCardProps) {
  return (
    <section
      dir="rtl"
      className="
        w-full
        min-w-0
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-[0_2px_10px_rgba(15,23,42,0.04)]
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          flex-wrap
          items-center
          justify-between
          gap-4
          border-b
          border-slate-200
          px-5
          py-4
          md:px-6
        "
      >
        {/* TITLE */}

        <div className="flex items-center gap-2">
          <Video
            size={19}
            className="text-red-600"
          />

          <span
            className="
              text-[17px]
              font-bold
              text-slate-800
            "
          >
            الفيديوهات
          </span>

          <span
            className="
              flex
              h-6
              min-w-6
              items-center
              justify-center
              rounded-full
              bg-red-50
              px-1.5
              text-[11px]
              font-semibold
              text-red-600
            "
          >
            {videos.length}
          </span>
        </div>

        {/* ADD */}

        <Link
        href={"/videos/add"}
        //   onClick={onAddVideo}
          className="
            flex
            h-9
            items-center
            gap-1.5
            rounded-lg
            bg-indigo-600
            px-3.5
            text-[12px]
            font-semibold
            text-white
            transition
            hover:bg-indigo-700
            active:scale-[0.98]
          "
        >
          <Plus size={15} />

          <span>
            إضافة فيديو
          </span>
        </Link>
      </div>

      {/* VIDEO GRID */}

      <div
        className="
          grid
          grid-cols-1
          gap-4
          p-4
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          md:p-5
        "
      >
        {videos.map((video) => (
          <VideoItemCard
            key={video.id}
            video={video}
            onView={onView}
            onDownload={onDownload}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}

/* ========================================================= */
/* VIDEO ITEM CARD                                            */
/* ========================================================= */

function VideoItemCard({
  video,
  onView,
  onDownload,
  onDelete,
}: {
  video: VideoItem;
  onView?: (video: VideoItem) => void;
  onDownload?: (video: VideoItem) => void;
  onDelete?: (video: VideoItem) => void;
}) {
  return (
    <div
      className="
        group
        min-w-0
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:border-slate-300
        hover:shadow-[0_8px_25px_rgba(15,23,42,0.07)]
      "
    >
      {/* THUMBNAIL */}

      <button
        type="button"
        onClick={() => onView?.(video)}
        className="
          relative
          block
          aspect-video
          w-full
          overflow-hidden
          bg-slate-900
        "
      >
        {video.thumbnail ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-300
              group-hover:scale-105
            "
          />
        ) : (
          <div
            className="
              flex
              h-full
              w-full
              items-center
              justify-center
              bg-gradient-to-br
              from-slate-800
              to-slate-950
            "
          >
            <Video
              size={42}
              strokeWidth={1.4}
              className="text-slate-500"
            />
          </div>
        )}

        {/* DARK OVERLAY */}

        <div
          className="
            absolute
            inset-0
            bg-black/10
            transition
            group-hover:bg-black/25
          "
        />

        {/* PLAY */}

        <div
          className="
            absolute
            left-1/2
            top-1/2
            flex
            h-12
            w-12
            -translate-x-1/2
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-white/95
            text-indigo-600
            shadow-lg
            transition-transform
            duration-200
            group-hover:scale-110
          "
        >
          <Play
            size={19}
            fill="currentColor"
            className="mr-[-2px]"
          />
        </div>

        {/* DURATION */}

        <div
          className="
            absolute
            bottom-2
            left-2
            rounded-md
            bg-black/75
            px-2
            py-1
            text-[10px]
            font-medium
            text-white
          "
        >
          {video.duration}
        </div>
      </button>

      {/* CONTENT */}

      <div className="p-4">
        {/* TITLE */}

        <div className="min-w-0">
          <h3
            className="
              truncate
              text-[13px]
              font-bold
              text-slate-800
            "
            title={video.title}
          >
            {video.title}
          </h3>

          <p
            className="
              mt-1
              truncate
              text-[10px]
              text-slate-400
            "
            title={video.fileName}
          >
            {video.fileName}
          </p>
        </div>

        {/* META */}

        <div
          className="
            mt-4
            flex
            items-center
            justify-between
            gap-2
            border-t
            border-slate-100
            pt-3
          "
        >
          <div
            className="
              flex
              min-w-0
              items-center
              gap-1.5
              text-[10px]
              text-slate-500
            "
          >
            <CalendarDays
              size={13}
              className="shrink-0"
            />

            <span className="truncate">
              {video.date}
            </span>
          </div>

          <span
            className="
              shrink-0
              rounded-md
              bg-slate-100
              px-2
              py-1
              text-[9px]
              font-medium
              text-slate-500
            "
          >
            {video.classification}
          </span>
        </div>

        {/* ACTIONS */}

        <div
          className="
            mt-3
            flex
            items-center
            justify-end
            gap-1.5
          "
        >
          <VideoActionButton
            title="عرض"
            onClick={() => onView?.(video)}
          >
            <Eye size={14} />
          </VideoActionButton>

          <VideoActionButton
            title="تحميل"
            onClick={() => onDownload?.(video)}
          >
            <Download size={14} />
          </VideoActionButton>

          <VideoActionButton
            title="حذف"
            danger
            onClick={() => onDelete?.(video)}
          >
            <Trash2 size={14} />
          </VideoActionButton>

          <VideoActionButton title="المزيد">
            <MoreVertical size={14} />
          </VideoActionButton>
        </div>
      </div>
    </div>
  );
}

/* ========================================================= */
/* ACTION BUTTON                                              */
/* ========================================================= */

function VideoActionButton({
  children,
  title,
  danger = false,
  onClick,
}: {
  children: React.ReactNode;
  title: string;
  danger?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`
        flex
        h-8
        w-8
        shrink-0
        items-center
        justify-center
        rounded-lg
        border
        bg-white
        transition

        ${
          danger
            ? `
              border-slate-200
              text-slate-500
              hover:border-red-200
              hover:bg-red-50
              hover:text-red-500
            `
            : `
              border-slate-200
              text-slate-500
              hover:bg-slate-50
              hover:text-indigo-600
            `
        }
      `}
    >
      {children}
    </button>
  );
}