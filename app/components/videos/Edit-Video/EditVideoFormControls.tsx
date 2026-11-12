"use client";

import type { ReactNode } from "react";
import { ChevronDown, Plus } from "lucide-react";

export function FormGroup({ label, children, required = false }: { label: string; children: ReactNode; required?: boolean }) {
  return (
    <div className="flex flex-col gap-1.75">
      <label className="text-xs font-semibold text-[#4a5568]">
        {label}
        {required && (
          <span className="mr-1 text-[14px] font-bold text-red-500" title="هذا الحقل مطلوب" aria-label="حقل مطلوب">
            *
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

export function InputWrapper({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="relative w-full">
      <span className="pointer-events-none absolute right-3 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center text-[#a0aec0]">
        {icon}
      </span>
      {children}
    </div>
  );
}

export function SelectWrapper({ icon, children, onAdd, disabled = false, isAdmin = false }: { icon: ReactNode; children: ReactNode; onAdd?: () => void; disabled?: boolean; isAdmin?: boolean }) {
  return (
    <div className="flex w-full items-center gap-2">
      <div className="relative min-w-0 flex-1">
        <span className="pointer-events-none absolute right-3 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center text-[#a0aec0]">
          {icon}
        </span>
        <span className="pointer-events-none absolute left-3 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center text-[#718096]">
          <ChevronDown size={16} strokeWidth={2} />
        </span>
        {children}
      </div>
      {isAdmin && (
        <button type="button" title="إضافة" aria-label="إضافة" onClick={onAdd} disabled={disabled}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[9px] border border-[#dfe5ed] bg-white text-[#718096] transition-all duration-200 hover:border-[#2563eb] hover:bg-[#eff6ff] hover:text-[#2563eb] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">
          <Plus size={18} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}

export const inputClass = ` h-11 w-full rounded-[9px] border border-[#dfe5ed] bg-[#fbfcfe] pr-[42px] pl-3 text-xs text-[#172033] outline-none transition placeholder:text-[#a0aec0] focus:border-[#2563eb] focus:bg-white focus:ring-[3px] focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-[#f1f5f9] disabled:text-[#94a3b8] disabled:opacity-80 `;

export const selectClass = ` h-11 w-full appearance-none rounded-[9px] border border-[#dfe5ed] bg-[#fbfcfe] pr-[42px] pl-[38px] text-xs text-[#172033] outline-none transition cursor-pointer focus:border-[#2563eb] focus:bg-white focus:ring-[3px] focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-[#f1f5f9] disabled:text-[#94a3b8] disabled:opacity-80 `;
