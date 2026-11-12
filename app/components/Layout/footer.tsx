import { ScanText, Package } from "lucide-react";

export default function Footer() {
  return (
    <footer dir="rtl" className=" mt-10 w-full border-t border-gray-200 font-[Cairo] text-slate-500 " >
      <div className=" mx-auto flex min-h-16.25 w-300 max-w-[calc(100%-40px)] flex-wrap items-center justify-center gap-4.5 text-center max-[1250px]:max-w-[calc(100%-32px)] max-[768px]: flex-col " >

        <div className=" flex items-center justify-center gap-1.75 text-xs font-bold text-slate-800 " >
          <ScanText className=" h-4 w-4 text-[#3b5bdb] " />
          <span>أرشيف شمس البر</span>
        </div>

        <div className=" flex items-center justify-center gap-3 text-[10px] text-slate-400 ">
          <div className=" flex items-center justify-center gap-1.25 ">
            <Package className=" h-3.25 w-3.25 text-slate-400 " />
            <span>الإصدار 1.0.0</span>
          </div>

          <div className="h-4 w-px bg-slate-200"/>

          <div className="flex items-center justify-center gap-1.25 ">
            <span> © {new Date().getFullYear()} </span>
            <span>جميع الحقوق محفوظة</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

