"use client";

import { RefreshCw, Save } from "lucide-react";

interface AddVideoHeaderProps {
    isSaving: boolean; 
    onRefresh: () => void; 
    onSave: () => void 
};

export default function AddVideoHeader({ isSaving, onRefresh, onSave }: AddVideoHeaderProps) {
  return (
    <div className=" mb-[25px] flex items-center justify-between gap-5 max-[600px]:flex-col max-[600px]:items-start">
      <div>
        <h2 className="mb-1 text-2xl font-bold text-[#172033]">
          إضافة فيديو
        </h2>

        <p className="text-[13px] text-[#718096]">
          قم بإضافة فيديو جديد وتنظيمه داخل أرشيف الفيديوهات
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        <button type="button" onClick={onRefresh} className=" inline-flex h-10 items-center justify-center gap-2 rounded-[9px] border border-[#e6eaf0] bg-white px-4 text-xs font-semibold text-[#4a5568] transition hover:bg-[#eff6ff] hover:text-[#2563eb] ">
          <RefreshCw size={16} />
          تحديث
        </button>

        <button type="button" onClick={onSave} disabled={isSaving} className=" inline-flex h-10 items-center justify-center gap-2 rounded-[9px] bg-[#2563eb] px-4 text-xs font-semibold text-white transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-50 ">
          <Save size={16} />
          حفظ الفيديو
        </button>
      </div>
    </div>
  );
}