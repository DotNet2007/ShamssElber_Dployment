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
  UserRound,
  List,
} from "lucide-react";

import Link from "next/link";

/* ========================================================= */
/* VIDEO TYPE                                                 */
/* ========================================================= */

export type VideoItem = {
  Code: number;

  TDate: string | null;

  Item_Code: number | null;

  ProdEntity1_Code: number | null;
  ProdEntity2_Code: number | null;

  Sec_Code: number | null;

  Translate: string | null;

  ItemType_Code: number | null;

  EventType_Code: number | null;

  ProdLine_Code: number | null;

  ItemName: string | null;

  ItemSer: string | null;

  Event_Code: number | null;

  Song_Code: number | null;

  Speaker_Code: number | null;

  EventStatus: string | null;

  ChannelName: string | null;

  YouTubeLink: string | null;

  FaceBookLink: string | null;

  InstagramLink: string | null;

  FileName: string | null;

  ImageLink: string | null;

  RecordStatus: "DRAFT" | "SUBMITTED";

  /* ======================================================= */
  /* RELATIONS                                                */
  /* ======================================================= */

  Sector?: {
    Code: number;
    DescA: string;
  } | null;

  ItemType?: {
    Code: number;
    DescA: string;
  } | null;

  EventType?: {
    Code: number;
    DescA: string;
  } | null;

  ProdLine?: {
    Code: number;
    DescA: string;
  } | null;

  Song?: {
    Code: number;
    DescA: string;
  } | null;

  Speaker?: {
    Code: number;
    DescA: string;
  } | null;

  ProdEntity1?: {
    Code: number;
    DescA: string;
  } | null;

  ProdEntity2?: {
    Code: number;
    DescA: string;
  } | null;

  Event?: {
    Code: number;
    DescA: string;
    Is_Repeated?: string;
  } | null;
};

/* ========================================================= */
/* PROPS                                                       */
/* ========================================================= */

type VideosCardProps = {
  videos?: VideoItem[];

  /*
   * الـ filter أصبح controlled من VideosPage
   */
  activeFilter: "all" | "mine";

  /*
   * تغيير الفلتر
   */
  onAllVideos?: () => void;

  onMyVideos?: () => void;

  /*
   * Actions
   */
  onAddVideo?: () => void;

  onView?: (video: VideoItem) => void;

  onDownload?: (video: VideoItem) => void;

  onDelete?: (video: VideoItem) => void;
};

/* ========================================================= */
/* API URL                                                     */
/* ========================================================= */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

/* ========================================================= */
/* FILE URL HELPER                                             */
/* ========================================================= */

function getFileUrl(
  fileName: string | null | undefined
): string | null {
  if (!fileName) {
    return null;
  }

  const value = fileName.trim();

  if (!value) {
    return null;
  }

  /* ------------------------------------------------------- */
  /* Already a complete URL                                   */
  /* ------------------------------------------------------- */

  if (
    value.startsWith("http://") ||
    value.startsWith("https://")
  ) {
    return value;
  }

  /* ------------------------------------------------------- */
  /* Already an absolute path                                 */
  /* ------------------------------------------------------- */

  if (value.startsWith("/")) {
    return `${API_URL}${value}`;
  }

  /* ------------------------------------------------------- */
  /* File stored by video upload                              */
  /* ------------------------------------------------------- */

  return `${API_URL}/uploads/videos/${encodeURIComponent(
    value
  )}`;
}

/* ========================================================= */
/* VIDEOS CARD                                                 */
/* ========================================================= */

