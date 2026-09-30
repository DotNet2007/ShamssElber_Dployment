
import { ScanText, Package } from "lucide-react";

export default function Footer() {
  return (
    <footer
      dir="rtl"
      className="
        mt-10
        w-full
        border-t
        border-gray-200
        font-[Cairo]
        text-slate-500
      "
    >
      <div
        className="
          mx-auto
          flex
          min-h-[65px]
          w-[1200px]
          max-w-[calc(100%-40px)]
          flex-wrap
          items-center
          justify-center
          gap-[18px]
          text-center

          max-[1250px]:max-w-[calc(100%-32px)]

          max-[768px]:
            min-h-[75px]
            max-w-[calc(100%-24px)]
            flex-col
            gap-[7px]
        "
      >

        {/* =====================================================
            BRAND
        ===================================================== */}

        <div
          className="
            flex
            items-center
            justify-center
            gap-[7px]
            text-xs
            font-bold
            text-slate-800
          "
        >
          <ScanText
            className="
              h-4
              w-4
              text-[#3b5bdb]
            "
          />

          <span>
            OCR Archive
          </span>
        </div>


        {/* =====================================================
            META
        ===================================================== */}

        <div
          className="
            flex
            items-center
            justify-center
            gap-3
            text-[10px]
            text-slate-400
          "
        >

          {/* VERSION */}

          <div
            className="
              flex
              items-center
              justify-center
              gap-[5px]
            "
          >
            <Package
              className="
                h-[13px]
                w-[13px]
                text-slate-400
              "
            />

            <span>
              الإصدار 1.0.0
            </span>
          </div>


          {/* DIVIDER */}

          <div
            className="
              h-4
              w-px
              bg-slate-200
            "
          />


          {/* COPYRIGHT */}

          <div
            className="
              flex
              items-center
              justify-center
              gap-[5px]
            "
          >
            <span>
              © {new Date().getFullYear()}
            </span>

            <span>
              جميع الحقوق محفوظة
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}

