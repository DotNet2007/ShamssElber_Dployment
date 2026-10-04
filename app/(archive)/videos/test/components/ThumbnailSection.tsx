"use client";

import {
  Image as ImageIcon,
  ImagePlus,
  Trash2,
} from "lucide-react";
import { RefObject } from "react";

type ThumbnailSectionProps = {
  thumbnailInputRef: RefObject<HTMLInputElement | null>;

  thumbnailUrl: string;

  thumbnailFile: File | null;

  handleThumbnailSelect: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;

  handleRemoveThumbnail: () => void;
};

export default function ThumbnailSection({
  thumbnailInputRef,
  thumbnailUrl,
  thumbnailFile,
  handleThumbnailSelect,
  handleRemoveThumbnail,
}: ThumbnailSectionProps) {
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
      {/* HEADER */}

      <div
        className="
          flex
          items-center
          gap-3
          border-b
          border-[#e6eaf0]
          px-6
          py-5
          max-[600px]:px-4
        "
      >
        <div
          className="
            flex
            h-[38px]
            w-[38px]
            items-center
            justify-center
            rounded-[10px]
            bg-[#eff6ff]
            text-[#2563eb]
          "
        >
          <ImageIcon size={20} />
        </div>

        <div>
          <h3 className="text-[15px] font-bold text-[#172033]">
            صور تعريفية
          </h3>

          <span className="mt-0.5 block text-[11px] text-[#718096]">
            صورة تعريفية تظهر أثناء تصفح أرشيف الفيديوهات
          </span>
        </div>
      </div>

      {/* BODY */}

      <div className="p-6 max-[600px]:p-4">
        <input
          ref={thumbnailInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleThumbnailSelect}
          hidden
        />

        <div
          className="
            flex
            items-center
            gap-6
            max-[600px]:flex-col
            max-[600px]:items-stretch
          "
        >
          {/* PREVIEW */}

          <div
            className="
              flex
              h-[180px]
              w-[280px]
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-xl
              border
              border-dashed
              border-[#cbd5e1]
              bg-[#f8fafc]
              max-[600px]:w-full
            "
          >
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt="Video thumbnail"
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className="
                  flex
                  flex-col
                  items-center
                  gap-2
                  text-[#94a3b8]
                "
              >
                <ImagePlus size={30} />

                <span className="text-xs">
                  لم يتم اختيار صورة
                </span>
              </div>
            )}
          </div>

          {/* BUTTONS */}

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() =>
                thumbnailInputRef.current?.click()
              }
              className="
                inline-flex
                h-10
                items-center
                justify-center
                gap-2
                rounded-[9px]
                border
                border-[#e6eaf0]
                bg-white
                px-4
                text-xs
                font-semibold
                text-[#4a5568]
                transition
                hover:bg-[#eff6ff]
                hover:text-[#2563eb]
              "
            >
              <ImagePlus size={16} />

              اختيار صورة
            </button>

            {thumbnailFile && (
              <button
                type="button"
                onClick={handleRemoveThumbnail}
                className="
                  inline-flex
                  h-10
                  items-center
                  justify-center
                  gap-2
                  rounded-[9px]
                  border
                  border-red-200
                  bg-white
                  px-4
                  text-xs
                  font-semibold
                  text-red-500
                  transition
                  hover:bg-red-50
                "
              >
                <Trash2 size={16} />

                حذف الصورة
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}