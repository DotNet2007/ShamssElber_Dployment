
"use client";

import { useRef } from "react";
import { Image as ImageIcon, Upload, X } from "lucide-react";

type ImageUploadProps = {
  imageFile: File | null;
  previewUrl: string;
  onImageSelect: (file: File) => void;
  onRemove: () => void;
  disabled?: boolean;
};

export default function ImageUpload({
  imageFile,
  previewUrl,
  onImageSelect,
  onRemove,
  disabled = false,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("من فضلك اختار ملف صورة صحيح.");
      event.target.value = "";
      return;
    }

    onImageSelect(file);
    event.target.value = "";
  };

  return (
    <div dir="rtl" className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        disabled={disabled}
        className="hidden"
      />

      {!previewUrl ? (
        <button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          className="
            flex w-full flex-col items-center justify-center
            rounded-xl border-2 border-dashed border-[#dfe5ed]
            bg-[#fbfcfe] px-5 py-10 text-center
            transition-all duration-200
            hover:border-[#2563eb] hover:bg-[#eff6ff]
            disabled:cursor-not-allowed disabled:opacity-50
          "
        >
          <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef2ff] text-[#2563eb]">
            <Upload size={23} />
          </span>

          <span className="text-sm font-semibold text-[#172033]">
            اضغط لاختيار صورة
          </span>

          <span className="mt-2 text-xs text-[#718096]">
            اختار الصورة من جهازك لعرض المعاينة
          </span>
        </button>
      ) : (
        <div className="overflow-hidden rounded-xl border border-[#dfe5ed] bg-white p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <ImageIcon
                size={18}
                className="shrink-0 text-[#2563eb]"
              />

              <span className="truncate text-xs font-semibold text-[#172033]">
                {imageFile?.name || "الصورة المختارة"}
              </span>
            </div>

            <button
              type="button"
              disabled={disabled}
              onClick={onRemove}
              className="
                flex shrink-0 items-center gap-1 rounded-lg
                px-3 py-2 text-xs font-semibold text-red-500
                transition hover:bg-red-50
                disabled:cursor-not-allowed disabled:opacity-50
              "
            >
              <X size={15} />
              إزالة
            </button>
          </div>

          <div className="flex min-h-48 items-center justify-center overflow-hidden rounded-lg bg-[#f7f9fc] p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt={imageFile?.name || "معاينة الصورة"}
              className="max-h-100 max-w-full rounded-lg object-contain"
            />
          </div>

          {imageFile && (
            <p className="mt-3 text-xs text-[#718096]">
              حجم الملف:{" "}
              {(imageFile.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          )}
        </div>
      )}
    </div>
  );
}
