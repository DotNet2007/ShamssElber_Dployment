
"use client";

import type { ReactNode } from "react";

type FormGroupProps = {
  label: string;
  children: ReactNode;
  required?: boolean;
};

export default function FormGroup({
  label,
  children,
  required = false,
}: FormGroupProps) {
  return (
    <div className="flex flex-col gap-1.75">
      <label className="text-xs font-semibold text-[#4a5568]">
        {label}

        {required && (
          <span
            className="mr-1 text-[14px] font-bold text-red-500"
            title="هذا الحقل مطلوب"
            aria-label="حقل مطلوب"
          >
            *
          </span>
        )}
      </label>

      {children}
    </div>
  );
}
