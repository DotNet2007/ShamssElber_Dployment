"use client";

import { ChevronLeft, Lock, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  canCreate: boolean;
}

export default function AddDocumentButton({
  canCreate,
}: Props) {
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={!canCreate}
      onClick={() => {
        if (canCreate) {
          router.push("/pdfs/add");
        }
      }}
      title={
        canCreate
          ? "إضافة مستند جديد"
          : "ليس لديك صلاحية إضافة مستند"
      }
      className={`
        flex
        min-h-[68px]
        w-full
        items-center
        gap-[14px]
        rounded-[10px]
        border
        border-dashed
        border-slate-300
        bg-white
        px-[18px]
        py-[13px]
        text-right
        transition

        ${
          canCreate
            ? "cursor-pointer text-slate-700 hover:border-blue-300 hover:bg-slate-50 hover:shadow-[0_3px_10px_rgba(15,23,42,0.05)]"
            : "cursor-not-allowed opacity-55 grayscale-[25%]"
        }
      `}
    >

      {/* ICON */}

      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-[9px]
          bg-blue-50
          text-blue-600
        "
      >
        {canCreate ? (
          <Plus className="h-5 w-5" />
        ) : (
          <Lock className="h-5 w-5" />
        )}
      </div>


      {/* CONTENT */}

      <div className="flex flex-1 flex-col gap-1 text-right">

        <div className="text-sm font-semibold text-slate-800">
          إضافة مستند جديد
        </div>

        <div className="text-xs text-slate-400">
          {canCreate
            ? "اضغط هنا لرفع مستند PDF جديد"
            : "ليس لديك صلاحية لإضافة مستند"}
        </div>

      </div>


      {/* ARROW */}

      <div className="flex items-center justify-center text-slate-400">

        {canCreate ? (
          <ChevronLeft className="h-[18px] w-[18px]" />
        ) : (
          <Lock className="h-[18px] w-[18px]" />
        )}

      </div>

    </button>
  );
}

