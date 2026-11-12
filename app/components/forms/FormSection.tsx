
"use client";

import type { ReactNode } from "react";

type FormSectionProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function FormSection({
  title,
  description,
  icon,
  children,
  className = "",
}: FormSectionProps) {
  return (
    <section
      className={`overflow-hidden rounded-[14px] border border-[#e6eaf0] bg-white shadow-[0_5px_20px_rgba(15,23,42,0.035)] ${className}`}
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 border-b border-[#e6eaf0] px-6 py-5 max-[600px]:px-4">
        {icon && (
          <div className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-[10px] bg-[#eef2ff] text-[#4f46e5]">
            {icon}
          </div>
        )}

        <div>
          <h3 className="text-[15px] font-bold text-[#172033]">
            {title}
          </h3>

          {description && (
            <span className="mt-0.5 block text-[11px] text-[#718096]">
              {description}
            </span>
          )}
        </div>
      </div>

      {/* Section Body */}
      <div className="p-6.25 max-[600px]:p-4">
        {children}
      </div>
    </section>
  );
}
