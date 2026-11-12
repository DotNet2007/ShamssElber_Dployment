
"use client";

import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  children: ReactNode;
  required?: boolean;
  className?: string;
};

export default function FormField({
  label,
  children,
  required = false,
  className = "",
}: FormFieldProps) {
  return (
    <div className={`min-w-0 ${className}`}>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
        {required && (
          <span className="mr-1 text-red-500">*</span>
        )}
      </label>

      {children}
    </div>
  );
}
