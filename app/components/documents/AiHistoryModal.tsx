
"use client";

import {
  History,
  MessageSquare,
  Sparkles,
  X,
} from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AiHistoryModal({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        bg-slate-900/55
        backdrop-blur-[4px]
      "
    >

      <div
        dir="rtl"
        className="
          relative
          z-10
          mx-auto
          my-10
          flex
          max-h-[calc(100vh-80px)]
          w-[900px]
          max-w-[calc(100%-40px)]
          flex-col
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-[0_25px_70px_rgba(15,23,42,0.25)]

          max-[600px]:
            my-[10px]
            max-h-[calc(100vh-20px)]
            max-w-[calc(100%-20px)]
        "
      >

        {/* CLOSE */}

        <button
          type="button"
          onClick={onClose}
          aria-label="إغلاق"
          className="
            absolute
            left-[18px]
            top-[18px]
            z-20
            flex
            h-[34px]
            w-[34px]
            items-center
            justify-center
            rounded-lg
            border-0
            bg-white/15
            text-white
            hover:bg-white/25
          "
        >
          <X className="h-[18px] w-[18px]" />
        </button>


        {/* HEADER */}

        <div
          className="
            flex
            min-h-[90px]
            items-center
            gap-[14px]
            bg-gradient-to-br
            from-indigo-600
            to-blue-600
            px-6
            py-5
            pl-[65px]
            text-white
          "
        >

          <div
            className="
              flex
              h-[45px]
              w-[45px]
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-white/20
            "
          >
            <History className="h-[23px] w-[23px]" />
          </div>

          <div>

            <h2 className="mb-[5px] text-lg font-bold">
              سجل أسئلة الذكاء الاصطناعي
            </h2>

            <p className="text-xs opacity-80">
              الأسئلة والإجابات السابقة الخاصة بشركتك.
            </p>

          </div>

        </div>


        {/* BODY */}

        <div
          className="
            max-h-[calc(100vh-170px)]
            overflow-y-auto
            p-6

            max-[600px]:p-[18px]
          "
        >

          {/* EMPTY */}

          <div
            className="
              flex
              min-h-[220px]
              flex-col
              items-center
              justify-center
              text-center
              text-slate-400
            "
          >
            <MessageSquare
              className="
                mb-3
                h-[45px]
                w-[45px]
                text-slate-300
              "
            />

            <h3 className="mb-[7px] text-[15px] text-slate-500">
              لا يوجد سجل أسئلة
            </h3>

            <p className="text-xs text-slate-400">
              لم تقم بطرح أي أسئلة حتى الآن.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
