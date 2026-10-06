"use client";

import { X, Plus } from "lucide-react";

interface AddItemModalProps {
  isOpen: boolean;
  title: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
  loading?: boolean;
}

export default function AddItemModal({
  isOpen,
  title,
  label = "الاسم",
  placeholder = "اكتب الاسم...",
  value,
  onChange,
  onClose,
  onSave,
  loading = false,
}: AddItemModalProps) {
  if (!isOpen) return null;

  return (
    <div
      dir="rtl"
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/30
        p-4
      "
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="
          w-full max-w-[420px]
          overflow-hidden
          rounded-[14px]
          border border-[#e6eaf0]
          bg-white
          shadow-[0_20px_60px_rgba(15,23,42,0.15)]
        "
      >
        {/* HEADER */}
        <div
          className="
            flex items-center justify-between
            border-b border-[#e6eaf0]
            px-5 py-4
          "
        >
          <div>
            <h3 className="text-[15px] font-bold text-[#172033]">
              {title}
            </h3>

            <p className="mt-1 text-[11px] text-[#718096]">
              أدخل البيانات ثم اضغط إضافة
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="
              flex h-8 w-8 items-center justify-center
              rounded-[8px]
              text-[#718096]
              transition
              hover:bg-[#f5f7fa]
              hover:text-[#172033]
            "
          >
            <X size={17} strokeWidth={2} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-5">
          <label className="mb-2 block text-xs font-semibold text-[#4a5568]">
            {label}
          </label>

          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && value.trim() && !loading) {
                onSave();
              }
            }}
            autoFocus
            placeholder={placeholder}
            className="
              h-11
              w-full
              rounded-[9px]
              border border-[#dfe5ed]
              bg-[#fbfcfe]
              px-3
              text-xs
              text-[#172033]
              outline-none
              transition
              placeholder:text-[#a0aec0]
              focus:border-[#2563eb]
              focus:bg-white
              focus:ring-[3px]
              focus:ring-blue-500/10
            "
          />
        </div>

        {/* FOOTER */}
        <div
          className="
            flex items-center justify-start gap-2
            border-t border-[#e6eaf0]
            px-5 py-4
          "
        >
          <button
            type="button"
            onClick={onSave}
            disabled={!value.trim() || loading}
            className="
              inline-flex
              h-10
              items-center
              justify-center
              gap-2
              rounded-[9px]
              bg-[#2563eb]
              px-4
              text-xs
              font-semibold
              text-white
              transition
              hover:bg-[#1d4ed8]
              active:scale-[0.98]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <Plus size={16} strokeWidth={2} />

            {loading ? "جاري الحفظ..." : "إضافة"}
          </button>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              inline-flex
              h-10
              items-center
              justify-center
              rounded-[9px]
              border border-[#e6eaf0]
              bg-white
              px-4
              text-xs
              font-semibold
              text-[#4a5568]
              transition
              hover:bg-[#f5f7fa]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}