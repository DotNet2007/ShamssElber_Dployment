
"use client";

import {
  FileText,
  Sparkles,
  X,
} from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AiAnswerModal({
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

      {/* MODAL */}

      <div
        dir="rtl"
        className="
          relative
          z-10
          mx-auto
          my-10
          flex
          max-h-[calc(100vh-80px)]
          w-[760px]
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
            transition
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

            max-[600px]:
              px-[18px]
              py-5
              pl-[55px]
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
            <Sparkles className="h-[23px] w-[23px]" />
          </div>

          <div>
            <h2 className="mb-[5px] text-lg font-bold">
              إجابة الذكاء الاصطناعي
            </h2>

            <p className="text-xs opacity-80">
              الإجابة مبنية فقط على محتوى مستنداتك.
            </p>
          </div>

        </div>


        {/* BODY */}

        <div
          className="
            overflow-y-auto
            p-6

            max-[600px]:p-[18px]
          "
        >

          {/* Loading */}

          <div className="
            flex
            items-center
            justify-center
            gap-3
            py-[35px]
            text-[13px]
            text-slate-500
          ">
            <div
              className="
                h-[22px]
                w-[22px]
                animate-spin
                rounded-full
                border-[3px]
                border-slate-200
                border-t-indigo-600
              "
            />

            <span>
              جاري البحث داخل جميع المستندات...
            </span>
          </div>


          {/* RESULT */}

          <div
            className="
              rounded-[10px]
              border
              border-slate-200
              bg-slate-50
              p-5
              text-right
              text-sm
              leading-[1.9]
              text-slate-700
            "
          >
            {/* AI answer will be inserted here */}
          </div>


          {/* SOURCES */}

          <div className="mt-5">

            <div
              className="
                mb-3
                flex
                items-center
                gap-2
                text-sm
                font-bold
                text-slate-700
              "
            >
              <FileText className="h-[18px] w-[18px] text-blue-600" />

              المصادر
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

