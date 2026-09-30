"use client";

import { Video } from "lucide-react";

type DashboardHeaderProps = {
  title?: string;
  description?: string;
};

export default function VideoHeader({
  title = "الفيديوهات",
  description = "إدارة وتصفح جميع الفيديوهات",
}: DashboardHeaderProps) {
  return (
    <div
      dir="rtl"
      className="
        mb-7
        flex
        items-center
        justify-between
        gap-4
      "
    >
      <div className="flex min-w-0 items-center gap-3">
        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-red-50
            text-red-600
          "
        >
          <Video
            size={24}
            strokeWidth={1.8}
          />
        </div>

        <div className="min-w-0">
          <h1
            className="
              truncate
              text-2xl
              font-bold
              text-slate-900
              md:text-[26px]
            "
          >
            {title}
          </h1>

          <p
            className="
              mt-1
              truncate
              text-[12px]
              text-slate-500
              md:text-[13px]
            "
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}