export default function VideosCard({
  videos = [],
  activeFilter,
  onAllVideos,
  onMyVideos,
  onAddVideo,
  onView,
  onDownload,
  onDelete,
}: VideosCardProps) {
  /* ======================================================== */
  /* FILTER                                                    */
  /* ======================================================== */

  const handleAllVideos = () => {
    onAllVideos?.();
  };

  const handleMyVideos = () => {
    onMyVideos?.();
  };

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
      {/* ================================================== */}
      {/* HEADER */}
      {/* ================================================== */}

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
        {/* ================================================== */}
        {/* TITLE */}
        {/* ================================================== */}

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

        {/* ================================================== */}
        {/* BUTTONS */}
        {/* ================================================== */}

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-2
          "
        >
          {/* ================================================== */}
          {/* ALL */}
          {/* ================================================== */}

          <button
            type="button"
            onClick={handleAllVideos}
            className={`
              flex
              h-9
              items-center
              gap-1.5
              rounded-lg
              px-3.5
              text-[12px]
              font-semibold
              transition
              active:scale-[0.98]

              ${
                activeFilter === "all"
                  ? `
                    bg-indigo-600
                    text-white
                    shadow-sm
                    hover:bg-indigo-700
                  `
                  : `
                    border
                    border-slate-200
                    bg-white
                    text-slate-600
                    hover:border-indigo-200
                    hover:bg-indigo-50
                    hover:text-indigo-600
                  `
              }
            `}
          >
            <List size={15} />

            <span>
              الكل
            </span>
          </button>

          {/* ================================================== */}
          {/* MY VIDEOS */}
          {/* ================================================== */}

          <button
            type="button"
            onClick={handleMyVideos}
            className={`
              flex
              h-9
              items-center
              gap-1.5
              rounded-lg
              px-3.5
              text-[12px]
              font-semibold
              transition
              active:scale-[0.98]

              ${
                activeFilter === "mine"
                  ? `
                    bg-indigo-600
                    text-white
                    shadow-sm
                    hover:bg-indigo-700
                  `
                  : `
                    border
                    border-slate-200
                    bg-white
                    text-slate-600
                    hover:border-indigo-200
                    hover:bg-indigo-50
                    hover:text-indigo-600
                  `
              }
            `}
          >
            <UserRound size={15} />

            <span>
              الفيديوهات الخاصة بي
            </span>
          </button>

          {/* ================================================== */}
          {/* ADD VIDEO */}
          {/* ================================================== */}

          <Link
            href="/videos/add"
            onClick={onAddVideo}
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
      </div>

      {/* ================================================== */}
      {/* VIDEO GRID */}
      {/* ================================================== */}

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
        {videos.length === 0 ? (
          <div
            className="
              col-span-full
              flex
              min-h-[220px]
              items-center
              justify-center
              text-sm
              text-slate-400
            "
          >
            {activeFilter === "mine"
              ? "لا توجد فيديوهات خاصة بك"
              : "لا توجد فيديوهات"}
          </div>
        ) : (
          videos.map((video) => (
            <VideoItemCard
              key={video.Code}
              video={video}
              onView={onView}
              onDownload={onDownload}
              onDelete={onDelete}
            />
          ))
        )}
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
  /* ======================================================== */
  /* DISPLAY VALUES                                           */
  /* ======================================================== */

  const videoTitle =
    video.ItemName?.trim() || "بدون اسم";

  const fileName =
    video.FileName?.trim() || "بدون ملف";

  const imageUrl = getFileUrl(
    video.ImageLink
  );

  const videoUrl = getFileUrl(
    video.FileName
  );

  const formattedDate = video.TDate
    ? new Date(
        video.TDate
      ).toLocaleDateString(
        "ar-EG",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )
    : "-";

  const recordStatus =
    video.RecordStatus === "DRAFT"
      ? "مسودة"
      : "تم الإرسال";

  /* ======================================================== */
  /* ITEM TYPE                                                 */
  /* ======================================================== */

  const itemType =
    video.ItemType?.DescA?.trim() ||
    (video.ItemType_Code
      ? `#${video.ItemType_Code}`
      : "-");

  /* ======================================================== */
  /* SECTOR                                                    */
  /* ======================================================== */

  const sector =
    video.Sector?.DescA?.trim() ||
    (video.Sec_Code
      ? `#${video.Sec_Code}`
      : "-");

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
        
        hover:border-slate-300
        hover:shadow-[0_8px_25px_rgba(15,23,42,0.07)]
      "
    >
      {/* ================================================== */}
      {/* THUMBNAIL */}
      {/* ================================================== */}

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
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={videoTitle}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-300
              
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

        {/* ================================================== */}
        {/* DARK OVERLAY */}
        {/* ================================================== */}

        <div
          className="
            absolute
            inset-0
            bg-black/10
            transition
            group-hover:bg-black/25
          "
        />

        {/* ================================================== */}
        {/* PLAY */}
        {/* ================================================== */}

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

        {/* ================================================== */}
        {/* RECORD STATUS */}
        {/* ================================================== */}

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
          {recordStatus}
        </div>
      </button>

      {/* ================================================== */}
      {/* CONTENT */}
      {/* ================================================== */}

      <div className="p-4">
        {/* ================================================== */}
        {/* TITLE */}
        {/* ================================================== */}

        <div className="min-w-0">
          <h3
            className="
              truncate
              text-[13px]
              font-bold
              text-slate-800
            "
            title={videoTitle}
          >
            {videoTitle}
          </h3>

          <p
            className="
              mt-1
              truncate
              text-[10px]
              text-slate-400
            "
            title={fileName}
          >
            {fileName}
          </p>
        </div>

        {/* ================================================== */}
        {/* META */}
        {/* ================================================== */}

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
          {/* ================================================== */}
          {/* DATE */}
          {/* ================================================== */}

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
              {formattedDate}
            </span>
          </div>

          {/* ================================================== */}
          {/* ITEM TYPE */}
          {/* ================================================== */}

          <span
            className="
              shrink-0
              max-w-[120px]
              truncate
              rounded-md
              bg-slate-100
              px-2
              py-1
              text-[9px]
              font-medium
              text-slate-500
            "
            title={itemType}
          >
            {itemType}
          </span>
        </div>

        {/* ================================================== */}
        {/* SECTOR */}
        {/* ================================================== */}

        <div
          className="
            mt-2
            flex
            items-center
            justify-end
          "
        >
          <span
            className="
              truncate
              text-[9px]
              text-slate-400
            "
            title={sector}
          >
            {sector}
          </span>
        </div>

        {/* ================================================== */}
        {/* ACTIONS */}
        {/* ================================================== */}

        <div
          className="
            mt-3
            flex
            items-center
            justify-end
            gap-1.5
          "
        >
          {/* ================================================== */}
          {/* VIEW */}
          {/* ================================================== */}

          <VideoActionButton
            title="عرض"
            onClick={() =>
              onView?.(video)
            }
          >
            <Eye size={14} />
          </VideoActionButton>

          {/* ================================================== */}
          {/* DOWNLOAD */}
          {/* ================================================== */}

          <VideoActionButton
            title="تحميل"
            onClick={() => {
              if (videoUrl) {
                window.open(
                  videoUrl,
                  "_blank",
                  "noopener,noreferrer"
                );
              }

              onDownload?.(video);
            }}
          >
            <Download size={14} />
          </VideoActionButton>

          {/* ================================================== */}
          {/* DELETE */}
          {/* ================================================== */}

          <VideoActionButton
            title="حذف"
            danger
            onClick={() =>
              onDelete?.(video)
            }
          >
            <Trash2 size={14} />
          </VideoActionButton>

          {/* ================================================== */}
          {/* MORE */}
          {/* ================================================== */}

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