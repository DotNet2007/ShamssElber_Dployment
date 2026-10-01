"use client";

import {
  Search,
  SlidersHorizontal,
  CalendarDays,
  X,
} from "lucide-react";

type VideoSearchCardProps = {
  search?: string;
  onSearchChange?: (value: string) => void;
  onFilter?: () => void;
  onClear?: () => void;
};

export default function VideoSearchCard({
  search = "",
  onSearchChange,
  onFilter,
  onClear,
}: VideoSearchCardProps) {
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
      <div
        className="
          flex
          flex-wrap
          items-center
          gap-3
          p-4
          md:p-5
        "
      >
        {/* SEARCH */}

        <div
          className="
            relative
            min-w-0
            flex-1
            basis-[260px]
          "
        >
          <Search
            size={17}
            className="
              pointer-events-none
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              onSearchChange?.(e.target.value)
            }
            placeholder="ابحث باسم الفيديو..."
            className="
              h-11
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              pr-10
              pl-10
              text-[12px]
              text-slate-700
              outline-none
              transition
              placeholder:text-slate-400
              focus:border-blue-400
              focus:bg-white
              focus:ring-2
              focus:ring-blue-50
            "
          />

          {search && (
            <button
              type="button"
              onClick={onClear}
              className="
                absolute
                left-3
                top-1/2
                flex
                h-6
                w-6
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                text-slate-400
                transition
                hover:bg-slate-100
                hover:text-slate-600
              "
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* FILTER */}

        <button
          type="button"
          onClick={onFilter}
          className="
            flex
            h-11
            shrink-0
            items-center
            gap-2
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            text-[12px]
            font-medium
            text-slate-600
            transition
            hover:bg-slate-50
          "
        >
          <SlidersHorizontal size={16} />

          <span>
            الفلاتر
          </span>
        </button>

        {/* DATE */}

                      {/* FROM DATE */}

            <div
              className="
                relative
                shrink-0
                max-[600px]:flex-1
              "
            >
              <label
                className="
                  absolute
                  -top-2
                  right-2
                  z-10
                  bg-white
                  px-1
                  text-[9px]
                  text-slate-500
                "
              >
                من التاريخ
              </label>

              <input
                type="date"
                className="
                  h-10
                  w-[135px]
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  px-3
                  text-[11px]
                  text-slate-500
                  outline-none
                  focus:border-blue-400
                  max-[600px]:w-full
                "
              />
            </div>

            {/* TO DATE */}

            <div
              className="
                relative
                shrink-0
                max-[600px]:flex-1
              "
            >
              <label
                className="
                  absolute
                  -top-2
                  right-2
                  z-10
                  bg-white
                  px-1
                  text-[9px]
                  text-slate-500
                "
              >
                إلى التاريخ
              </label>

              <input
                type="date"
                className="
                  h-10
                  w-[135px]
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  px-3
                  text-[11px]
                  text-slate-500
                  outline-none
                  focus:border-blue-400
                  max-[600px]:w-full
                "
              />
            </div>

        {/* <div
          className="
            relative
            shrink-0
          "
        >
          <CalendarDays
            size={15}
            className="
              pointer-events-none
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="date"
            className="
              h-11
              w-[145px]
              rounded-xl
              border
              border-slate-200
              bg-white
              pr-9
              pl-2
              text-[11px]
              text-slate-500
              outline-none
              focus:border-blue-400
            "
          />
        </div> */}
      </div>
    </section>
  );
}